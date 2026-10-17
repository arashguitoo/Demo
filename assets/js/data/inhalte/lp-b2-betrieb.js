export default {
  id: "lp-b2-betrieb",
  titel: "Erster Tag im Betrieb",
  niveau: "B2",
  module: [
    {
      id: "woerter",
      titel: "Wortfeld Betrieb",
      fertigkeit: "wortschatz",
      aufgaben: [
        {
          typ: "paare",
          anweisung: "Was bedeutet der Begriff? Tippe links und dann rechts.",
          paare: [
            ["die Einarbeitung", "die erste Zeit, in der man die neue Stelle kennenlernt"],
            ["die Unterweisung", "eine Schulung zu Regeln und Gefahren am Arbeitsplatz"],
            ["der Schichtplan", "eine Übersicht, wer wann arbeitet"],
            ["das Protokoll", "eine schriftliche Zusammenfassung einer Besprechung"],
            ["die Probezeit", "die ersten Monate, in denen leichter gekündigt werden kann"],
            ["die Ansprechpartnerin", "die Person, an die man sich mit Fragen wendet"],
          ],
        },
        {
          typ: "luecke",
          satz: "In den ersten zwei Wochen begleitet Sie Frau Petersen bei der ___.",
          optionen: ["Einarbeitung", "Kündigung", "Bewerbung"],
          erklaerung: "Die Einarbeitung ist die Phase, in der man die Arbeit kennenlernt.",
        },
        {
          typ: "luecke",
          satz: "In der Halle besteht Pflicht, Sicherheitsschuhe und Gehörschutz zu ___.",
          optionen: ["tragen", "nehmen", "halten"],
          erklaerung: "Schutzkleidung trägt man.",
        },
        {
          typ: "mc",
          frage: "Was ist die persönliche Schutzausrüstung (PSA)?",
          optionen: [
            "Kleidung und Geräte, die die Beschäftigten vor Verletzungen schützen",
            "eine Versicherung für Unfälle auf dem Weg zur Arbeit",
            "der Ausweis, mit dem man das Gelände betritt",
            "ein Kurs zur Ersten Hilfe",
          ],
          erklaerung: "Zur PSA gehören z. B. Helm, Handschuhe, Schutzbrille und Sicherheitsschuhe.",
        },
        {
          typ: "luecke",
          satz: "Wer möchte heute das ___ der Teambesprechung schreiben?",
          optionen: ["Protokoll", "Formular", "Zeugnis"],
          erklaerung: "Die Ergebnisse einer Besprechung hält man im Protokoll fest.",
        },
        {
          typ: "paare",
          anweisung: "Welches Verb passt? Tippe links und dann rechts.",
          paare: [
            ["eine Schicht", "tauschen"],
            ["einen Unfall", "melden"],
            ["eine Besprechung", "leiten"],
            ["die Arbeitszeit", "erfassen"],
            ["einen Urlaubsantrag", "stellen"],
            ["die Maschine", "warten"],
          ],
        },
        {
          typ: "luecke",
          satz: "Wenn Sie krank sind, müssen Sie sich vor Schichtbeginn bei Ihrer ___ krankmelden.",
          optionen: ["Vorgesetzten", "Kundin", "Krankenkasse"],
          erklaerung: "Die Krankmeldung geht zuerst an die oder den Vorgesetzten.",
        },
        {
          typ: "mc",
          frage: "Was steht auf der Tagesordnung?",
          optionen: [
            "die Themen, die in einer Besprechung behandelt werden",
            "die Arbeitszeiten der nächsten Woche",
            "die Speisen in der Kantine",
            "die Namen aller Mitarbeitenden",
          ],
          erklaerung: "Die Tagesordnung legt fest, worüber in der Besprechung gesprochen wird.",
        },
        {
          typ: "sortieren",
          anweisung: "Wohin gehört der Begriff?",
          gruppen: {
            "Arbeitsschutz": ["Schutzbrille", "Fluchtweg", "Feuerlöscher", "Erste-Hilfe-Kasten"],
            "Besprechung": ["Tagesordnung", "Protokoll", "Beschluss", "Moderation"],
            "Arbeitszeit": ["Frühschicht", "Überstunden", "Zeiterfassung"],
          },
        },
        {
          typ: "luecke",
          satz: "Ich habe nächste Woche Spätschicht. Könnten wir am Dienstag die Schicht ___?",
          optionen: ["tauschen", "verteilen", "vertreten"],
          erklaerung: "Mit einer Kollegin oder einem Kollegen tauscht man die Schicht.",
        },
        {
          typ: "mc",
          frage: "Ein Kollege sagt: „Das klären wir unter Punkt drei.“ Was meint er?",
          optionen: [
            "Das Thema wird später in der Besprechung besprochen.",
            "Das Thema ist schon erledigt.",
            "Man soll drei Kollegen fragen.",
            "Das Gespräch dauert drei Stunden.",
          ],
          erklaerung: "Punkt drei ist ein Tagesordnungspunkt der Besprechung.",
        },
        {
          typ: "luecke",
          satz: "Jeder Arbeitsunfall muss sofort der Schichtleitung ___ werden.",
          optionen: ["gemeldet", "gesprochen", "geredet"],
          erklaerung: "Einen Unfall meldet man; im Passiv: muss gemeldet werden.",
        },
      ],
    },
    {
      id: "passiv",
      titel: "Passiv im Arbeitsalltag",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Vorgangspassiv: Was wird gemacht?",
          html: `<p>Im Passiv ist wichtig, <b>was passiert</b> – nicht, wer es macht. Man bildet es mit <b>werden + Partizip II</b>.</p>
<table>
<tr><th>Zeit</th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Präsens</td><td>wird + Partizip II</td><td>Die Maschine <b>wird</b> jeden Tag <b>geprüft</b>.</td></tr>
<tr><td>Präteritum</td><td>wurde + Partizip II</td><td>Die Ware <b>wurde</b> gestern <b>geliefert</b>.</td></tr>
<tr><td>Perfekt</td><td>ist + Partizip II + worden</td><td>Der Fehler <b>ist</b> schon <b>behoben worden</b>.</td></tr>
<tr><td>mit Modalverb</td><td>muss + Partizip II + werden</td><td>Der Helm <b>muss getragen werden</b>.</td></tr>
</table>
<p>Die handelnde Person nennt man, wenn nötig, mit <b>von + Dativ</b>: Der Plan wird <b>von der Schichtleiterin</b> erstellt.</p>`,
        },
        {
          typ: "luecke",
          satz: "Die Arbeitszeit ___ elektronisch erfasst.",
          optionen: ["wird", "werden", "wurdest"],
          erklaerung: "Präsens Passiv, Singular: die Arbeitszeit wird erfasst.",
        },
        {
          typ: "luecke",
          satz: "Die neuen Schichtpläne ___ jeden Freitag ausgehängt.",
          optionen: ["werden", "wird", "worden"],
          erklaerung: "Plural (die Schichtpläne) → werden.",
        },
        {
          typ: "luecke",
          satz: "Die Ersatzteile wurden gestern Nachmittag ___.",
          optionen: ["geliefert", "liefern", "geliefert worden"],
          erklaerung: "Präteritum Passiv: wurde(n) + Partizip II.",
        },
        {
          typ: "luecke",
          satz: "Der Fehler in der Anlage ist inzwischen behoben ___.",
          optionen: ["worden", "geworden", "werden"],
          erklaerung: "Im Perfekt Passiv steht worden, nicht geworden.",
        },
        {
          typ: "luecke",
          satz: "In der Werkstatt muss immer eine Schutzbrille getragen ___.",
          optionen: ["werden", "worden", "wird"],
          erklaerung: "Passiv mit Modalverb: muss + Partizip II + werden.",
        },
        {
          typ: "satzbau",
          woerter: ["Die Maschine", "wird", "jeden Morgen", "gereinigt."],
          alternativen: ["Jeden Morgen wird die Maschine gereinigt."],
          erklaerung: "Präsens Passiv: wird auf Position 2, Partizip am Ende.",
        },
        {
          typ: "satzbau",
          woerter: ["Die neuen Mitarbeiter", "wurden", "am ersten Tag", "von der Teamleiterin", "begrüßt."],
          alternativen: [
            "Am ersten Tag wurden die neuen Mitarbeiter von der Teamleiterin begrüßt.",
            "Die neuen Mitarbeiter wurden von der Teamleiterin am ersten Tag begrüßt.",
            "Von der Teamleiterin wurden die neuen Mitarbeiter am ersten Tag begrüßt.",
            "Am ersten Tag wurden von der Teamleiterin die neuen Mitarbeiter begrüßt.",
            "Von der Teamleiterin wurden am ersten Tag die neuen Mitarbeiter begrüßt.",
          ],
          erklaerung: "Präteritum Passiv: wurden … begrüßt; die Person mit von + Dativ.",
        },
        {
          typ: "satzbau",
          woerter: ["Der Notausgang", "darf", "nicht", "zugestellt", "werden."],
          erklaerung: "Passiv mit Modalverb: darf … zugestellt werden.",
        },
        {
          typ: "mc",
          frage: `Welcher Satz ist das Passiv von „Der Hausmeister hat die Heizung repariert“?`,
          optionen: [
            "Die Heizung ist vom Hausmeister repariert worden.",
            "Die Heizung ist vom Hausmeister repariert geworden.",
            "Die Heizung wird vom Hausmeister repariert worden.",
            "Die Heizung hat vom Hausmeister repariert worden.",
          ],
          erklaerung: "Perfekt Passiv: ist + Partizip II + worden.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Die Bestellung muss bis 14 Uhr bearbeitet werden.",
            "Die Bestellung muss bis 14 Uhr bearbeitet worden.",
            "Die Bestellung muss bis 14 Uhr werden bearbeitet.",
            "Die Bestellung wird bis 14 Uhr bearbeiten müssen.",
          ],
          erklaerung: "Modalverb + Partizip II + werden am Satzende.",
        },
      ],
    },
    {
      id: "nominal",
      titel: "Nominalisierung",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Aus Verben werden Nomen",
          html: `<p>In Anweisungen, Protokollen und Unterweisungen stehen oft <b>Nomen statt Verben</b>. Der Text wird kürzer und formeller.</p>
<table>
<tr><th>Mit Verb (Nebensatz)</th><th>Mit Nomen</th></tr>
<tr><td>nachdem die Anlage <b>geprüft</b> wurde</td><td><b>nach der Prüfung</b> der Anlage</td></tr>
<tr><td>bevor man die Maschine <b>startet</b></td><td><b>vor dem Start</b> der Maschine</td></tr>
<tr><td>während man <b>arbeitet</b></td><td><b>während der Arbeit</b></td></tr>
<tr><td>wenn ein Unfall <b>passiert</b></td><td><b>bei einem Unfall</b></td></tr>
</table>
<p>Typische Endungen: <b>-ung</b> (prüfen → die Prüfung, immer <b>die</b>), Verb als Nomen (<b>das</b> Reinigen), kurze Formen (beginnen → <b>der</b> Beginn).</p>
<p>Nach <b>nach, bei, vor</b> steht der Dativ, nach <b>während</b> der Genitiv.</p>`,
        },
        {
          typ: "paare",
          anweisung: "Welches Nomen gehört zum Verb?",
          paare: [
            ["prüfen", "die Prüfung"],
            ["beginnen", "der Beginn"],
            ["liefern", "die Lieferung"],
            ["besprechen", "die Besprechung"],
            ["ankommen", "die Ankunft"],
            ["verlassen", "das Verlassen"],
          ],
        },
        {
          typ: "luecke",
          satz: "Nachdem wir die Anlage geprüft haben, beginnt die Schicht. → Nach der ___ der Anlage beginnt die Schicht.",
          optionen: ["Prüfung", "Prüfen", "Prüfer"],
          erklaerung: "prüfen → die Prüfung; nach + Dativ: nach der Prüfung.",
        },
        {
          typ: "luecke",
          satz: "Bevor Sie die Maschine starten, lesen Sie die Anleitung. → ___ dem Start der Maschine lesen Sie die Anleitung.",
          optionen: ["Vor", "Nach", "Bei"],
          erklaerung: "bevor → vor + Dativ.",
        },
        {
          typ: "luecke",
          satz: "Wenn es brennt, benutzen Sie nicht den Aufzug. → Bei einem ___ benutzen Sie nicht den Aufzug.",
          optionen: ["Brand", "Brennen", "Feuern"],
          erklaerung: "brennen → der Brand; wenn → bei.",
        },
        {
          typ: "luecke",
          satz: "Während der ___ ist das Rauchen in der Halle verboten.",
          optionen: ["Arbeit", "Arbeiten", "Arbeitens"],
          erklaerung: "während + Genitiv: während der Arbeit.",
        },
        {
          typ: "mc",
          frage: `Welche Nominalisierung passt zu „Nachdem die Ware angekommen ist, wird sie kontrolliert“?`,
          optionen: [
            "Nach der Ankunft wird die Ware kontrolliert.",
            "Nach dem Ankommen der Ware ist sie kontrolliert.",
            "Bei der Ankunft hat man die Ware kontrolliert.",
            "Vor der Ankunft wird die Ware kontrolliert.",
          ],
          erklaerung: "nachdem → nach + Dativ; ankommen → die Ankunft.",
        },
        {
          typ: "luecke",
          satz: "Die ___ der Besucher erfolgt am Empfang.",
          optionen: ["Anmeldung", "Anmelden", "Anmeldet"],
          erklaerung: "anmelden → die Anmeldung (Nomen mit -ung).",
        },
        {
          typ: "mc",
          frage: `Welcher Satz bedeutet dasselbe wie „Wenn Sie die Halle verlassen, schalten Sie das Licht aus“?`,
          optionen: [
            "Beim Verlassen der Halle schalten Sie das Licht aus.",
            "Nach dem Verlassen der Halle schalten Sie das Licht an.",
            "Vor dem Betreten der Halle schalten Sie das Licht aus.",
            "Während der Halle schalten Sie das Licht aus.",
          ],
          erklaerung: "wenn → bei + Dativ: beim Verlassen.",
        },
      ],
    },
    {
      id: "unterweisung",
      titel: "Lesen: Eine Sicherheitsunterweisung",
      fertigkeit: "lesen",
      aufgaben: [
        {
          typ: "lesen",
          titel: "Sicherheitsunterweisung für neue Mitarbeitende – Lager",
          text: `<p><b>Nordlogistik Kiel GmbH – Lager Halle 2</b></p>
<p>Willkommen im Team! Vor Beginn Ihrer ersten Schicht werden Sie von Ihrer Schichtleitung unterwiesen. Die Teilnahme ist Pflicht und wird mit Ihrer Unterschrift bestätigt. Die Unterweisung wird einmal im Jahr wiederholt.</p>
<p><b>Persönliche Schutzausrüstung:</b> In der gesamten Halle müssen Sicherheitsschuhe und eine Warnweste getragen werden. Handschuhe werden beim Arbeiten mit Paletten und Folie empfohlen. Die Schutzausrüstung wird Ihnen am ersten Tag kostenlos ausgegeben.</p>
<p><b>Gabelstapler:</b> Gabelstapler dürfen nur von Beschäftigten mit gültigem Staplerschein gefahren werden. Fußgänger benutzen ausschließlich die gelb markierten Wege.</p>
<p><b>Verhalten im Notfall:</b> Bei einem Unfall wird zuerst Erste Hilfe geleistet, danach wird die Schichtleitung informiert. Jeder Unfall – auch eine kleine Verletzung – muss ins Verbandbuch eingetragen werden. Die Fluchtwege und Notausgänge dürfen zu keinem Zeitpunkt zugestellt werden.</p>
<p>Ansprechpartnerin für Arbeitssicherheit: Olena Kovalenko, Tel. 214</p>`,
          fragen: [
            {
              typ: "rf",
              aussage: "Die Unterweisung findet nach der ersten Schicht statt.",
              richtig: false,
              erklaerung: "Sie findet vor Beginn der ersten Schicht statt.",
            },
            {
              typ: "rf",
              aussage: "Handschuhe müssen in der ganzen Halle getragen werden.",
              richtig: false,
              erklaerung: "Pflicht sind Sicherheitsschuhe und Warnweste; Handschuhe werden nur empfohlen.",
            },
            {
              typ: "mc",
              frage: "Wer darf einen Gabelstapler fahren?",
              optionen: [
                "nur Beschäftigte mit Staplerschein",
                "alle Beschäftigten nach der Unterweisung",
                "nur die Schichtleitung",
                "alle, die gelbe Wege benutzen",
              ],
            },
            {
              typ: "mc",
              frage: "Was muss nach einem Unfall gemacht werden?",
              optionen: [
                "Erste Hilfe leisten, die Schichtleitung informieren und den Unfall ins Verbandbuch eintragen",
                "nur bei schweren Verletzungen die Schichtleitung informieren",
                "sofort die Halle verlassen und nach Hause gehen",
                "Frau Kovalenko eine E-Mail schreiben",
              ],
              erklaerung: "Auch kleine Verletzungen müssen ins Verbandbuch.",
            },
            {
              typ: "rf",
              aussage: "Die Schutzausrüstung müssen die neuen Mitarbeitenden nicht selbst bezahlen.",
              richtig: true,
              erklaerung: "Sie wird kostenlos ausgegeben.",
            },
          ],
        },
        {
          typ: "lesen",
          titel: "Protokoll der Teambesprechung",
          text: `<p><b>Protokoll – Teambesprechung Lager, 12.11.2026</b><br>Teilnehmende: Herr Yılmaz (Leitung), Frau Kovalenko, Herr Mensah, Frau Becker<br>Protokoll: Frau Becker</p>
<p><b>TOP 1 – Schichtplan Dezember:</b> Der Entwurf wurde vorgestellt. Wünsche zum Tausch werden bis 20.11. an Herrn Yılmaz geschickt.</p>
<p><b>TOP 2 – Neue Kollegin:</b> Ab 1.12. wird Frau Amira Saleh eingearbeitet. Patin: Frau Kovalenko.</p>
<p><b>TOP 3 – Defektes Rolltor:</b> Die Reparatur wurde bestellt. Bis dahin wird Tor 4 benutzt.</p>
<p>Nächste Besprechung: 10.12.2026</p>`,
          fragen: [
            {
              typ: "mc",
              frage: "Bis wann sollen Wünsche zum Schichttausch geschickt werden?",
              optionen: ["bis zum 20. November", "bis zum 1. Dezember", "bis zum 10. Dezember", "bis zum 12. November"],
            },
            {
              typ: "rf",
              aussage: "Frau Kovalenko begleitet die neue Kollegin bei der Einarbeitung.",
              richtig: true,
              erklaerung: "Sie ist die Patin von Frau Saleh.",
            },
            {
              typ: "mc",
              frage: "Was gilt, bis das Rolltor repariert ist?",
              optionen: ["Man benutzt Tor 4.", "Die Halle bleibt geschlossen.", "Frau Becker repariert das Tor.", "Es wird ein neues Tor gekauft."],
            },
          ],
        },
      ],
    },
    {
      id: "test",
      titel: "Abschlusstest",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "luecke",
          satz: "Die Paletten ___ jeden Morgen um 6 Uhr geliefert.",
          optionen: ["werden", "wird", "worden"],
          erklaerung: "Präsens Passiv, Plural: werden … geliefert.",
        },
        {
          typ: "luecke",
          satz: "Der Schichtplan ___ letzte Woche geändert.",
          optionen: ["wurde", "wird", "worden"],
          erklaerung: "letzte Woche → Präteritum Passiv: wurde geändert.",
        },
        {
          typ: "luecke",
          satz: "Die Unterweisung ist von allen Mitarbeitenden unterschrieben ___.",
          optionen: ["worden", "geworden", "wurde"],
          erklaerung: "Perfekt Passiv: ist + Partizip II + worden.",
        },
        {
          typ: "luecke",
          satz: "Die Warnweste muss in der Halle immer ___ werden.",
          optionen: ["getragen", "tragen", "trägt"],
          erklaerung: "Modalverb + Partizip II + werden: muss getragen werden.",
        },
        {
          typ: "luecke",
          satz: "Die Ware wird ___ der Lagerleiterin kontrolliert.",
          optionen: ["von", "für", "aus"],
          erklaerung: "Die handelnde Person im Passiv: von + Dativ.",
        },
        {
          typ: "satzbau",
          woerter: ["Die Besprechung", "musste", "leider", "verschoben", "werden."],
          alternativen: ["Leider musste die Besprechung verschoben werden."],
          erklaerung: "Modalverb im Präteritum + Partizip II + werden.",
        },
        {
          typ: "mc",
          frage: `Welcher Satz ist das Passiv von „Man repariert die Anlage morgen“?`,
          optionen: [
            "Die Anlage wird morgen repariert.",
            "Die Anlage wurde morgen repariert.",
            "Die Anlage ist morgen repariert worden.",
            "Die Anlage repariert sich morgen.",
          ],
          erklaerung: "Präsens Passiv mit Zeitangabe für die Zukunft: wird repariert.",
        },
        {
          typ: "luecke",
          satz: "Nach der ___ des Fahrzeugs wird der Bericht geschrieben.",
          optionen: ["Kontrolle", "Kontrollieren", "Kontrolliert"],
          erklaerung: "kontrollieren → die Kontrolle; nach + Dativ: nach der Kontrolle.",
        },
        {
          typ: "luecke",
          satz: "___ einem Feueralarm verlassen alle sofort das Gebäude.",
          optionen: ["Bei", "Während", "Nach"],
          erklaerung: "wenn es einen Alarm gibt → bei einem Feueralarm.",
        },
        {
          typ: "mc",
          frage: `Welche Nominalisierung passt zu „bevor die Schicht beginnt“?`,
          optionen: ["vor Beginn der Schicht", "nach Beginn der Schicht", "bei der Beginnung der Schicht", "vor dem Beginnen von Schicht"],
          erklaerung: "beginnen → der Beginn; bevor → vor.",
        },
        {
          typ: "luecke",
          satz: "Die Ergebnisse der Besprechung werden im ___ festgehalten.",
          optionen: ["Protokoll", "Schichtplan", "Verbandbuch"],
          erklaerung: "Ergebnisse einer Besprechung stehen im Protokoll.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Der Notausgang darf nicht zugestellt werden.",
            "Der Notausgang darf nicht zugestellt worden.",
            "Der Notausgang darf nicht werden zugestellt.",
            "Der Notausgang wird nicht zugestellt dürfen.",
          ],
          erklaerung: "Modalverb + Partizip II + werden am Ende.",
        },
      ],
    },
  ],
};
