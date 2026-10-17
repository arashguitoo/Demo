/* ==========================================================
   Chat-Simulation („wie WhatsApp“): allein mit Figuren oder
   gemeinsam in einer Gruppe. Nachrichten werden aus Bausteinen
   gebaut, ausgewählt oder ergänzt.
   Gruppe: schools/{sid}/live/{raum} = { meta, spieler, chat }
   ========================================================== */
import { h, icon, mount, uhrzeit, toast, prozent } from "../core/ui.js";
import { mischen } from "../spiel/engine.js";
import { ergebnisBild } from "./spiel.js";
import { newKey } from "../core/store.js";

const norm = (s) => String(s).toLowerCase().replace(/[.,!?;:„“"'«»]/g, "").replace(/\s+/g, " ").trim();
const REAKTIONEN = ["👍", "😂", "❤️", "🙏", "Super Idee!", "Ich bin dabei!", "Gute Frage!", "Stimmt!", "Bis gleich!", "Schade!"];
const warte = (ms) => new Promise((r) => setTimeout(r, ms));

export function antwortText(a) {
  if (a.art === "bausteine") return a.woerter.join(" ");
  if (a.art === "auswahl") return a.optionen[0].text;
  if (a.art === "luecke") return a.satz.replace("___", a.optionen[0]);
  return "";
}

/* ---------- Chatfenster ---------- */
function chatFenster(daten, { untertitel }) {
  const verlauf = h("div.chat-verlauf", { role: "log", "aria-live": "polite" });
  const tippt = h("div.chat-tippt");
  const composer = h("div.chat-composer");
  const el = h("div.chat-rahmen",
    h("header.chat-kopf",
      h("span.chat-gruppenbild", daten.gruppe.bild),
      h("div", h("strong", daten.gruppe.name), h("span", untertitel))),
    h("div.chat-flaeche", verlauf, tippt),
    composer);
  let letzterVon = null;
  return {
    el, composer,
    leeren() { verlauf.replaceChildren(); letzterVon = null; },
    nachricht({ von, name, farbe, text, eigen, ts, art }) {
      if (art === "system") { verlauf.appendChild(h("div.chat-system", text)); letzterVon = null; return; }
      const folge = letzterVon === von;
      const kurz = art === "reaktion" && /^\p{Extended_Pictographic}+$/u.test(text);
      verlauf.appendChild(h("div.chat-blase" + (eigen ? ".eigen" : "") + (folge ? ".folge" : "") + (kurz ? ".emoji" : ""),
        !eigen && !folge ? h("span.chat-name", { style: { color: farbe } }, name) : null,
        h("span.chat-text", text),
        h("span.chat-zeit", uhrzeit(ts || Date.now()), eigen ? " ✓✓" : "")));
      letzterVon = von;
      verlauf.parentElement.scrollTop = verlauf.parentElement.scrollHeight;
    },
    tippen(name) { tippt.textContent = name ? `${name} schreibt …` : ""; if (name) verlauf.parentElement.scrollTop = verlauf.parentElement.scrollHeight; },
  };
}

/* ---------- Eingabe für eine Aufgabe ---------- */
function aufgabenEingabe(aufgabe, onFertig) {
  let versuche = 0;
  const hinweis = h("div.chat-hinweis");
  const kopf = h("div.chat-auftrag", icon("edit", 16), h("span", aufgabe.anweisung));
  const fehler = (text) => { versuche++; hinweis.textContent = text; hinweis.className = "chat-hinweis falsch"; };

  if (aufgabe.art === "bausteine") {
    const zeile = h("div.chat-eingabe", { "aria-label": "Deine Nachricht" });
    const vorrat = h("div.chat-vorrat");
    const loesungen = [aufgabe.woerter.join(" "), ...(aufgabe.alternativen || [])].map(norm);
    const kacheln = mischen([...aufgabe.woerter, ...(aufgabe.extra || [])]);
    const senden = h("button.chat-senden", { "aria-label": "Senden", disabled: true, onclick: () => {
      const satz = [...zeile.children].map((b) => b.textContent).join(" ");
      if (loesungen.includes(norm(satz))) { onFertig(satz, versuche === 0); return; }
      zeile.classList.add("wackeln"); setTimeout(() => zeile.classList.remove("wackeln"), 450);
      if (versuche >= 1) {
        fehler("So wäre es richtig. Tippe auf Senden.");
        zeile.replaceChildren(...aufgabe.woerter.map((w) => h("button.sp-wort", w)));
        vorrat.replaceChildren(); senden.disabled = false;
        senden.onclick = () => onFertig(aufgabe.woerter.join(" "), false);
      } else fehler("Noch nicht ganz. Achte auf die Position des Verbs. Nicht alle Wörter werden gebraucht.");
    } }, icon("arrowR", 22));
    const tausch = (b) => { (b.parentElement === vorrat ? zeile : vorrat).appendChild(b); senden.disabled = !zeile.children.length; };
    kacheln.forEach((w) => vorrat.appendChild(h("button.sp-wort", { onclick: (e) => tausch(e.currentTarget) }, w)));
    return h("div", kopf, vorrat, hinweis, h("div.chat-zeile", zeile, senden));
  }

  if (aufgabe.art === "auswahl") {
    const box = h("div.chat-vorschlaege", mischen(aufgabe.optionen).map((o) => h("button.chat-vorschlag", { onclick: (e) => {
      if (o === aufgabe.optionen[0]) { onFertig(o.text, versuche === 0); return; }
      e.currentTarget.classList.add("falsch"); e.currentTarget.disabled = true;
      fehler(o.rueckmeldung || "Das passt hier nicht so gut.");
    } }, o.text)));
    return h("div", kopf, box, hinweis);
  }

  if (aufgabe.art === "luecke") {
    const [vor, nach] = aufgabe.satz.split("___");
    const luecke = h("span.sp-luecke", "   ");
    const box = h("div.chat-optionen", mischen(aufgabe.optionen).map((o) => h("button.sp-wort", { onclick: (e) => {
      luecke.textContent = o;
      if (o === aufgabe.optionen[0]) { setTimeout(() => onFertig(vor + o + nach, versuche === 0), 350); return; }
      e.currentTarget.disabled = true; e.currentTarget.classList.add("falsch");
      fehler(aufgabe.erklaerung ? "Nicht ganz. " + aufgabe.erklaerung : "Nicht ganz. Versuch es noch einmal.");
    } }, o)));
    return h("div", kopf, h("div.chat-eingabe.text", vor, luecke, nach), box, hinweis);
  }
  return h("p", "Unbekannte Aufgabe");
}

/* ---------- Allein spielen ---------- */
async function solo(ctx, daten, ziel, ende) {
  const fenster = chatFenster(daten, { untertitel: Object.values(daten.mitglieder).map((m) => m.name.replace(/ \(.*\)$/, "")).join(", ") + ", Du" });
  mount(ziel, fenster.el);
  let punkte = 0;
  const bot = async (n) => {
    const m = daten.mitglieder[n.von];
    fenster.tippen(m.name.replace(/ \(.*\)$/, ""));
    await warte(Math.min(2200, 600 + n.text.length * 18));
    fenster.tippen(null);
    fenster.nachricht({ von: n.von, name: m.name, farbe: m.farbe, text: n.text });
  };
  fenster.nachricht({ art: "system", text: "Du wurdest zur Gruppe hinzugefügt" });
  for (const szene of daten.szenen) {
    for (const n of szene.nachrichten) await bot(n);
    const text = await new Promise((res) => {
      mount(fenster.composer, aufgabenEingabe(szene.aufgabe, (t, ersterVersuch) => { if (ersterVersuch) punkte++; res(t); }));
    });
    mount(fenster.composer, h("div.chat-warte", "…"));
    fenster.nachricht({ von: "ich", name: ctx.session.name, text, eigen: true });
    await warte(500);
    for (const n of szene.danach || []) await bot(n);
  }
  mount(fenster.composer, h("div.chat-warte", "Chat beendet"));
  await warte(800);
  ende(punkte, daten.szenen.length, "solo");
}

/* ---------- Gemeinsam (Gruppe) ---------- */
async function gruppe(ctx, daten, ziel, raum, ende) {
  const { store, session } = ctx;
  const P = ctx.schule(`live/${raum}`);
  const ich = session.uid;
  const fenster = chatFenster(daten, { untertitel: "Raum " + raum });
  const lobby = h("div.chat-lobby");
  mount(ziel, h("div.chat-gruppe", fenster.el, lobby));
  let meta = null, spieler = {}, chat = [];
  let gepostet = new Set(); // Szenen, deren Nachrichten dieser Client gerade schreibt
  let fertigGemeldet = false;

  const istHost = () => meta && meta.von === ich;
  const reihenfolge = () => (meta && meta.reihenfolge) || [];
  const antworten = () => chat.filter((c) => c.art === "antwort");
  const szeneJetzt = () => antworten().length;
  const amZug = () => { const r = reihenfolge(); return r.length ? r[szeneJetzt() % r.length] : null; };
  const botsDa = (k) => chat.filter((c) => c.art === "bot" && c.szene === k && c.teil === "vor").length >= daten.szenen[k].nachrichten.length;

  async function schreibeBots(k, teil) {
    const key = k + teil;
    if (gepostet.has(key)) return;
    gepostet.add(key);
    const liste = teil === "vor" ? daten.szenen[k].nachrichten : daten.szenen[k].danach || [];
    for (const n of liste) {
      await warte(Math.min(1800, 500 + n.text.length * 14));
      const m = daten.mitglieder[n.von];
      await store.push(P + "/chat", { art: "bot", szene: k, teil, von: n.von, name: m.name, farbe: m.farbe, text: n.text, ts: Date.now() });
    }
  }

  function zeichneLobby() {
    const namen = Object.entries(spieler || {}).map(([uid, s]) => ({ uid, ...s }));
    if (!meta) { mount(lobby, h("p", "Raum wird geladen …")); return; }
    if (!meta.start) {
      mount(lobby,
        h("div.flaeche",
          h("h2", "Raum " + raum),
          h("p.leise", istHost() ? "Sag den anderen diese Nummer. Sie tippen auf „Mitspielen“ und geben sie ein." : "Warte, bis die Gruppe startet."),
          h("div.raum-code", raum),
          h("ul.spieler-liste", namen.map((s) => h("li", h("span.avatar", s.name[0]), s.name, s.uid === meta.von ? h("span.chip", "eröffnet") : null))),
          istHost() ? h("button.btn.primaer", { disabled: namen.length < (session.rolle === "tn" ? 2 : 1), onclick: starten }, namen.length < 2 && session.rolle === "tn" ? "Warte auf Mitspielende …" : "Chat starten") : null));
      fenster.composer.replaceChildren(h("div.chat-warte", "Der Chat beginnt gleich …"));
      return;
    }
    // laufend: Punkte anzeigen
    const p = {};
    for (const a of antworten()) p[a.von] = (p[a.von] || 0) + (a.punkte || 0);
    mount(lobby, h("div.flaeche",
      h("h2", "Mitspielende"),
      h("ul.spieler-liste", reihenfolge().map((uid) => h("li" + (uid === amZug() && szeneJetzt() < daten.szenen.length ? ".dran" : ""),
        h("span.avatar", (spieler[uid] || { name: "?" }).name[0]), (spieler[uid] || { name: "?" }).name,
        h("span.chip", `${p[uid] || 0} ★`)))),
      h("p.klein.leise", "Wer dran ist, baut die nächste Nachricht. Alle anderen können jederzeit mit kurzen Antworten reagieren.")));
  }

  async function starten() {
    const r = mischen(Object.keys(spieler).filter((uid) => !spieler[uid].lehrkraft));
    if (!r.length) { toast("Es braucht mindestens eine:n Lernende:n.", "fehler"); return; }
    await store.update(P + "/meta", { start: Date.now(), reihenfolge: r });
    await store.push(P + "/chat", { art: "system", text: "Der Chat beginnt. Viel Spaß!", ts: Date.now() });
    schreibeBots(0, "vor");
  }

  function zeichneChat() {
    fenster.leeren();
    for (const c of chat) {
      if (c.art === "system") fenster.nachricht(c);
      else fenster.nachricht({ ...c, eigen: c.von === ich, farbe: c.farbe || "#0b6b70" });
    }
    if (!meta || !meta.start) return;
    const k = szeneJetzt();
    if (k >= daten.szenen.length) {
      const danachFertig = chat.filter((c) => c.art === "bot" && c.szene === k - 1 && c.teil === "nach").length >= (daten.szenen[k - 1].danach || []).length;
      if (danachFertig && !fertigGemeldet) {
        fertigGemeldet = true;
        const meine = antworten().filter((a) => a.von === ich);
        setTimeout(() => ende(meine.reduce((s, a) => s + (a.punkte || 0), 0), meine.length, "gruppe"), 1200);
      }
      mount(fenster.composer, h("div.chat-warte", "Chat beendet"));
      return;
    }
    const dran = amZug();
    if (dran === ich) {
      if (!botsDa(k)) { mount(fenster.composer, h("div.chat-warte", "…")); return; }
      if (!fenster.composer.querySelector(".chat-auftrag") || fenster.composer.dataset.szene !== String(k)) {
        fenster.composer.dataset.szene = String(k);
        mount(fenster.composer, h("div.chat-dran", "Du bist dran!"), aufgabenEingabe(daten.szenen[k].aufgabe, async (text, ersterVersuch) => {
          mount(fenster.composer, h("div.chat-warte", "…"));
          await store.push(P + "/chat", { art: "antwort", szene: k, von: ich, name: session.name, text, punkte: ersterVersuch ? 1 : 0, ts: Date.now(), farbe: "#0b6b70" });
          await schreibeBots(k, "nach");
          if (k + 1 < daten.szenen.length) schreibeBots(k + 1, "vor");
        }));
      }
    } else {
      fenster.composer.dataset.szene = "";
      const name = (spieler[dran] || { name: "Jemand" }).name;
      mount(fenster.composer,
        h("div.chat-warte", botsDa(k) ? `${name} ist dran …` : "…"),
        session.rolle === "tn" ? h("div.chat-reaktionen", REAKTIONEN.map((r) => h("button.chat-reaktion", { onclick: () =>
          store.push(P + "/chat", { art: "reaktion", von: ich, name: session.name, text: r, ts: Date.now(), farbe: "#a96f17" }) }, r))) : null);
    }
  }

  // beitreten
  await store.set(`${P}/spieler/${ich}`, { name: session.name, ts: Date.now(), ...(session.rolle === "lehrkraft" ? { lehrkraft: true } : {}) });
  ctx.on(P + "/meta", (v) => { meta = v; zeichneLobby(); zeichneChat(); });
  ctx.on(P + "/spieler", (v) => { spieler = v || {}; zeichneLobby(); });
  ctx.on(P + "/chat", (v) => {
    chat = Object.entries(v || {}).map(([id, c]) => ({ id, ...c })).sort((a, b) => (a.id < b.id ? -1 : 1));
    zeichneChat(); zeichneLobby();
  });
}

/* ---------- Seite ---------- */
export default async function (ctx) {
  const { store, session, params } = ctx;
  const aid = params.aid;
  const daten = (await import(`../data/chats/${aid}.js`)).default;
  const flaeche = h("div");
  const istTn = session.rolle === "tn";

  const ende = async (punkte, max, modus) => {
    if (istTn && max) {
      try { await store.push(ctx.schule(`ergebnisse/${session.studentId}`), { aktivitaet: aid, modul: modus, fertigkeit: "schreiben", punkte, max, ts: Date.now() }); }
      catch (e) { toast("Ergebnis konnte nicht gespeichert werden", "fehler"); }
    }
    mount(flaeche, ergebnisBild({ punkte, max, text: daten.abschluss + (modus === "gruppe" ? " (Gezählt sind deine eigenen Nachrichten.)" : ""),
      aktionen: [h("a.btn", { href: "#/chat/" + aid, onclick: () => setTimeout(() => location.reload(), 0) }, "Noch einmal"), h("a.btn.primaer", { href: "#/bereich/gespraeche" }, "Zu den Gesprächen")] }));
  };

  async function raumEroeffnen() {
    let raum = null;
    for (let i = 0; i < 20 && !raum; i++) { const r = String(Math.floor(1000 + Math.random() * 9000)); if (!(await store.get(ctx.schule(`live/${r}/meta`)))) raum = r; }
    await store.set(ctx.schule(`live/${raum}/meta`), { typ: "chat", aid, von: session.uid, erstellt: Date.now() });
    history.replaceState(null, "", `#/chat/${aid}?raum=${raum}`);
    gruppe(ctx, daten, flaeche, raum, ende);
  }
  async function beitreten(code) {
    const m = await store.get(ctx.schule(`live/${code}/meta`));
    if (!m || m.typ !== "chat") { toast("Diesen Raum gibt es nicht.", "fehler"); return; }
    if (m.aid !== aid) { location.hash = `#/chat/${m.aid}?raum=${code}`; return; }
    if (m.start) { toast("Dieser Chat hat schon begonnen.", "fehler"); return; }
    history.replaceState(null, "", `#/chat/${aid}?raum=${code}`);
    gruppe(ctx, daten, flaeche, code, ende);
  }

  const raumQ = ctx.query.get("raum");
  ctx.render(
    h("a.zurueck", { href: "#/bereich/gespraeche" }, icon("arrowL", 18), "Gespräche & Abenteuer"),
    h("header.seitenkopf", h("div", h("div.reihe", h("span.niveau." + daten.niveau, daten.niveau), h("h1", "Chat: " + daten.titel)), h("p", daten.intro))),
    flaeche);

  if (raumQ) { const m = await store.get(ctx.schule(`live/${raumQ}/meta`)); if (m) { gruppe(ctx, daten, flaeche, raumQ, ende); return; } }
  const codeFeld = h("input.code-feld.klein", { type: "text", inputmode: "numeric", maxlength: "4", placeholder: "1234", "aria-label": "Raumnummer" });
  mount(flaeche, h("div.chat-start",
    h("section.flaeche", h("h2", "Allein"), h("p.leise", "Die anderen in der Gruppe sind Figuren. Du baust deine Nachrichten Wort für Wort."),
      h("button.btn.primaer", { onclick: () => solo(ctx, daten, flaeche, ende) }, icon("play", 18), "Allein spielen")),
    h("section.flaeche", h("h2", "Zusammen"), h("p.leise", "Zwei bis sechs Personen, jede am eigenen Handy. Ihr schreibt abwechselnd, die Figuren antworten."),
      h("div.reihe", h("button.btn.primaer", { onclick: raumEroeffnen }, icon("plus", 18), "Raum eröffnen")),
      h("form.reihe", { style: { marginTop: ".8rem" }, onsubmit: (e) => { e.preventDefault(); beitreten(codeFeld.value.trim()); } },
        h("div", { style: { flex: "0 1 140px" } }, codeFeld), h("button.btn", { type: "submit" }, "Mitspielen")))));
}
