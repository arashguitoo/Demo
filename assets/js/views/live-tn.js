/* Live im Kurs – Seite der Lernenden (Handy) */
import { h, icon, mount, toast } from "../core/ui.js";
import { QUIZ_SAETZE } from "../data/quiz/saetze.js";
import { FARBEN, FORMEN, punkteStand } from "./live-lk.js";

export default async function (ctx) {
  const { store, session } = ctx;
  const flaeche = h("div.live-tn");
  ctx.render(flaeche);

  const raumQ = ctx.query.get("raum");
  if (raumQ) return beitreten(raumQ);

  const feld = h("input.code-feld", { type: "text", inputmode: "numeric", maxlength: "4", placeholder: "1234", "aria-label": "Raumnummer", autocomplete: "off" });
  mount(flaeche,
    h("header.seitenkopf", h("div", h("h1", "Live im Kurs"), h("p", "Gib die Raumnummer ein, die deine Lehrkraft zeigt."))),
    h("form.flaeche.formular", { style: { maxWidth: "420px" }, onsubmit: (e) => { e.preventDefault(); beitreten(feld.value.trim()); } },
      h("label.feld", "Raumnummer", feld), h("button.btn.primaer", { type: "submit" }, "Mitspielen")));

  async function beitreten(raum) {
    const meta = await store.get(ctx.schule(`live/${raum}/meta`));
    if (!meta) { toast("Diesen Raum gibt es nicht.", "fehler"); return; }
    if (meta.typ === "chat") { location.hash = `#/chat/${meta.aid}?raum=${raum}`; return; }
    history.replaceState(null, "", "#/live?raum=" + raum);
    const P = ctx.schule(`live/${raum}`);
    await store.set(`${P}/spieler/${session.uid}`, { name: session.name, ts: Date.now() });
    let m = null, antworten = {}, gespeichert = false;

    function zeichne() {
      if (!m) { mount(flaeche, h("div.flaeche.leer", "Der Raum wurde geschlossen.", h("br"), h("a.btn", { href: "#/" }, "Zur Startseite"))); return; }
      const satz = QUIZ_SAETZE.find((s) => s.id === m.satz);
      const { p, richtig } = punkteStand(m, antworten, satz);
      const meine = p[session.uid] || 0;
      const kopf = h("div.live-kopf", h("span", `Raum ${raum}`), h("b", `${meine} Punkte`));
      if (m.phase === "lobby") { mount(flaeche, kopf, h("div.live-warte", icon("clock", 40), h("h2", "Du bist dabei!"), h("p", "Schau auf den Beamer. Gleich geht es los."))); return; }
      const fi = m.frage, f = m.fragen[fi];
      const meineAntwort = (antworten[fi] || {})[session.uid];
      if (m.phase === "frage") {
        if (meineAntwort) { mount(flaeche, kopf, h("div.live-warte", h("div.live-form", { style: { background: FARBEN[meineAntwort.wahl] } }, FORMEN[meineAntwort.wahl]), h("h2", "Antwort gesendet"), h("p", "Warte auf die anderen …"))); return; }
        mount(flaeche, kopf, h("p.live-frage", f.frage),
          h("div.live-knoepfe", f.optionen.map((o, i) => h("button.live-knopf", { style: { background: FARBEN[i] }, onclick: async () => {
            flaeche.querySelectorAll(".live-knopf").forEach((b) => (b.disabled = true));
            try { await store.set(`${P}/antworten/${fi}/${session.uid}`, { wahl: i, ts: Date.now() }); }
            catch (e) { toast("Zu spät", "fehler"); }
          } }, h("span.form", FORMEN[i]), h("span", o)))));
        return;
      }
      if (m.phase === "aufloesung") {
        const ok = meineAntwort && meineAntwort.wahl === f.loesung;
        mount(flaeche, kopf, h("div.live-warte" + (ok ? ".ok" : ".falsch"),
          h("div.live-symbol", ok ? "✓" : "✗"),
          h("h2", !meineAntwort ? "Keine Antwort" : ok ? "Richtig!" : "Leider falsch"),
          h("p", "Richtig ist: ", h("b", f.optionen[f.loesung]))));
        return;
      }
      if (m.phase === "ende") {
        const rang = Object.entries(p).sort((a, b) => b[1] - a[1]).findIndex(([uid]) => uid === session.uid) + 1;
        const r = richtig[session.uid] || 0;
        if (!gespeichert) {
          gespeichert = true;
          store.push(ctx.schule(`ergebnisse/${session.studentId}`), { aktivitaet: "lv-quizduell", modul: m.satz, fertigkeit: "wortschatz", punkte: r, max: m.fragen.length, ts: Date.now() }).catch(() => {});
        }
        mount(flaeche, kopf, h("div.live-warte",
          h("div.live-symbol", rang <= 3 && rang > 0 ? ["🥇", "🥈", "🥉"][rang - 1] : "🎉"),
          h("h2", rang > 0 ? `Platz ${rang}` : "Geschafft"),
          h("p", `${r} von ${m.fragen.length} richtig, ${meine} Punkte`),
          h("a.btn.primaer", { href: "#/" }, "Zur Startseite")));
      }
    }
    ctx.on(P + "/meta", (v) => { m = v; zeichne(); });
    ctx.on(P + "/antworten", (v) => { antworten = v || {}; if (m && m.phase !== "frage") zeichne(); else if (m) { const meine = (antworten[m.frage] || {})[session.uid]; if (meine && !flaeche.querySelector(".live-warte")) zeichne(); } });
  }
}
