/* ==========================================================
   Anmeldung und Sitzung
   Lehrkraft: E-Mail + Passwort  → users/{uid} = {schoolId, name, rolle}
   Lernende:  Code (anonym)      → sessions/{uid} = {schoolId, studentId, code}
   ========================================================== */
import { getStore, newKey } from "./store.js";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ohne 0/O, 1/I
export function makeCode(len = 6) {
  let s = "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) s += CODE_ALPHABET[arr[i] % CODE_ALPHABET.length];
  return s;
}
/** Eingabe vereinheitlichen (Leerzeichen, Bindestriche, Kleinschreibung egal) */
export const normCode = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

let cached = null;

/** Letzter Fehler beim Prüfen der Sitzung (z. B. Regeln nicht veröffentlicht) */
export let sitzungsFehler = null;

export async function currentSession() {
  try {
    sitzungsFehler = null;
    return await sitzungLaden();
  } catch (e) {
    console.error("Sitzung prüfen fehlgeschlagen:", e);
    sitzungsFehler = /permission|denied/i.test(e && (e.code || e.message)) ? "Die Datenbank verweigert den Zugriff. Sind die Sicherheitsregeln in Firebase veröffentlicht?" : (e && e.message) || String(e);
    // kaputte Anmeldung verwerfen, damit die Startseite wieder benutzbar ist
    try { (await getStore()).auth.signOut(); } catch (x) { /* egal */ }
    cached = null;
    return null;
  }
}

async function sitzungLaden() {
  if (cached) return cached;
  const store = await getStore();
  const uid = await store.auth.ready();
  if (!uid) return null;
  const user = await store.get("users/" + uid);
  if (user && user.schoolId) {
    cached = { rolle: "lehrkraft", uid, schoolId: user.schoolId, name: user.name, admin: user.rolle === "admin", email: user.email };
    return cached;
  }
  const ses = await store.get("sessions/" + uid);
  if (ses && ses.schoolId && ses.studentId) {
    const st = await store.get(`schools/${ses.schoolId}/students/${ses.studentId}`);
    if (!st || st.code !== ses.code || st.aktiv === false) { await store.remove("sessions/" + uid); return null; }
    cached = { rolle: "tn", uid, schoolId: ses.schoolId, studentId: ses.studentId, name: st.vorname, klasseId: st.klasseId, code: ses.code };
    return cached;
  }
  return null;
}

export async function loginLehrkraft(email, pw) {
  const store = await getStore();
  const uid = await store.auth.signIn(email.trim(), pw);
  const user = await store.get("users/" + uid);
  if (!user || !user.schoolId) { await store.auth.signOut(); throw new Error("Dieses Konto gehört zu keiner Schule."); }
  cached = null;
  const s = await currentSession();
  if (!s) throw new Error(sitzungsFehler || "Anmeldung fehlgeschlagen.");
  return s;
}

export async function loginCode(rawCode) {
  const code = normCode(rawCode);
  if (code.length < 4) throw new Error("Bitte den ganzen Code eingeben.");
  const store = await getStore();
  const uid = await store.auth.signInAnon();
  let hit;
  try { hit = await store.get("codes/" + code); }
  catch (e) { throw new Error(/permission|denied/i.test(e.code || e.message) ? "Die Datenbank verweigert den Zugriff. Sind die Sicherheitsregeln in Firebase veröffentlicht?" : e.message); }
  if (!hit) throw new Error("Diesen Code gibt es nicht. Bitte noch einmal prüfen.");
  await store.set("sessions/" + uid, { schoolId: hit.schoolId, studentId: hit.studentId, code, ts: Date.now() });
  cached = null;
  const s = await currentSession();
  if (!s) throw new Error(sitzungsFehler || "Dieser Code ist nicht mehr aktiv. Bitte die Lehrkraft fragen.");
  return s;
}

/** Neue Schule mit erster Lehrkraft (Admin) anlegen */
export async function schuleAnlegen({ schule, name, email, pw }) {
  const store = await getStore();
  const uid = await store.auth.signUp(email.trim(), pw);
  const sid = "s_" + newKey();
  await store.set("users/" + uid, { schoolId: sid, name, email: email.trim(), rolle: "admin" });
  await store.update("schools/" + sid, {
    meta: { name: schule, erstellt: Date.now() },
    ["teachers/" + uid]: { name, email: email.trim(), rolle: "admin" },
  });
  cached = null;
  const s = await currentSession();
  if (!s) throw new Error(sitzungsFehler || "Anmeldung fehlgeschlagen.");
  return s;
}

export async function logout() {
  const store = await getStore();
  const s = cached || (await currentSession());
  if (s && s.rolle === "tn") { try { await store.remove("sessions/" + s.uid); } catch (e) { /* egal */ } }
  await store.auth.signOut();
  cached = null;
}

export function clearSessionCache() { cached = null; }
