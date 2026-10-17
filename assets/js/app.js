/* ==========================================================
   App-Rahmen: Sitzung prüfen, Navigation, Router
   ========================================================== */
import { APP } from "./config.js";
import { getStore } from "./core/store.js";
import { currentSession, logout } from "./core/session.js";
import { h, mount, icon, bestaetigen } from "./core/ui.js";
import { marke, autorZeile } from "./core/marke.js";
import { BEREICHE } from "./data/katalog.js";
import { sichereDemo, demoZuruecksetzen } from "./core/demo.js";

const NAV = {
  lehrkraft: [
    { href: "#/", text: "Übersicht", icon: "home" },
    { href: "#/klassen", text: "Klassen", icon: "school" },
    { href: "#/klassenbuch", text: "Klassenbuch", icon: "book" },
    { href: "#/lernende", text: "Lernende & Feedback", icon: "users" },
    { gruppe: "Unterricht" },
    { href: "#/inhalte", text: "Inhalte", icon: "layers" },
    { href: "#/live", text: "Live-Spiel starten", icon: "play" },
  ],
  tn: [
    { href: "#/", text: "Start", icon: "home" },
    { gruppe: "Üben" },
    ...BEREICHE.map((b) => ({ href: "#/bereich/" + b.id, text: b.titel, icon: b.icon })),
    { gruppe: "Ich" },
    { href: "#/fortschritt", text: "Mein Fortschritt", icon: "chart" },
  ],
};

const ROUTEN = [
  // Lehrkraft
  { rolle: "lehrkraft", muster: "/", view: () => import("./views/lehrkraft/uebersicht.js") },
  { rolle: "lehrkraft", muster: "/klassen", view: () => import("./views/lehrkraft/klassen.js") },
  { rolle: "lehrkraft", muster: "/klasse/:kid", view: () => import("./views/lehrkraft/klasse.js") },
  { rolle: "lehrkraft", muster: "/klassenbuch", view: () => import("./views/lehrkraft/klassenbuch.js") },
  { rolle: "lehrkraft", muster: "/klassenbuch/:kid", view: () => import("./views/lehrkraft/klassenbuch.js") },
  { rolle: "lehrkraft", muster: "/klassenbuch/:kid/:datum", view: () => import("./views/lehrkraft/klassenbuch-tag.js") },
  { rolle: "lehrkraft", muster: "/lernende", view: () => import("./views/lehrkraft/lernende.js") },
  { rolle: "lehrkraft", muster: "/tn/:stid", view: () => import("./views/feedback.js") },
  { rolle: "lehrkraft", muster: "/inhalte", view: () => import("./views/bereiche.js") },
  { rolle: "lehrkraft", muster: "/bereich/:bid", view: () => import("./views/bereiche.js") },
  { rolle: "lehrkraft", muster: "/live", view: () => import("./views/live-lk.js") },
  // Lernende
  { rolle: "tn", muster: "/", view: () => import("./views/tn/start.js") },
  { rolle: "tn", muster: "/bereich/:bid", view: () => import("./views/bereiche.js") },
  { rolle: "tn", muster: "/fortschritt", view: () => import("./views/feedback.js") },
  // beide Rollen (Lehrkräfte sehen eine Vorschau)
  { rolle: "*", muster: "/paket/:aid", view: () => import("./views/paket.js") },
  { rolle: "*", muster: "/spiel/:aid/:mid", view: () => import("./views/spiel.js") },
  { rolle: "*", muster: "/karteikasten", view: () => import("./views/karteikasten.js") },
  { rolle: "*", muster: "/chat/:aid", view: () => import("./views/chat.js") },
  { rolle: "*", muster: "/pruefung/:aid", view: () => import("./views/pruefung.js") },
  { rolle: "*", muster: "/jagd", view: () => import("./views/jagd.js") },
  { rolle: "tn", muster: "/live", view: () => import("./views/live-tn.js") },
];

function passt(muster, pfad) {
  const a = muster.split("/").filter(Boolean), b = pfad.split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

async function start() {
  const root = document.getElementById("app");
  const store = await getStore();
  if (store.mode === "demo") await sichereDemo(store);
  const session = await currentSession();
  if (!session) { location.replace("index.html"); return; }

  document.title = APP.name;
  const navEl = h("nav.nav", { "aria-label": "Hauptnavigation" });
  const haupt = h("main.haupt", { id: "inhalt", tabindex: "-1" });
  const appEl = h("div.app", navEl, h("div.nav-schleier", { onclick: () => appEl.classList.remove("nav-offen") }),
    h("div", { style: { minWidth: 0 } },
      h("header.mobil-kopf",
        marke("#/"),
        h("button.icon-btn", { "aria-label": "Menü öffnen", onclick: () => appEl.classList.add("nav-offen") }, icon("menu", 24))),
      haupt));

  const schule = await store.get(`schools/${session.schoolId}/meta`);
  const links = [];
  mount(navEl,
    marke("#/", schule ? schule.name : ""),
    NAV[session.rolle].map((n) => {
      if (n.gruppe) return h("div.nav-gruppe", n.gruppe);
      const a = h("a.nav-link", { href: n.href }, icon(n.icon), h("span", n.text));
      links.push(a);
      return a;
    }),
    h("div.nav-fuss",
      h("div.wer", h("div.avatar", (session.name || "?").slice(0, 1)),
        h("div", h("div.wer-name", session.name), h("div.wer-rolle", session.rolle === "lehrkraft" ? "Lehrkraft" : "Code " + session.code))),
      h("button.btn.leicht.klein", { style: { justifyContent: "flex-start" }, onclick: async () => { await logout(); location.replace("index.html"); } }, icon("logout", 18), "Abmelden"),
      autorZeile()));

  const teile = [];
  if (store.mode === "demo") {
    teile.push(h("div.demo-band.kein-druck", "Demo-Modus: Alle Daten liegen nur in diesem Browser. ",
      h("button", { onclick: async () => {
        if (await bestaetigen("Demo zurücksetzen?", "Alle Änderungen in diesem Browser gehen verloren und die Beispieldaten werden neu angelegt.", "Zurücksetzen", true)) {
          await demoZuruecksetzen(store); location.replace("index.html");
        }
      } }, "Demo zurücksetzen")));
  }
  mount(root, teile, appEl);

  let aufraeumen = [];
  async function route() {
    aufraeumen.forEach((f) => { try { f(); } catch (e) { /* egal */ } });
    aufraeumen = [];
    appEl.classList.remove("nav-offen");
    const pfad = (location.hash || "#/").slice(1) || "/";
    let treffer = null, params = null;
    for (const r of ROUTEN) { if (r.rolle !== session.rolle && r.rolle !== "*") continue; const p = passt(r.muster, pfad.split("?")[0]); if (p) { treffer = r; params = p; break; } }
    // aktiven Menüpunkt markieren (längster passender Präfix)
    let best = null;
    for (const a of links) { const ziel = a.getAttribute("href").slice(1); if (pfad === ziel || (ziel !== "/" && pfad.startsWith(ziel))) { if (!best || ziel.length > best.z.length) best = { a, z: ziel }; } }
    links.forEach((a) => { a.classList.toggle("aktiv", best && a === best.a); if (best && a === best.a) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });

    if (!treffer) { mount(haupt, h("div.seite", h("h1", "Seite nicht gefunden"), h("p", h("a", { href: "#/" }, "Zur Startseite")))); return; }
    mount(haupt, h("div.laden", { "aria-label": "Lädt" }));
    const ctx = {
      store, session, params,
      query: new URLSearchParams(pfad.split("?")[1] || ""),
      render: (...kids) => mount(haupt, h("div.seite", kids)),
      on: (pfadDb, cb) => { const off = store.on(pfadDb, cb); aufraeumen.push(off); return off; },
      aufraeumen: (f) => aufraeumen.push(f),
      schule: (rest = "") => `schools/${session.schoolId}${rest ? "/" + rest : ""}`,
    };
    try {
      const mod = await treffer.view();
      const meinPfad = location.hash;
      await mod.default(ctx);
      if (location.hash === meinPfad) { haupt.focus({ preventScroll: true }); window.scrollTo(0, 0); }
    } catch (e) {
      console.error(e);
      mount(haupt, h("div.seite", h("h1", "Das hat nicht geklappt"), h("p.leise", String(e.message || e)), h("button.btn", { onclick: route }, "Noch einmal versuchen")));
    }
  }
  window.addEventListener("hashchange", route);
  route();
}

start();
