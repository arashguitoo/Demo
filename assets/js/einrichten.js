/* ==========================================================
   Einrichtung der Demo-Schule in Firebase (einmalig, durch Arash)
   1. Schulleitung-Konto anlegen → Admin der Demo-Schule
   2. Einladung für die zweite Lehrkraft → Konto anlegen
   3. Beispieldaten (relativ zu heute) schreiben
   „Beispieldaten erneuern“ schreibt die Daten neu, damit das
   Klassenbuch wieder aktuell aussieht.
   ========================================================== */
import { FIREBASE_CONFIG } from "./config.js";
import { getStore } from "./core/store.js";
import { h, mount } from "./core/ui.js";
import { demoDaten, DEMO } from "./data/demo-daten.js";

const log = h("ol.protokoll");
const schreib = (t, art = "") => { log.appendChild(h("li" + (art ? "." + art : ""), t)); };
const mailKey = (m) => m.toLowerCase().replace(/\./g, "_");

async function konto(store, l) {
  try { return await store.auth.signUp(l.email, l.pw); }
  catch (e) { if (/schon ein Konto/.test(e.message)) return store.auth.signIn(l.email, l.pw); throw e; }
}

async function einrichten() {
  const store = await getStore();
  const [leitung, lehrkraft] = DEMO.lehrkraefte;
  const sid = DEMO.schoolId;

  schreib("Melde Schulleitung an …");
  const uidL = await konto(store, leitung);
  if (!(await store.get("users/" + uidL))) {
    await store.set("users/" + uidL, { schoolId: sid, name: leitung.name, email: leitung.email, rolle: "admin" });
    schreib("Schulleitung angelegt.", "ok");
  } else schreib("Schulleitung gab es schon.", "ok");
  if (!(await store.get(`schools/${sid}/meta`))) await store.set(`schools/${sid}/meta`, { name: DEMO.schule, erstellt: Date.now(), demo: true });
  await store.set(`schools/${sid}/einladungen/${mailKey(lehrkraft.email)}`, { rolle: "lehrkraft", von: uidL });
  await store.auth.signOut();

  schreib("Melde zweite Lehrkraft an …");
  const uidT = await konto(store, lehrkraft);
  if (!(await store.get("users/" + uidT))) {
    await store.set("users/" + uidT, { schoolId: sid, name: lehrkraft.name, email: lehrkraft.email, rolle: "lehrkraft" });
    schreib("Lehrkraft angelegt.", "ok");
  } else schreib("Lehrkraft gab es schon.", "ok");
  await store.auth.signOut();

  await store.auth.signIn(leitung.email, leitung.pw);
  schreib("Schreibe Beispieldaten …");
  // alte Bewegungsdaten entfernen, damit nichts Veraltetes stehen bleibt
  for (const teil of ["klassen", "students", "klassenbuch", "anwesenheit", "ergebnisse", "rueckmeldung"]) await store.remove(`schools/${sid}/${teil}`);
  const ersetzen = (text) => text.replaceAll("u_demo_leitung", uidL).replaceAll("u_demo_lehrkraft", uidT);
  const daten = JSON.parse(ersetzen(JSON.stringify(demoDaten())));
  const eintraege = Object.entries(daten).filter(([p]) => !p.startsWith("users/") && p !== `schools/${sid}/meta`);
  for (let i = 0; i < eintraege.length; i += 400) {
    await store.update("", Object.fromEntries(eintraege.slice(i, i + 400)));
    schreib(`${Math.min(i + 400, eintraege.length)} von ${eintraege.length} Einträgen`);
  }
  await store.auth.signOut();
  schreib("Fertig. Die Demo-Zugänge auf der Startseite funktionieren jetzt.", "ok");
}

function start() {
  const knopf = h("button.btn.primaer", { onclick: async () => {
    knopf.disabled = true; log.replaceChildren();
    try { await einrichten(); } catch (e) { console.error(e); schreib("Fehler: " + e.message, "fehler"); }
    knopf.disabled = false;
  } }, "Demo-Schule einrichten bzw. Beispieldaten erneuern");
  mount(document.getElementById("einrichten"),
    h("main.seite", { style: { maxWidth: "720px", padding: "2rem 1rem" } },
      h("h1", "Demo-Schule einrichten"),
      FIREBASE_CONFIG
        ? [h("p", "Legt die beiden Lehrkraft-Konten an und schreibt Klassen, Lernende, Klassenbuch und Ergebnisse neu, mit Daten bis gestern. Bestehende Demo-Daten werden ersetzt."), knopf]
        : h("p", "Es ist noch keine Firebase-Konfiguration eingetragen (assets/js/config.js). Im Demo-Modus legt die Startseite die Beispieldaten automatisch an."),
      log,
      h("p", h("a", { href: "index.html" }, "Zur Startseite"))));
}
start();
