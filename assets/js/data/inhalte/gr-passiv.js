export default {
  id: "gr-passiv",
  titel: "Passiv im Betrieb",
  niveau: "B2",
  module: [
    {
      id: "praesens",
      titel: "Passiv Präsens: Was wird gemacht?",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Passiv Präsens",
          html: `<p>Mit dem Passiv beschreibt man <b>Abläufe und Prozesse</b>. Wichtig ist die Handlung, nicht die Person.</p>
<p><b>werden</b> (konjugiert) + <b>Partizip II</b> am Satzende.</p>
<table>
<tr><th>Aktiv</th><th>Passiv</th></tr>
<tr><td>Man <b>prüft</b> die Ware.</td><td>Die Ware <b>wird geprüft</b>.</td></tr>
<tr><td>Die Kollegen <b>verpacken</b> die Pakete.</td><td>Die Pakete <b>werden</b> (von den Kollegen) <b>verpackt</b>.</td></tr>
</table>
<p>Das Akkusativobjekt im Aktiv wird zum <b>Subjekt</b> im Passiv. „man“ fällt weg.</p>`,
        },
        {
          typ: "luecke",
          satz: "Die Bestellungen ___ jeden Morgen kontrolliert.",
          optionen: ["werden", "wird", "werdet"],
          erklaerung: "Subjekt im Plural (die Bestellungen) → werden.",
        },
        {
          typ: "luecke",
          satz: "Der Lieferschein ___ vom Fahrer unterschrieben.",
          optionen: ["wird", "werden", "wurdet"],
          erklaerung: "Subjekt im Singular → wird.",
        },
        {
          typ: "luecke",
          satz: "Im Lager wird jede Palette mit Folie ___.",
          optionen: ["gesichert", "sichern", "sichert"],
          erklaerung: "Passiv: werden + Partizip II (gesichert).",
        },
        {
          typ: "luecke",
          satz: "Neue Mitarbeitende werden in der ersten Woche ___.",
          optionen: ["eingearbeitet", "geeinarbeitet", "einarbeiten"],
          erklaerung: "Trennbares Verb: einarbeiten → eingearbeitet.",
        },
        {
          typ: "satzbau",
          woerter: ["Die Kundendaten", "werden", "im System", "gespeichert."],
          alternativen: ["Im System werden die Kundendaten gespeichert."],
          erklaerung: "werden auf Position 2, Partizip II am Ende.",
        },
        {
          typ: "satzbau",
          woerter: ["Der Arbeitsplatz", "wird", "nach jeder Schicht", "gereinigt."],
          alternativen: ["Nach jeder Schicht wird der Arbeitsplatz gereinigt."],
          erklaerung: "werden auf Position 2, Partizip II am Ende.",
        },
        {
          typ: "mc",
          frage: `Wie heißt der Satz im Passiv? „Man repariert die Kaffeemaschine.“`,
          optionen: [
            "Die Kaffeemaschine wird repariert.",
            "Die Kaffeemaschine wird reparieren.",
            "Man wird die Kaffeemaschine repariert.",
            "Die Kaffeemaschine repariert.",
          ],
          erklaerung: "Das Objekt (die Kaffeemaschine) wird Subjekt; man fällt weg.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Die Rechnungen werden von Frau Schulz geprüft.",
            "Die Rechnungen werden durch Frau Schulz prüfen.",
            "Die Rechnungen wird von Frau Schulz geprüft.",
            "Die Rechnungen werden mit Frau Schulz geprüft.",
          ],
          erklaerung: "Die handelnde Person steht mit von + Dativ.",
        },
      ],
    },
    {
      id: "vergangenheit",
      titel: "Passiv Präteritum und Perfekt",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Was wurde gemacht? Was ist gemacht worden?",
          html: `<table>
<tr><th>Zeit</th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Präteritum</td><td>wurde + Partizip II</td><td>Die Ware <b>wurde</b> gestern <b>geliefert</b>.</td></tr>
<tr><td>Perfekt</td><td>sein + Partizip II + worden</td><td>Die Ware <b>ist</b> gestern <b>geliefert worden</b>.</td></tr>
</table>
<p>Im Perfekt Passiv heißt es <b>worden</b> – ohne ge-! <b>geworden</b> benutzt man nur bei werden als Vollverb: Sie ist Teamleiterin <b>geworden</b>.</p>
<p>In Berichten und Protokollen benutzt man meistens das <b>Präteritum</b>.</p>`,
        },
        {
          typ: "luecke",
          satz: "Die Lieferung ___ gestern um 15 Uhr angenommen.",
          optionen: ["wurde", "wird", "worden"],
          erklaerung: "gestern → Präteritum: wurde angenommen.",
        },
        {
          typ: "luecke",
          satz: "Die neuen Monitore wurden letzte Woche ___.",
          optionen: ["installiert", "installieren", "installiert worden"],
          erklaerung: "Präteritum Passiv: wurden + Partizip II.",
        },
        {
          typ: "luecke",
          satz: "Ist der Fehler schon gefunden ___?",
          optionen: ["worden", "geworden", "wurde"],
          erklaerung: "Perfekt Passiv: ist + Partizip II + worden.",
        },
        {
          typ: "luecke",
          satz: "Die Kundin ___ sofort zurückgerufen worden.",
          optionen: ["ist", "hat", "wird"],
          erklaerung: "Das Perfekt Passiv bildet man immer mit sein.",
        },
        {
          typ: "satzbau",
          woerter: ["Das Protokoll", "wurde", "an alle", "verschickt."],
          alternativen: ["An alle wurde das Protokoll verschickt."],
          erklaerung: "Präteritum: wurde auf Position 2, Partizip II am Ende.",
        },
        {
          typ: "satzbau",
          woerter: ["Die Maschine", "ist", "gestern", "gewartet", "worden."],
          alternativen: ["Gestern ist die Maschine gewartet worden."],
          erklaerung: "Perfekt: ist … gewartet worden.",
        },
        {
          typ: "mc",
          frage: `Wie heißt der Satz im Perfekt Passiv? „Die Teamleiterin hat die Termine verschoben.“`,
          optionen: [
            "Die Termine sind von der Teamleiterin verschoben worden.",
            "Die Termine haben von der Teamleiterin verschoben worden.",
            "Die Termine sind von der Teamleiterin verschoben geworden.",
            "Die Termine wurden von der Teamleiterin verschoben worden.",
          ],
          erklaerung: "sein + Partizip II + worden; Plural → sind.",
        },
        {
          typ: "mc",
          frage: "In welchem Satz ist werden ein Vollverb (nicht Passiv)?",
          optionen: [
            "Herr Yılmaz ist letztes Jahr Schichtleiter geworden.",
            "Herr Yılmaz ist letztes Jahr befördert worden.",
            "Herr Yılmaz wurde letztes Jahr befördert.",
            "Herr Yılmaz wird jedes Jahr geschult.",
          ],
          erklaerung: "Schichtleiter werden = einen neuen Beruf/Status bekommen → geworden.",
        },
      ],
    },
    {
      id: "modal",
      titel: "Passiv mit Modalverben",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Was muss gemacht werden?",
          html: `<p>Regeln und Anweisungen stehen oft im Passiv mit Modalverb.</p>
<p><b>Modalverb</b> (konjugiert) + <b>Partizip II</b> + <b>werden</b> am Satzende.</p>
<table>
<tr><th>Modalverb</th><th>Beispiel</th></tr>
<tr><td>müssen</td><td>Der Helm <b>muss getragen werden</b>.</td></tr>
<tr><td>dürfen (nicht)</td><td>Der Fluchtweg <b>darf</b> nicht <b>zugestellt werden</b>.</td></tr>
<tr><td>können</td><td>Die Formulare <b>können</b> online <b>ausgefüllt werden</b>.</td></tr>
<tr><td>sollen</td><td>Die Pläne <b>sollen</b> bis Freitag <b>fertiggestellt werden</b>.</td></tr>
</table>
<p>Im Präteritum: Die Anlage <b>musste abgeschaltet werden</b>.</p>`,
        },
        {
          typ: "luecke",
          satz: "Vor der Arbeit muss die Schutzbrille aufgesetzt ___.",
          optionen: ["werden", "worden", "wird"],
          erklaerung: "Modalverb + Partizip II + werden.",
        },
        {
          typ: "luecke",
          satz: "Die Urlaubsanträge ___ bis Ende Januar eingereicht werden.",
          optionen: ["müssen", "muss", "musst"],
          erklaerung: "Plural (die Urlaubsanträge) → müssen.",
        },
        {
          typ: "luecke",
          satz: "Im Lager darf nicht ___ werden.",
          optionen: ["geraucht", "rauchen", "raucht"],
          erklaerung: "Partizip II vor werden: geraucht werden.",
        },
        {
          typ: "luecke",
          satz: "Der Auftrag konnte gestern leider nicht abgeschlossen ___.",
          optionen: ["werden", "worden", "wurde"],
          erklaerung: "Auch im Präteritum: Modalverb + Partizip II + werden.",
        },
        {
          typ: "satzbau",
          woerter: ["Die Arbeitszeit", "kann", "auch", "per App", "erfasst", "werden."],
          alternativen: [
            "Per App kann die Arbeitszeit auch erfasst werden.",
            "Die Arbeitszeit kann per App auch erfasst werden.",
            "Auch per App kann die Arbeitszeit erfasst werden.",
          ],
          erklaerung: "Modalverb auf Position 2, Partizip II + werden am Ende.",
        },
        {
          typ: "satzbau",
          woerter: ["Defekte Geräte", "müssen", "sofort", "gemeldet", "werden."],
          alternativen: ["Sofort müssen defekte Geräte gemeldet werden."],
          erklaerung: "Modalverb auf Position 2, Partizip II + werden am Ende.",
        },
        {
          typ: "mc",
          frage: `Wie heißt die Regel im Passiv? „Man darf die Notausgänge nicht abschließen.“`,
          optionen: [
            "Die Notausgänge dürfen nicht abgeschlossen werden.",
            "Die Notausgänge darf nicht abgeschlossen werden.",
            "Die Notausgänge dürfen nicht abgeschlossen worden.",
            "Die Notausgänge werden nicht abschließen dürfen.",
          ],
          erklaerung: "Plural → dürfen; Partizip II + werden am Ende.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Die Kundin sollte noch heute informiert werden.",
            "Die Kundin sollte noch heute informiert worden.",
            "Die Kundin sollte noch heute werden informiert.",
            "Die Kundin sollte noch heute informieren werden.",
          ],
          erklaerung: "Modalverb + Partizip II + werden.",
        },
      ],
    },
  ],
};
