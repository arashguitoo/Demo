/* Demo-Modus: Beispielschule einmalig im Browser anlegen */
import { demoDaten, DEMO } from "../data/demo-daten.js";

const VERSION = 4;

export async function sichereDemo(store) {
  if (store.mode !== "demo") return;
  const v = await store.get("_demoVersion");
  if (v === VERSION) return;
  store._load();
  const daten = demoDaten();
  for (const [p, wert] of Object.entries(daten)) store._write(p, wert);
  for (const l of DEMO.lehrkraefte) store.auth._seedAccount(l.email, l.pw, l.uid);
  store._write("_demoVersion", VERSION);
  store._commitSeed();
}

export async function demoZuruecksetzen(store) {
  store._resetAll();
  await sichereDemo(store);
}
