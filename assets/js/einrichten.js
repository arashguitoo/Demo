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
  const [erste, ...weitere] = DEMO.lehrkraefte;
  const sid = DEMO.schoolId;
  const uids = {};

  schreib(`Melde ${erste.name} an …`);
  uids[erste.uid] = await konto(store, erste);
  if (!(await store.get("users/" + uids[erste.uid]))) {
    await store.set("users/" + uids[erste.uid], { schoolId: sid, name: erste.name, email: erste.email, rolle: "admin" });
    schreib(`${erste.name} angelegt.`, "ok");
  } else schreib(`${erste.name} gab es schon.`, "ok");
  if (!(await store.get(`schools/${sid}/meta`))) await store.set(`schools/${sid}/meta`, { name: DEMO.schule, erstellt: Date.now(), demo: true });
  for (const l of weitere) await store.set(`schools/${sid}/einladungen/${mailKey(l.email)}`, { rolle: "lehrkraft", von: uids[erste.uid] });
  await store.auth.signOut();

  for (const l of weitere) {
    schreib(`Melde ${l.name} an …`);
    uids[l.uid] = await konto(store, l);
    if (!(await store.get("users/" + uids[l.uid]))) {
      await store.set("users/" + uids[l.uid], { schoolId: sid, name: l.name, email: l.email, rolle: "lehrkraft" });
      schreib(`${l.name} angelegt.`, "ok");
    } else schreib(`${l.name} gab es schon.`, "ok");
    await store.auth.signOut();
  }

  await store.auth.signIn(erste.email, erste.pw);
  schreib("Schreibe Beispieldaten …");
  for (const teil of ["klassen", "students", "klassenbuch", "anwesenheit", "ergebnisse", "rueckmeldung", "abgaben", "karteikasten", "live"]) await store.remove(`schools/${sid}/${teil}`);
  for (const l of DEMO.lehrkraefte) await store.set(`schools/${sid}/teachers/${uids[l.uid]}`, { name: l.name, email: l.email, rolle: l.rolle });
  let text = JSON.stringify(demoDaten());
  for (const [platzhalter, echt] of Object.entries(uids)) text = text.replaceAll(platzhalter, echt);
  const daten = JSON.parse(text);
  const eintraege = Object.entries(daten).filter(([p]) => !p.startsWith("users/") && p !== `schools/${sid}/meta` && !p.startsWith(`schools/${sid}/teachers/`));
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
        ? [h("p", "Legt die drei Lehrkraft-Konten (Demo 1–3) an und schreibt Klassen, Lernende, Klassenbuch und Ergebnisse neu, mit Daten bis gestern. Bestehende Demo-Daten werden ersetzt."), knopf]
        : h("p", "Es ist noch keine Firebase-Konfiguration eingetragen (assets/js/config.js). Im Demo-Modus legt die Startseite die Beispieldaten automatisch an."),
      log,
      h("p", h("a", { href: "index.html" }, "Zur Startseite"))));
}
start();
