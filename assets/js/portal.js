/* Startportal: Vorstellung + Anmeldung */
import { APP } from "./config.js";
import { getStore } from "./core/store.js";
import { currentSession, loginCode, loginLehrkraft, logout } from "./core/session.js";
import { h, mount, icon } from "./core/ui.js";
import { marke } from "./core/marke.js";
import { BEREICHE } from "./data/katalog.js";
import { DEMO } from "./data/demo-daten.js";
import { sichereDemo } from "./core/demo.js";

const SAETZE = {
  A1: { teile: ["Ich", "stehe", "um sieben Uhr", "auf."], verben: [1, 3], hinweis: "Trennbares Verb" },
  A2: { teile: ["Ich", "habe", "gestern beim Arzt", "angerufen."], verben: [1, 3], hinweis: "Perfekt" },
  B1: { teile: ["Wir", "müssen", "den Antrag bis Freitag", "abgeben."], verben: [1, 3], hinweis: "Modalverb" },
  B2: { teile: ["Die Anlage", "wird", "nächste Woche im Werk", "installiert."], verben: [1, 3], hinweis: "Passiv" },
};

function buehne() {
  const satz = h("div.satz", { "aria-live": "polite" });
  const hinweis = h("span");
  const knoepfe = Object.keys(SAETZE).map((n) => h("button", { type: "button", "data-n": n, "aria-pressed": "false", onclick: () => zeige(n) }, n));
  const linie = h("div.klammer-linie", { "aria-hidden": "true" });

  function zeige(n) {
    const s = SAETZE[n];
    knoepfe.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.n === n)));
    const kacheln = s.teile.map((t, i) => h("span.kachel" + (s.verben.includes(i) ? ".verb" : i > s.verben[0] && i < s.verben[1] ? ".mitte" : ""), t));
    mount(satz, kacheln, linie);
    satz.classList.remove("einflug"); void satz.offsetWidth; satz.classList.add("einflug");
    hinweis.textContent = `${n}: ${s.hinweis}`;
    aktuell = { kacheln, s };
    requestAnimationFrame(() => setTimeout(klammer, 480));
  }
  let aktuell = null;
  function klammer() {
    if (!aktuell) return;
    const a = aktuell.kacheln[aktuell.s.verben[0]], b = aktuell.kacheln[aktuell.s.verben[1]];
    const box = satz.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    if (Math.abs(ra.top - rb.top) > 20) { linie.style.display = "none"; return; } // umgebrochen
    linie.style.display = "";
    linie.style.left = ra.left - box.left + ra.width / 2 + "px";
    linie.style.width = rb.left - ra.left + rb.width / 2 - ra.width / 2 + "px";
  }
  window.addEventListener("resize", klammer);
  setTimeout(() => zeige("A2"), 0);

  return h("figure.buehne", { style: { margin: 0 } },
    h("div.buehne-kopf",
      h("p", "Ein Satz pro Niveau. Die Verben bilden die Klammer."),
      h("div.niveau-wahl", { role: "group", "aria-label": "Niveau wählen" }, knoepfe)),
    satz,
    h("figcaption.buehne-fuss", h("span", "Die Satzklammer, das Herz des deutschen Satzes"), hinweis));
}

function anmeldung(store, session) {
  const box = h("section.anmeldung", { id: "anmelden", "aria-labelledby": "anm-titel" });
  if (session) {
    mount(box, h("div.angemeldet",
      h("h2#anm-titel", `Hallo ${session.name}!`),
      h("p.leise", session.rolle === "lehrkraft" ? "Du bist als Lehrkraft angemeldet." : `Du bist mit dem Code ${session.code} angemeldet.`),
      h("a.btn.primaer", { href: "app.html" }, session.rolle === "lehrkraft" ? "Zum Lehrerbereich" : "Weiter üben"),
      h("button.btn", { onclick: async () => { await logout(); location.reload(); } }, "Abmelden")));
    return box;
  }
  let modus = "tn";
  const fehler = h("p.fehler-text", { role: "alert" });
  const formTn = h("form.formular", { onsubmit: async (e) => {
    e.preventDefault(); fehler.textContent = "";
    const btn = formTn.querySelector("button"); btn.disabled = true;
    try { await loginCode(formTn.code.value); location.href = "app.html"; }
    catch (err) { fehler.textContent = err.message; btn.disabled = false; }
  } },
    h("label.feld", "Dein Code", h("span.hinweis", "Den Code bekommst du von deiner Lehrkraft."),
      h("input.code-feld", { name: "code", type: "text", autocomplete: "off", autocapitalize: "characters", spellcheck: "false", maxlength: "10", required: true, placeholder: "······" })),
    h("button.btn.primaer", { type: "submit" }, "Los geht’s"));
  const formLk = h("form.formular", { onsubmit: async (e) => {
    e.preventDefault(); fehler.textContent = "";
    const btn = formLk.querySelector("button"); btn.disabled = true;
    try { await loginLehrkraft(formLk.email.value, formLk.pw.value); location.href = "app.html"; }
    catch (err) { fehler.textContent = err.message; btn.disabled = false; }
  } },
    h("label.feld", "E-Mail", h("input", { name: "email", type: "email", autocomplete: "username", required: true })),
    h("label.feld", "Passwort", h("input", { name: "pw", type: "password", autocomplete: "current-password", required: true })),
    h("button.btn.primaer", { type: "submit" }, "Anmelden"));
  const formWrap = h("div");
  const tabTn = h("button", { type: "button", role: "tab", "aria-selected": "true", onclick: () => setze("tn") }, "Ich lerne");
  const tabLk = h("button", { type: "button", role: "tab", "aria-selected": "false", onclick: () => setze("lk") }, "Ich unterrichte");
  function setze(m) {
    modus = m; fehler.textContent = "";
    tabTn.setAttribute("aria-selected", String(m === "tn")); tabLk.setAttribute("aria-selected", String(m === "lk"));
    mount(formWrap, m === "tn" ? formTn : formLk);
  }
  setze("tn");

  const zugaenge = APP.demoZugaenge ? h("div.zugaenge",
    h("h3", "Zum Ausprobieren"),
    DEMO.lehrkraefte.map((l) => zugang(`Lehrkraft (${l.name})`, l.email, () => { setze("lk"); formLk.email.value = l.email; formLk.pw.value = l.pw; formLk.requestSubmit(); })),
    zugang("Lernende:r im Integrationskurs", "Code " + DEMO.gastCodes.ik, () => { setze("tn"); formTn.code.value = DEMO.gastCodes.ik; formTn.requestSubmit(); }),
    zugang("Lernende:r im Wochenendkurs (A2)", "Code " + DEMO.gastCodes.we, () => { setze("tn"); formTn.code.value = DEMO.gastCodes.we; formTn.requestSubmit(); }),
    zugang("Lernende:r im Berufssprachkurs", "Code " + DEMO.gastCodes.bsk, () => { setze("tn"); formTn.code.value = DEMO.gastCodes.bsk; formTn.requestSubmit(); }),
    h("p.klein.sehr-leise", { style: { margin: ".6rem 0 0" } }, `Passwort für alle Lehrkraft-Zugänge: ${DEMO.lehrkraefte[0].pw}`)) : null;

  mount(box, h("h2#anm-titel", "Anmelden"), h("div.wahl", { role: "tablist" }, tabTn, tabLk), formWrap, fehler, zugaenge);
  return box;
}
const zugang = (wer, was, los) => h("div.zugang", h("div", h("b", wer), h("span", was)), h("button.btn.klein", { type: "button", onclick: los }, "Öffnen"));

async function start() {
  const store = await getStore();
  if (store.mode === "demo") await sichereDemo(store);
  const session = await currentSession();
  document.title = `${APP.name} – Deutsch üben von A1 bis B2`;

  mount(document.getElementById("portal"),
    h("header.portal-kopf", marke("index.html"), h("nav", h("a.btn.leicht", { href: "#bereiche" }, "Was drin ist"), h("a.btn.leicht", { href: "#lehrkraefte" }, "Für Lehrkräfte"))),
    h("section.held",
      h("div",
        buehne(),
        h("h1", "Deutsch üben von A1 bis B2, allein und zusammen im Kurs"),
        h("p.einleitung", "Für Integrations- und Berufssprachkurse: Lernpfad, Spiele, Chats und Prüfungstraining für Lernende. Klassenbuch, Feedback und Prüfungsprognose für Lehrkräfte.")),
      anmeldung(store, session)),
    h("section.band#bereiche",
      h("h2", "Sieben Bereiche, ein Zugang"),
      h("p.leise", "Lernende melden sich mit einem Code an. Nur der Vorname wird gespeichert."),
      h("div.bereich-liste", BEREICHE.map((b) => h("div.bereich-eintrag", h("div.ic-rund", icon(b.icon, 22)), h("div", h("h3", b.titel), h("p", b.text)))))),
    h("div.lehrkraft-band#lehrkraefte",
      h("section.band",
        h("h2", "Für Lehrkräfte und Schulen"),
        h("p.leise", "Alles, was im Kursalltag Zeit kostet, an einem Ort."),
        h("div.drei",
          h("div", icon("book"), h("h3", "Klassenbuch"), h("p", "Lernende checken am Handy ein, Sie bestätigen mit einem Tipp. Thema, Hausaufgabe und Ausfälle stehen im Kalender, die Liste lässt sich drucken.")),
          h("div", icon("chart"), h("h3", "Feedback je Person"), h("p", "Fortschritt nach Fertigkeiten, Anwesenheit und Ihre Rückmeldung auf einer Seite, die Lernende selbst sehen.")),
          h("div", icon("target"), h("h3", "Prüfungsprognose"), h("p", "Probeprüfungen werden nach den offiziellen Bestehensregeln von DTZ und DTB B2 ausgewertet."))))),
    h("footer.portal-fuss", h("span", `${APP.name}, Version ${APP.version}`), h("span", `Konzept & Inhalte: ${APP.autor}`)));
}
start();
