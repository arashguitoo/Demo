/* ==========================================================
   Schnitzeljagd zu zweit (Informationslücke A/B)
   Modus „ein Gerät“: Ansicht A/B umschalten
   Modus „zwei Geräte“: Raum in schools/{sid}/live/{raum}
     meta {typ:"jagd", von}, spieler {uid:{name, rolle}}, chat {versuch|schloss}
   ========================================================== */
import { h, icon, mount, toast } from "../core/ui.js";
import { mischen } from "../spiel/engine.js";
import { ergebnisBild } from "./spiel.js";

export default async function (ctx) {
  const { store, session } = ctx;
  const daten = (await import("../data/jagd/schluessel.js")).default;
  const flaeche = h("div");
  const fragenAlle = daten.stationen.flatMap((s, si) => s.fragen.map((f, fi) => ({ ...f, si, fi, q: `${si}-${fi}`, _opt: mischen(f.optionen) })));
  const istTn = session.rolle === "tn";
  let gespeichert = false;

  ctx.render(
    h("a.zurueck", { href: "#/bereich/gespraeche" }, icon("arrowL", 18), "Gespräche & Abenteuer"),
    h("header.seitenkopf", h("div", h("div.reihe", h("span.niveau." + daten.niveau, daten.niveau), h("h1", "Schnitzeljagd: " + daten.titel)), h("p", daten.intro))),
    flaeche);

  /* ---------- gemeinsame Spiellogik ---------- */
  function spiel({ eintraege, schreib, meineRolle, umschalten, spielerNamen }) {
    const geloest = (q) => eintraege.some((e) => e.art === "versuch" && e.q === q && e.ok);
    const versuche = (q) => eintraege.filter((e) => e.art === "versuch" && e.q === q);
    const offen = fragenAlle.find((f) => !geloest(f.q));
    const ziffern = daten.stationen.map((s, si) => (s.fragen.every((_, fi) => geloest(`${si}-${fi}`)) ? daten.code[si] : null));
    const punkte = fragenAlle.filter((f) => { const v = versuche(f.q); return v.length && v[0].ok; }).length;
    const rolle = meineRolle();

    const kopf = h("div.jagd-kopf",
      h("div.jagd-ziffern", ziffern.map((z, i) => h("span.jagd-ziffer" + (z != null ? ".da" : ""), z != null ? z : "?"))),
      h("div.jagd-rolle", umschalten ? h("div.segment", ["A", "B"].map((r) => h("button", { "aria-pressed": String(r === rolle), style: r === rolle ? { background: r === "A" ? "var(--a2)" : "var(--b1)", color: "#fff" } : null, onclick: () => umschalten(r) }, "Ansicht " + r)))
        : h("span.jagd-ich", { style: { background: rolle === "A" ? "var(--a2)" : "var(--b1)" } }, `Du bist ${rolle}`)),
      spielerNamen ? h("span.klein.leise", spielerNamen) : null);

    if (offen) {
      const st = daten.stationen[offen.si];
      const v = versuche(offen.q);
      const ichDran = offen.wer === rolle;
      const frageBox = h("div.jagd-frage" + (ichDran ? ".dran" : ""),
        h("div.jagd-wer", { style: { background: offen.wer === "A" ? "var(--a2)" : "var(--b1)" } }, offen.wer),
        h("div", h("p.sp-frage", offen.frage),
          h("div.sp-optionen" + (offen._opt.every((o) => o.length <= 2) ? ".buchstaben" : ""), offen._opt.map((o) => {
            const falsch = v.some((x) => x.wahl === o && !x.ok);
            return h("button.sp-opt" + (falsch ? ".falsch" : ""), { disabled: !ichDran || falsch, onclick: () => schreib({ art: "versuch", q: offen.q, wahl: o, ok: o === offen.optionen[0], rolle }) }, o);
          })),
          !ichDran ? h("p.leise.klein", `${offen.wer} beantwortet diese Frage. ${umschalten ? "Schaltet auf Ansicht " + offen.wer + " um." : "Hilf mit deinem Text!"}`) : v.length ? h("p.klein", { style: { color: "var(--schlecht)", fontWeight: 650 } }, "Noch nicht. Sprecht noch einmal über eure Texte.") : null));
      mount(flaeche, kopf,
        h("div.jagd-station",
          h("div.jagd-station-kopf", h("span.jagd-icon", st.icon), h("div", h("span.klein.leise", `Station ${offen.si + 1} von ${daten.stationen.length}`), h("h2", { style: { margin: 0 } }, st.titel))),
          h("p", st.auftrag),
          h("div.jagd-text." + rolle, h("div.jagd-text-kopf", `Nur für ${rolle}`), h("div", { html: st[rolle] })),
          h("details.jagd-woerter", h("summary", "📖 Wörterbuch"), h("dl", Object.entries(st.woerter || {}).map(([w, e]) => [h("dt", w), h("dd", e)]))),
          frageBox));
      return;
    }

    // Schloss
    const schloss = [0, 1, 2].map((pos) => { const e = eintraege.filter((x) => x.art === "schloss" && x.pos === pos).pop(); return e ? e.ziffer : 0; });
    const offenSchloss = schloss.every((z, i) => z === daten.code[i]);
    if (offenSchloss) {
      if (!gespeichert && istTn) {
        gespeichert = true;
        store.push(ctx.schule(`ergebnisse/${session.studentId}`), { aktivitaet: "gs-schnitzeljagd", modul: "schluessel", fertigkeit: "sprechen", punkte: punkte, max: fragenAlle.length, ts: Date.now() }).catch(() => {});
      }
      mount(flaeche, kopf, ergebnisBild({ punkte, max: fragenAlle.length, titel: "Der Kasten ist offen! 🔑", text: daten.schluss,
        aktionen: [h("a.btn.primaer", { href: "#/bereich/gespraeche" }, "Zu den Gesprächen")] }));
      return;
    }
    const meine = rolle === "A" ? [0, 1] : [2];
    mount(flaeche, kopf, h("div.jagd-schloss",
      h("h2", "🔒 Das Zahlenschloss"),
      h("p", umschalten ? "Stellt die drei Ziffern ein. A stellt die ersten zwei, B die letzte." : rolle === "A" ? "Du stellst die ersten zwei Ziffern ein, B die letzte." : "Du stellst die letzte Ziffer ein, A die ersten zwei."),
      h("div.schloss-raeder", schloss.map((z, pos) => {
        const darf = umschalten || meine.includes(pos);
        return h("div.schloss-rad" + (darf ? "" : ".fremd"),
          h("button.icon-btn", { "aria-label": "Ziffer höher", disabled: !darf, onclick: () => schreib({ art: "schloss", pos, ziffer: (z + 1) % 10, rolle }) }, "▲"),
          h("span.schloss-zahl", z),
          h("button.icon-btn", { "aria-label": "Ziffer niedriger", disabled: !darf, onclick: () => schreib({ art: "schloss", pos, ziffer: (z + 9) % 10, rolle }) }, "▼"),
          h("span.klein.leise", pos < 2 ? "A" : "B"));
      })),
      h("p.klein.leise", "Eure Ziffern: " + ziffern.join(" – "))));
  }

  /* ---------- Modus: ein Gerät ---------- */
  function einGeraet() {
    const eintraege = [];
    let rolle = "A";
    const neu = () => spiel({ eintraege, meineRolle: () => rolle, umschalten: (r) => { rolle = r; neu(); }, schreib: (e) => { eintraege.push({ ...e, ts: Date.now() }); neu(); } });
    neu();
  }

  /* ---------- Modus: zwei Geräte ---------- */
  async function raum(code, neuEroeffnet) {
    const P = ctx.schule(`live/${code}`);
    let eintraege = [], spieler = {};
    if (neuEroeffnet) await store.set(P + "/meta", { typ: "jagd", von: session.uid, erstellt: Date.now() });
    const vorhanden = (await store.get(P + "/spieler")) || {};
    const belegt = Object.values(vorhanden).map((s) => s.rolle);
    const meine = vorhanden[session.uid] ? vorhanden[session.uid].rolle : !belegt.includes("A") ? "A" : !belegt.includes("B") ? "B" : null;
    if (!meine) { toast("Dieses Team ist schon voll.", "fehler"); return; }
    await store.set(`${P}/spieler/${session.uid}`, { name: session.name, rolle: meine, ts: Date.now() });
    history.replaceState(null, "", "#/jagd?raum=" + code);
    const zeichne = () => {
      const namen = Object.values(spieler);
      if (namen.length < 2) {
        mount(flaeche, h("section.flaeche", { style: { maxWidth: "520px" } },
          h("h2", "Team-Raum"), h("div.raum-code", code),
          h("p.leise", "Dein Partner oder deine Partnerin tippt auf „Mitspielen“ und gibt diese Nummer ein."),
          h("p", `Du bist Person ${meine}. Warte auf Person ${meine === "A" ? "B" : "A"} …`)));
        return;
      }
      spiel({ eintraege, meineRolle: () => meine, schreib: (e) => store.push(P + "/chat", { ...e, von: session.uid, ts: Date.now() }),
        spielerNamen: namen.map((s) => `${s.rolle}: ${s.name}`).join(", ") });
    };
    ctx.on(P + "/spieler", (v) => { spieler = v || {}; zeichne(); });
    ctx.on(P + "/chat", (v) => { eintraege = Object.entries(v || {}).sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([, e]) => e); zeichne(); });
  }

  const q = ctx.query.get("raum");
  if (q && (await store.get(ctx.schule(`live/${q}/meta`)))) { raum(q, false); return; }
  const feld = h("input.code-feld.klein", { type: "text", inputmode: "numeric", maxlength: "4", placeholder: "1234", "aria-label": "Raumnummer" });
  mount(flaeche,
    h("section.flaeche", { style: { marginBottom: "1rem" } }, h("h2", "So geht’s"), h("ul", daten.regeln.map((r) => h("li", r)))),
    h("div.chat-start",
      h("section.flaeche", h("h2", "Jede Person am eigenen Handy"), h("p.leise", "So ist es am spannendsten: Niemand sieht den Text der anderen Person."),
        h("button.btn.primaer", { onclick: async () => {
          let code = null;
          for (let i = 0; i < 20 && !code; i++) { const r = String(Math.floor(1000 + Math.random() * 9000)); if (!(await store.get(ctx.schule(`live/${r}/meta`)))) code = r; }
          raum(code, true);
        } }, icon("plus", 18), "Team-Raum eröffnen"),
        h("form.reihe", { style: { marginTop: ".8rem" }, onsubmit: async (e) => {
          e.preventDefault();
          const m = await store.get(ctx.schule(`live/${feld.value.trim()}/meta`));
          if (!m || m.typ !== "jagd") { toast("Diesen Team-Raum gibt es nicht.", "fehler"); return; }
          raum(feld.value.trim(), false);
        } }, h("div", { style: { flex: "0 1 140px" } }, feld), h("button.btn", { type: "submit" }, "Mitspielen"))),
      h("section.flaeche", h("h2", "Zu zweit an einem Gerät"), h("p.leise", "Ihr schaltet zwischen Ansicht A und B um. Schaut nur auf eure eigene Ansicht!"),
        h("button.btn", { onclick: einGeraet }, icon("play", 18), "Auf diesem Gerät spielen"))));
}
