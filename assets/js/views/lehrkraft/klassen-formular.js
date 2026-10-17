/* Dialog: Klasse anlegen oder bearbeiten */
import { h, dialog, isoTag, wochentagKurz, toast } from "../../core/ui.js";
import { newKey } from "../../core/store.js";

const KURSARTEN = ["Integrationskurs", "Jugendintegrationskurs", "Alphabetisierungskurs", "Berufssprachkurs (BSK)", "Allgemeiner Sprachkurs"];

export async function klasseDialog(ctx, klasse = null, kid = null) {
  const k = klasse || { name: "", niveau: "A1", kursart: "Integrationskurs", pruefung: "DTZ", start: isoTag(), ende: "", tage: [1, 2, 3, 4, 5], zeit: "08:30–12:45", raum: "" };
  const f = (name, typ = "text", attrs = {}) => h("input", { name, type: typ, value: k[name] || "", ...attrs });
  const sel = (name, opts) => h("select", { name }, opts.map((o) => h("option", { value: o, selected: k[name] === o }, o)));
  const tage = h("div.reihe", [1, 2, 3, 4, 5, 6].map((d) =>
    h("label.chip", { style: { cursor: "pointer" } }, h("input", { type: "checkbox", name: "tag", value: d, checked: (k.tage || []).includes(d) }), wochentagKurz(d))));
  const fehler = h("p.fehler-text");
  const inhalt = h("div.formular",
    h("label.feld", "Name der Klasse", f("name", "text", { required: true, placeholder: "z. B. Integrationskurs Modul 4" })),
    h("div.spalten-2",
      h("label.feld", "Niveau", sel("niveau", ["A1", "A2", "B1", "B2"])),
      h("label.feld", "Kursart", sel("kursart", KURSARTEN))),
    h("div.spalten-2",
      h("label.feld", "Prüfungsziel", sel("pruefung", ["DTZ", "DTB", "keine"])),
      h("label.feld", "Uhrzeit", f("zeit", "text", { placeholder: "08:30–12:45" }))),
    h("div.spalten-2",
      h("label.feld", "Beginn", f("start", "date", { required: true })),
      h("label.feld", "Ende", f("ende", "date"))),
    h("fieldset", { style: { border: 0, padding: 0, margin: 0 } }, h("legend", { style: { fontWeight: 650, marginBottom: ".4rem" } }, "Unterrichtstage"), tage),
    h("label.feld", "Raum", f("raum", "text", { placeholder: "optional" })),
    fehler);

  const ergebnis = await dialog({
    titel: klasse ? "Klasse bearbeiten" : "Neue Klasse",
    inhalt,
    aktionen: [
      { text: "Abbrechen", wert: null },
      { text: klasse ? "Änderungen speichern" : "Klasse anlegen", primaer: true, submit: true, wert: "ok", vorher: (d) => {
        const v = (n) => d.querySelector(`[name=${n}]`).value.trim();
        if (!v("name")) { fehler.textContent = "Bitte einen Namen eingeben."; return false; }
        if (!v("start")) { fehler.textContent = "Bitte ein Anfangsdatum wählen."; return false; }
        if (v("ende") && v("ende") < v("start")) { fehler.textContent = "Das Ende liegt vor dem Beginn."; return false; }
        const tageGew = [...d.querySelectorAll("input[name=tag]:checked")].map((x) => Number(x.value));
        if (!tageGew.length) { fehler.textContent = "Bitte mindestens einen Unterrichtstag wählen."; return false; }
        Object.assign(k, { name: v("name"), niveau: v("niveau"), kursart: v("kursart"), pruefung: v("pruefung"), zeit: v("zeit"), start: v("start"), ende: v("ende"), raum: v("raum"), tage: tageGew });
        return true;
      } },
    ],
  });
  if (!ergebnis) return null;
  const id = kid || "k_" + newKey();
  if (!klasse) { k.lehrkraefte = { [ctx.session.uid]: true }; k.erstellt = Date.now(); }
  await ctx.store.set(ctx.schule("klassen/" + id), k);
  toast(klasse ? "Änderungen gespeichert" : "Klasse angelegt");
  return id;
}
