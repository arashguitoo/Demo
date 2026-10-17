/* ==========================================================
   Datenschicht mit zwei Adaptern und identischer Schnittstelle:
   – Firebase Realtime Database + Auth (wenn FIREBASE_CONFIG gesetzt)
   – Lokaler Demo-Speicher (localStorage, tabübergreifend live)
   Pfade sind Strings wie "schools/s1/classes/k1".
   ========================================================== */
import { FIREBASE_CONFIG } from "../config.js";

const PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
let lastPush = 0, lastRand = [];
/** Zeitlich sortierbare IDs (wie Firebase push) */
export function newKey() {
  let now = Date.now();
  const dup = now === lastPush; lastPush = now;
  const t = new Array(8);
  for (let i = 7; i >= 0; i--) { t[i] = PUSH_CHARS.charAt(now % 64); now = Math.floor(now / 64); }
  let id = t.join("");
  if (!dup) { for (let i = 0; i < 12; i++) lastRand[i] = Math.floor(Math.random() * 64); }
  else { let i = 11; for (; i >= 0 && lastRand[i] === 63; i--) lastRand[i] = 0; if (i >= 0) lastRand[i]++; }
  for (let i = 0; i < 12; i++) id += PUSH_CHARS.charAt(lastRand[i]);
  return id;
}

const split = (p) => String(p || "").split("/").filter(Boolean);
const clone = (v) => (v === undefined ? null : JSON.parse(JSON.stringify(v)));
const isEmpty = (v) => v === null || v === undefined || (typeof v === "object" && Object.keys(v).length === 0);

/* ---------------- Lokaler Adapter ---------------- */
const LS_KEY = "sh_db_v1";
const LS_AUTH = "sh_auth_v1";

function createLocal() {
  let tree = load();
  const listeners = new Set();
  let chan = null;
  try { chan = new BroadcastChannel("sh_db"); } catch (e) { /* alte Browser */ }

  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(tree)); } catch (e) { console.warn("Speichern fehlgeschlagen", e); }
  }
  function read(path) {
    let node = tree;
    for (const k of split(path)) { if (node == null || typeof node !== "object") return null; node = node[k]; }
    return node === undefined ? null : node;
  }
  function write(path, val) {
    const keys = split(path);
    if (!keys.length) { tree = isEmpty(val) ? {} : clone(val); return; }
    let node = tree;
    const stack = [];
    for (let i = 0; i < keys.length - 1; i++) {
      if (node[keys[i]] == null || typeof node[keys[i]] !== "object") node[keys[i]] = {};
      stack.push([node, keys[i]]);
      node = node[keys[i]];
    }
    const last = keys[keys.length - 1];
    if (isEmpty(val)) delete node[last]; else node[last] = clone(val);
    // leere Elternknoten aufräumen (wie Firebase)
    for (let i = stack.length - 1; i >= 0; i--) {
      const [parent, k] = stack[i];
      if (isEmpty(parent[k])) delete parent[k]; else break;
    }
  }
  function related(a, b) {
    const A = split(a).join("/"), B = split(b).join("/");
    return A === B || A.startsWith(B + "/") || B.startsWith(A + "/") || !A || !B;
  }
  function notify(changed) {
    for (const l of listeners) {
      if (changed.some((c) => related(c, l.path))) {
        const v = clone(read(l.path));
        const s = JSON.stringify(v);
        if (s !== l.last) { l.last = s; try { l.cb(v); } catch (e) { console.error(e); } }
      }
    }
  }
  function commit(changed) {
    save();
    notify(changed);
    if (chan) chan.postMessage({ changed });
  }
  const refresh = (changed) => { tree = load(); notify(changed || [""]); };
  if (chan) chan.onmessage = (e) => refresh(e.data && e.data.changed);
  window.addEventListener("storage", (e) => { if (e.key === LS_KEY) refresh([""]); });

  /* Auth (Demo): Lehrkraft-Konten unter _auth, Sitzung im Browser */
  function authLoad() { try { return JSON.parse(localStorage.getItem(LS_AUTH)) || null; } catch (e) { return null; } }
  function authSave(v) { if (v) localStorage.setItem(LS_AUTH, JSON.stringify(v)); else localStorage.removeItem(LS_AUTH); }
  const mailKey = (m) => String(m).trim().toLowerCase().replace(/[.#$\[\]\/]/g, "_");

  return {
    mode: "demo",
    async get(path) { tree = load(); return clone(read(path)); },
    async set(path, val) { tree = load(); write(path, val); commit([path]); },
    async update(path, obj) {
      tree = load();
      const base = split(path).join("/");
      const changed = [];
      for (const [k, v] of Object.entries(obj)) { const p = base ? base + "/" + k : k; write(p, v); changed.push(p); }
      commit(changed);
    },
    async push(path, val) { const k = newKey(); await this.set(split(path).concat(k).join("/"), val); return k; },
    async remove(path) { await this.set(path, null); },
    on(path, cb) {
      const l = { path, cb, last: undefined };
      listeners.add(l);
      const v = clone(read(path)); l.last = JSON.stringify(v);
      setTimeout(() => cb(v), 0);
      return () => listeners.delete(l);
    },
    async transaction(path, fn) { tree = load(); const nv = fn(clone(read(path))); if (nv !== undefined) { write(path, nv); commit([path]); } return nv; },
    auth: {
      async signIn(email, pw) {
        tree = load();
        const acc = read("_auth/" + mailKey(email));
        if (!acc || acc.pw !== pw) throw new Error("E-Mail oder Passwort stimmt nicht.");
        authSave({ uid: acc.uid, anon: false }); return acc.uid;
      },
      async signUp(email, pw) {
        tree = load();
        if (read("_auth/" + mailKey(email))) throw new Error("Für diese E-Mail gibt es schon ein Konto.");
        const uid = "u_" + newKey();
        write("_auth/" + mailKey(email), { uid, pw }); commit(["_auth"]);
        authSave({ uid, anon: false }); return uid;
      },
      async signInAnon() { const cur = authLoad(); if (cur && cur.anon) return cur.uid; const uid = "a_" + newKey(); authSave({ uid, anon: true }); return uid; },
      async signOut() { authSave(null); },
      async ready() { const a = authLoad(); return a ? a.uid : null; },
      /* nur Demo: Konto direkt anlegen (für Beispieldaten) */
      _seedAccount(email, pw, uid) { write("_auth/" + mailKey(email), { uid, pw }); },
    },
    _resetAll() { localStorage.removeItem(LS_KEY); localStorage.removeItem(LS_AUTH); tree = {}; },
    _commitSeed() { commit([""]); },
    _tree: () => tree,
    _write: (p, v) => write(p, v),
    _load: () => { tree = load(); },
  };
}

/* ---------------- Firebase-Adapter ---------------- */
async function createFirebase(cfg) {
  const V = "10.14.1";
  const appM = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const dbM = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-database.js`);
  const auM = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`);
  const app = appM.initializeApp(cfg);
  const db = dbM.getDatabase(app);
  const auth = auM.getAuth(app);
  const r = (p) => dbM.ref(db, split(p).join("/") || undefined);
  const authReady = new Promise((res) => { const off = auM.onAuthStateChanged(auth, (u) => { off(); res(u ? u.uid : null); }); });
  const msg = (e) => {
    const c = (e && e.code) || "";
    if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found")) return "E-Mail oder Passwort stimmt nicht.";
    if (c.includes("email-already-in-use")) return "Für diese E-Mail gibt es schon ein Konto.";
    if (c.includes("weak-password")) return "Das Passwort braucht mindestens 6 Zeichen.";
    if (c.includes("too-many-requests")) return "Zu viele Versuche. Bitte kurz warten.";
    if (c.includes("network")) return "Keine Verbindung. Bitte Internet prüfen.";
    return (e && e.message) || "Unbekannter Fehler.";
  };
  return {
    mode: "firebase",
    async get(p) { const s = await dbM.get(r(p)); return s.exists() ? s.val() : null; },
    async set(p, v) { await dbM.set(r(p), v === undefined ? null : v); },
    async update(p, obj) { await dbM.update(r(p), obj); },
    async push(p, v) { const k = dbM.push(r(p)); await dbM.set(k, v); return k.key; },
    async remove(p) { await dbM.remove(r(p)); },
    on(p, cb) { return dbM.onValue(r(p), (s) => cb(s.exists() ? s.val() : null), (e) => console.warn("Lesen verweigert:", p, e.message)); },
    async transaction(p, fn) { const res = await dbM.runTransaction(r(p), (cur) => fn(cur)); return res.snapshot.val(); },
    auth: {
      async signIn(email, pw) { try { return (await auM.signInWithEmailAndPassword(auth, email, pw)).user.uid; } catch (e) { throw new Error(msg(e)); } },
      async signUp(email, pw) { try { return (await auM.createUserWithEmailAndPassword(auth, email, pw)).user.uid; } catch (e) { throw new Error(msg(e)); } },
      async signInAnon() { if (auth.currentUser && auth.currentUser.isAnonymous) return auth.currentUser.uid; try { return (await auM.signInAnonymously(auth)).user.uid; } catch (e) { throw new Error(msg(e)); } },
      async signOut() { await auM.signOut(auth); },
      async ready() { await authReady; return auth.currentUser ? auth.currentUser.uid : null; },
    },
  };
}

let storePromise = null;
export function getStore() {
  if (!storePromise) storePromise = FIREBASE_CONFIG ? createFirebase(FIREBASE_CONFIG) : Promise.resolve(createLocal());
  return storePromise;
}
