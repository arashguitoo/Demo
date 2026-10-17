/* Sprachausgabe für Hörtexte (Web Speech API, deutsche Stimmen) */
let stimmen = [];
function ladeStimmen() { try { stimmen = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith("de")); } catch (e) { stimmen = []; } }
if ("speechSynthesis" in window) { ladeStimmen(); speechSynthesis.onvoiceschanged = ladeStimmen; }

const WEIBLICH = /(anna|petra|helena|katja|hedda|marlene|vicki|female|frau|google deutsch$|amala|seraphina|louisa|elke)/i;
const MAENNLICH = /(markus|yannick|stefan|hans|male|mann|conrad|killian|florian|daniel)/i;

function stimmeFuer(art, nr) {
  if (!stimmen.length) return null;
  const passend = stimmen.filter((v) => (art === "m" ? MAENNLICH : WEIBLICH).test(v.name));
  const liste = passend.length ? passend : stimmen;
  return liste[nr % liste.length];
}

export const sprachausgabeMoeglich = () => "speechSynthesis" in window;

/**
 * Liest einen Hörtext vor. sprecher: [{wer, stimme:"m"|"w", text}]
 * Rückgabe: { stopp(), fertig: Promise }
 */
export function vorlesen(sprecher, { tempo = 0.95, onZeile } = {}) {
  let abgebrochen = false;
  const rollen = {};
  let rNr = 0;
  const fertig = new Promise((resolve) => {
    if (!sprachausgabeMoeglich()) { resolve(false); return; }
    speechSynthesis.cancel();
    let i = 0;
    const naechste = () => {
      if (abgebrochen || i >= sprecher.length) { onZeile && onZeile(-1); resolve(!abgebrochen); return; }
      const s = sprecher[i];
      if (!(s.wer in rollen)) rollen[s.wer] = rNr++;
      const u = new SpeechSynthesisUtterance(s.text);
      u.lang = "de-DE";
      u.rate = tempo;
      const v = stimmeFuer(s.stimme, rollen[s.wer]);
      if (v) u.voice = v;
      // Wenn es nur eine Stimme gibt, Rollen über die Tonhöhe unterscheiden
      u.pitch = s.stimme === "m" ? 0.8 + (rollen[s.wer] % 2) * 0.1 : 1.15 + (rollen[s.wer] % 2) * 0.1;
      u.onend = () => { i++; setTimeout(naechste, 350); };
      u.onerror = () => { i++; setTimeout(naechste, 100); };
      onZeile && onZeile(i);
      speechSynthesis.speak(u);
    };
    naechste();
  });
  return { stopp() { abgebrochen = true; try { speechSynthesis.cancel(); } catch (e) { /* egal */ } }, fertig };
}
