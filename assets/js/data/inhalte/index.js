/* Welche Aktivitäten haben schon Inhalte – und wohin führen sie? */

/** Pakete mit Modulen (Übungs-Engine) */
export const PAKETE = new Set([
  "lp-a1-stadt", "lp-a2-arzt", "lp-b1-amt", "lp-b2-betrieb",
  "ws-artikel", "ws-beruf",
  "gr-satzklammer", "gr-kasus", "gr-konnektoren", "gr-passiv",
  "ar-liga", "ar-liga-beruf",
]);

/** Aktivitäten mit eigener Oberfläche */
export const SONDER = {
  "ws-karteikasten": "#/karteikasten",
  "gs-whatsapp": "#/chat/gs-whatsapp",
  "gs-whatsapp-b2": "#/chat/gs-whatsapp-b2",
  "gs-schnitzeljagd": "#/jagd",
  "lv-quizduell": "#/live",
  "lv-millionaer": "#/live",
};

/** Prüfungssätze */
export const PRUEFUNGEN = new Set([
  "pr-dtz-lesen", "pr-dtz-hoeren", "pr-dtz-schreiben", "pr-dtz-sprechen",
  "pr-dtb-lesen", "pr-dtb-hoeren", "pr-dtb-schreiben", "pr-dtb-sprachbausteine", "pr-dtb-telefonnotiz", "pr-dtb-sprechen",
]);

/** Was ist schon spielbar? Wird beim Start einmal geprüft (Datei vorhanden). */
const verfuegbar = new Map();
export async function pruefeVerfuegbar(ids) {
  await Promise.all(ids.map(async (id) => {
    if (verfuegbar.has(id)) return;
    try { await ladeQuelle(id); verfuegbar.set(id, true); } catch (e) { verfuegbar.set(id, false); }
  }));
  return (id) => verfuegbar.get(id) === true;
}

function ladeQuelle(id) {
  if (PAKETE.has(id)) return import(`./${id}.js`);
  if (PRUEFUNGEN.has(id)) return import(`../pruefung/${PRUEFUNG_DATEI[id] || id}.js`);
  if (SONDER[id]) return Promise.resolve(SONDER_BEREIT.has(id) ? {} : Promise.reject(new Error("bald")));
  return Promise.reject(new Error("unbekannt"));
}

/** Prüfungsteile, die in einer gemeinsamen Datei liegen */
export const PRUEFUNG_DATEI = {
  "pr-dtb-schreiben": "pr-dtb-sprachbausteine",
  "pr-dtb-telefonnotiz": "pr-dtb-hoeren",
};

/** Sonderoberflächen, die schon fertig sind (wird beim Bauen ergänzt) */
export const SONDER_BEREIT = new Set(["gs-whatsapp", "gs-whatsapp-b2", "lv-quizduell"]);

export const route = (id) => (SONDER[id] ? SONDER[id] : PRUEFUNGEN.has(id) ? "#/pruefung/" + id : "#/paket/" + id);

export async function ladePaket(id) { return (await import(`./${id}.js`)).default; }
export async function ladePruefung(id) { return (await import(`../pruefung/${PRUEFUNG_DATEI[id] || id}.js`)).default; }
