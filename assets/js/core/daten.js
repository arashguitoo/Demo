/* Gemeinsame Datenhelfer für die Ansichten */

export const liste = (obj) => Object.entries(obj || {}).map(([id, v]) => ({ id, ...v }));

/** Klassen, die diese Lehrkraft sieht (Schulleitung sieht alle) */
export function meineKlassen(klassen, session) {
  return liste(klassen)
    .filter((k) => session.admin || (k.lehrkraefte && k.lehrkraefte[session.uid]))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
}

export function tnDerKlasse(students, kid, mitGast = true) {
  return liste(students)
    .filter((s) => s.klasseId === kid && s.aktiv !== false && (mitGast || !s.gast))
    .sort((a, b) => (a.gast ? 1 : 0) - (b.gast ? 1 : 0) || a.vorname.localeCompare(b.vorname, "de"));
}

export const istUnterrichtstag = (klasse, iso, eintrag) => {
  if (eintrag && eintrag.unterricht === false) return false;
  if (eintrag && eintrag.unterricht === true) return true;
  if (!klasse || iso < klasse.start || (klasse.ende && iso > klasse.ende)) return false;
  const [y, m, d] = iso.split("-").map(Number);
  return (klasse.tage || []).includes(new Date(y, m - 1, d).getDay());
};

export const kursFarbe = (niveau) => `var(--${String(niveau || "A1").toLowerCase()})`;
