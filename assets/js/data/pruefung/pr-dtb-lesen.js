/* DTB B2 Lesen + Lesen und Schreiben – eigener Übungssatz im Prüfungsformat */
const AH = ["a", "b", "c", "d", "e", "f", "g", "h"];
const AFX = ["a", "b", "c", "d", "e", "f", "x"];

export default {
  id: "pr-dtb-lesen",
  titel: "DTB B2 Lesen",
  pruefung: "DTB",
  fertigkeit: "lesen",
  niveau: "B2",
  minuten: 45,
  teile: [
    /* ---------------- Teil 1 ---------------- */
    {
      titel: "Teil 1",
      ziel: "Artikel aus der Arbeitswelt Personen zuordnen",
      anweisung: "Lesen Sie die Situationen 1 bis 5 und die Artikelanrisse a bis h aus einem Online-Magazin. Welcher Artikel passt zu welcher Person? Jeden Artikel können Sie nur einmal wählen.",
      material: `<table>
<tr><th>a</th><td><b>Teilzeit in der Führungsetage?</b> Immer mehr Betriebe teilen Leitungsstellen auf zwei Personen auf. Wir zeigen, wie Jobsharing in der Praxis funktioniert und worauf Tandems bei der Abstimmung achten sollten.</td></tr>
<tr><th>b</th><td><b>Abschluss aus dem Ausland – und jetzt?</b> Wer einen Berufsabschluss im Ausland erworben hat, kann ihn in Deutschland prüfen lassen. Welche Stellen zuständig sind, welche Unterlagen gebraucht werden und wer die Kosten übernehmen kann.</td></tr>
<tr><th>c</th><td><b>Gesund im Schichtdienst</b> Wechselnde Arbeitszeiten bringen den Körper aus dem Takt. Eine Arbeitsmedizinerin erklärt, wie man trotz Nachtschichten gut schläft und sich ausgewogen ernährt.</td></tr>
<tr><th>d</th><td><b>Vom Hobby zum eigenen Betrieb</b> Drei Gründerinnen erzählen, wie sie ihre Leidenschaft zum Beruf gemacht haben – und welche Fördermittel ihnen beim Start geholfen haben.</td></tr>
<tr><th>e</th><td><b>Weiterbildung neben dem Job</b> Ein Abschluss als Technikerin oder Meister ist auch berufsbegleitend möglich. Wir vergleichen Abend- und Wochenendmodelle und erklären, wie das Aufstiegs-BAföG funktioniert.</td></tr>
<tr><th>f</th><td><b>Konflikte im Team lösen</b> Wenn die Stimmung kippt, leidet die ganze Abteilung. Eine Mediatorin gibt Tipps, wie Beschäftigte Spannungen früh ansprechen, ohne Kolleginnen und Kollegen bloßzustellen.</td></tr>
<tr><th>g</th><td><b>Das erste Gehaltsgespräch</b> Viele Berufseinsteiger trauen sich nicht, mehr Geld zu verlangen. Mit welchen Argumenten und mit welcher Vorbereitung man im Gespräch mit der Chefin überzeugt.</td></tr>
<tr><th>h</th><td><b>Pendeln mit dem Rad</b> Dienstrad-Leasing macht das E-Bike für Beschäftigte günstiger. Was Arbeitgeber anbieten dürfen und was das für die Steuer bedeutet.</td></tr>
</table>`,
      aufgaben: [
        { typ: "mc", nr: 1, fest: true, frage: "Nikolai hat in seinem Herkunftsland eine Ausbildung zum Elektriker gemacht. Er möchte wissen, ob sie in Deutschland gilt.", optionen: AH, loesung: "b", erklaerung: "Artikel b: Anerkennung von ausländischen Berufsabschlüssen." },
        { typ: "mc", nr: 2, fest: true, frage: "Frau Sánchez leitet eine Abteilung und möchte nach der Elternzeit weniger Stunden arbeiten, ohne ihre Leitungsfunktion aufzugeben.", optionen: AH, loesung: "a", erklaerung: "Artikel a: Jobsharing in Leitungspositionen." },
        { typ: "mc", nr: 3, fest: true, frage: "Kemal ist Pflegefachmann und fühlt sich seit dem Wechsel zu Nachtdiensten ständig erschöpft.", optionen: AH, loesung: "c", erklaerung: "Artikel c: Schlaf und Ernährung im Schichtdienst." },
        { typ: "mc", nr: 4, fest: true, frage: "Lea arbeitet seit einem Jahr als Mechatronikerin und möchte sich zur Technikerin weiterqualifizieren, ihre Stelle aber behalten.", optionen: AH, loesung: "e", erklaerung: "Artikel e: berufsbegleitende Weiterbildung zur Technikerin." },
        { typ: "mc", nr: 5, fest: true, frage: "Herr Owusu hat die Probezeit bestanden und findet, dass er für seine Aufgaben zu wenig verdient. Nächste Woche trifft er seine Vorgesetzte.", optionen: AH, loesung: "g", erklaerung: "Artikel g: Vorbereitung auf das Gehaltsgespräch." },
      ],
    },

    /* ---------------- Teil 2 ---------------- */
    {
      titel: "Teil 2",
      ziel: "Texte aus einer Willkommensmappe und einer Unterweisung verstehen",
      anweisung: "Lesen Sie die zwei Texte und die Aufgaben 6 bis 9. Entscheiden Sie: Ist die Aussage richtig oder falsch? Und welche Antwort (a, b oder c) passt?",
      aufgaben: [
        {
          typ: "lesen",
          titel: "Text 1: Aus der Willkommensmappe der Firma Nordlicht Logistik",
          text: `<p><b>Arbeitszeiterfassung und Gleitzeit</b></p>
<p>In der Verwaltung gilt Gleitzeit. Die Kernarbeitszeit, in der alle Beschäftigten anwesend sein müssen, liegt montags bis donnerstags zwischen 9:30 und 14:30 Uhr, freitags zwischen 9:30 und 12:00 Uhr. Beginn und Ende Ihres Arbeitstages erfassen Sie mit Ihrem Mitarbeiterausweis am Terminal im Eingangsbereich. Wer im Homeoffice arbeitet, trägt seine Zeiten bitte täglich im Mitarbeiterportal ein.</p>
<p>Auf Ihrem Zeitkonto dürfen sich höchstens 40 Plusstunden ansammeln. Überstunden, die darüber hinausgehen, verfallen, sofern sie nicht vorab von der Teamleitung genehmigt wurden. Minusstunden sollten innerhalb von drei Monaten ausgeglichen werden. Ganze Gleittage können nach Absprache im Team genommen werden; sie müssen spätestens eine Woche vorher im Portal beantragt werden.</p>`,
          fragen: [
            { typ: "rf", nr: 6, aussage: "Wer im Homeoffice arbeitet, muss sich am Terminal im Eingangsbereich an- und abmelden.", richtig: false, erklaerung: "Homeoffice-Zeiten werden täglich im Mitarbeiterportal eingetragen." },
            { typ: "mc", nr: 7, frage: "Was passiert mit Überstunden über 40 Stunden?", optionen: ["Sie verfallen, wenn die Teamleitung sie nicht vorher genehmigt hat.", "Sie werden automatisch ausbezahlt.", "Sie müssen innerhalb von drei Monaten abgebaut werden."], erklaerung: "Darüber hinausgehende Überstunden verfallen ohne vorherige Genehmigung." },
          ],
        },
        {
          typ: "lesen",
          titel: "Text 2: Unterweisung – Umgang mit Gefahrstoffen in der Werkstatt",
          text: `<p><b>Reinigungs- und Lösungsmittel sicher verwenden</b></p>
<p>Alle Gefahrstoffe werden ausschließlich im gekennzeichneten Gefahrstoffschrank gelagert. Füllen Sie Flüssigkeiten niemals in Getränkeflaschen oder unbeschriftete Behälter um – Verwechslungen haben in der Vergangenheit bereits zu Unfällen geführt. Vor dem ersten Einsatz eines Produkts ist das Sicherheitsdatenblatt zu lesen; es liegt in der Werkstatt in einem roten Ordner aus.</p>
<p>Beim Arbeiten mit Lösungsmitteln sind Schutzhandschuhe und Schutzbrille zu tragen. Sorgen Sie für ausreichende Lüftung. Gelangt ein Stoff ins Auge, spülen Sie das Auge sofort mindestens zehn Minuten an der Augendusche neben dem Waschbecken und informieren Sie anschließend den Ersthelfer Ihrer Schicht. Leere Gebinde gehören nicht in den Hausmüll, sondern in den gelben Sammelbehälter auf dem Hof.</p>`,
          fragen: [
            { typ: "rf", nr: 8, aussage: "Das Sicherheitsdatenblatt muss gelesen werden, bevor ein Produkt zum ersten Mal benutzt wird.", richtig: true, erklaerung: "„Vor dem ersten Einsatz eines Produkts ist das Sicherheitsdatenblatt zu lesen.“" },
            { typ: "mc", nr: 9, frage: "Was ist zu tun, wenn ein Lösungsmittel ins Auge gekommen ist?", optionen: ["Zuerst das Auge ausspülen, danach den Ersthelfer informieren.", "Sofort den Ersthelfer rufen und auf ihn warten.", "Das Auge kurz mit Wasser aus einer Flasche reinigen."], erklaerung: "Erst mindestens zehn Minuten spülen, anschließend den Ersthelfer informieren." },
          ],
        },
      ],
    },

    /* ---------------- Teil 3 ---------------- */
    {
      titel: "Teil 3",
      ziel: "Fragen und Tipps in einem Forum zuordnen",
      anweisung: "Lesen Sie die Fragen 10 bis 13 aus einem Forum für Berufstätige und die Tipps a bis f. Welcher Tipp passt zu welcher Frage? Jeden Tipp können Sie nur einmal wählen. Für eine Frage gibt es keinen passenden Tipp. Dann wählen Sie x.",
      material: `<table>
<tr><th>a</th><td>Bei uns hat es geholfen, für jedes Projekt eine feste Ansprechperson zu benennen. Dann weiß jeder, wen er fragen muss, und E-Mails gehen nicht mehr an zehn Leute gleichzeitig. Schlag das doch mal in der nächsten Teambesprechung vor.</td></tr>
<tr><th>b</th><td>Ein Arbeitszeugnis muss wohlwollend formuliert sein, darf aber nichts Falsches enthalten. Wenn du mit einzelnen Formulierungen nicht einverstanden bist, kannst du schriftlich um eine Korrektur bitten – am besten mit konkreten Vorschlägen.</td></tr>
<tr><th>c</th><td>Ich habe mir angewöhnt, mein Diensthandy nach Feierabend in eine Schublade zu legen. Dringende Fälle laufen bei uns über die Bereitschaft. Am Anfang war das ungewohnt, aber inzwischen schlafe ich viel besser.</td></tr>
<tr><th>d</th><td>Frag am besten direkt bei der Personalabteilung nach, ob es ein Budget für Sprachkurse gibt. Viele Firmen übernehmen die Kosten zumindest teilweise, wenn der Kurs für die Stelle wichtig ist.</td></tr>
<tr><th>e</th><td>Bewahre alle Belege für Fahrten zur Arbeit, Fachbücher und Arbeitskleidung auf. Das kannst du in der Steuererklärung als Werbungskosten angeben. Eine Lohnsteuerhilfe kann dir dabei helfen.</td></tr>
<tr><th>f</th><td>Bei der Kurzpräsentation hilft es, nicht mehr als drei Kernaussagen zu formulieren und vorher mit einer Kollegin zu üben. Lass die Folien weg, die du nicht in einer Minute erklären kannst.</td></tr>
</table>`,
      aufgaben: [
        { typ: "mc", nr: 10, fest: true, frage: "„Ich bekomme ständig E-Mails, die gar nicht für mich bestimmt sind. Keiner weiß bei uns so richtig, wer wofür zuständig ist. Wie kann man das ändern?“ (Ilias)", optionen: AFX, loesung: "a", erklaerung: "Tipp a: feste Ansprechpersonen pro Projekt." },
        { typ: "mc", nr: 11, fest: true, frage: "„Ich habe mein Arbeitszeugnis bekommen und finde einige Sätze sehr negativ. Kann ich da etwas machen?“ (Branka)", optionen: AFX, loesung: "b", erklaerung: "Tipp b: schriftlich um Korrektur des Zeugnisses bitten." },
        { typ: "mc", nr: 12, fest: true, frage: "„Mein Chef möchte, dass ich einen Fachkurs auf Englisch mache. Muss ich den selbst bezahlen?“ (Thuy)", optionen: AFX, loesung: "d", erklaerung: "Tipp d: Bei der Personalabteilung nach einem Budget für Kurse fragen." },
        { typ: "mc", nr: 13, fest: true, frage: "„Ich wechsle nächsten Monat die Stelle. Wie viele Urlaubstage stehen mir bei meinem alten Arbeitgeber noch zu?“ (Jannik)", optionen: AFX, loesung: "x", erklaerung: "Kein Tipp beantwortet die Frage nach dem Resturlaub beim Stellenwechsel." },
      ],
    },

    /* ---------------- Teil 4 ---------------- */
    {
      titel: "Teil 4",
      ziel: "Ein Protokoll verstehen",
      anweisung: "Lesen Sie das Protokoll und die Aufgaben 14 bis 18. Welche Antwort (a, b oder c) passt?",
      aufgaben: [
        {
          typ: "lesen",
          titel: "Protokoll der Teambesprechung – Kundenservice, Fahrradverleih „Fördewind“",
          text: `<p><b>Datum:</b> 12. März · <b>Beginn:</b> 9:00 Uhr · <b>Ende:</b> 10:15 Uhr<br>
<b>Anwesend:</b> Frau Jensen (Leitung), Herr Abdi, Frau Kaya, Herr Marquardt, Frau Nguyen · <b>Entschuldigt:</b> Herr Rossi · <b>Protokoll:</b> Frau Kaya</p>
<p><b>TOP 1 – Saisonstart</b><br>Die Saison beginnt am 1. April. Frau Jensen berichtet, dass zwölf neue E-Bikes geliefert wurden; sie werden bis zum 25. März von Herrn Marquardt geprüft. Die Werkstatt ist ab April auch samstags besetzt.</p>
<p><b>TOP 2 – Online-Buchungen</b><br>Im letzten Jahr kam es häufiger zu Doppelbuchungen, weil Reservierungen am Telefon nicht sofort ins System eingetragen wurden. Ab sofort gilt: Telefonische Buchungen werden während des Gesprächs erfasst, nicht im Nachhinein. Frau Nguyen schult bis Ende März die Aushilfen.</p>
<p><b>TOP 3 – Kundenbewertungen</b><br>Die Bewertungen sind überwiegend positiv. Kritisiert wurden vor allem lange Wartezeiten bei der Rückgabe am Nachmittag. Herr Abdi schlägt vor, zwischen 16 und 18 Uhr eine zweite Rückgabestation zu öffnen. Der Vorschlag wird angenommen; die Umsetzung erfolgt zunächst probeweise bis Ende Mai.</p>
<p><b>TOP 4 – Verschiedenes</b><br>Der Betriebsausflug wird auf September verschoben, da im Juni zu viele Buchungen erwartet werden. Herr Rossi wird über die Ergebnisse informiert.</p>
<p><b>Nächste Besprechung:</b> 9. April, 9:00 Uhr</p>`,
          fragen: [
            { typ: "mc", nr: 14, frage: "Was passiert mit den neuen E-Bikes?", optionen: ["Sie werden vor Saisonbeginn kontrolliert.", "Sie werden erst im April geliefert.", "Sie stehen nur samstags zur Verfügung."], erklaerung: "Herr Marquardt prüft sie bis zum 25. März." },
            { typ: "mc", nr: 15, frage: "Warum gab es im letzten Jahr Doppelbuchungen?", optionen: ["Telefonische Reservierungen wurden zu spät eingetragen.", "Das Online-System war oft gestört.", "Die Aushilfen kannten die Preise nicht."], erklaerung: "Reservierungen am Telefon wurden nicht sofort ins System eingetragen." },
            { typ: "mc", nr: 16, frage: "Was wurde zu den Kundenbewertungen beschlossen?", optionen: ["Eine zusätzliche Rückgabestation wird zunächst getestet.", "Die Öffnungszeiten am Nachmittag werden verlängert.", "Unzufriedene Kunden erhalten einen Gutschein."], erklaerung: "Die zweite Rückgabestation wird probeweise bis Ende Mai geöffnet." },
            { typ: "mc", nr: 17, frage: "Warum findet der Betriebsausflug nicht im Juni statt?", optionen: ["Weil dann viel zu tun sein wird.", "Weil Herr Rossi im Juni nicht da ist.", "Weil die Werkstatt im Juni umgebaut wird."], erklaerung: "Im Juni werden zu viele Buchungen erwartet." },
            { typ: "mc", nr: 18, frage: "Wer hat an der Besprechung nicht teilgenommen?", optionen: ["Herr Rossi.", "Frau Kaya.", "Herr Marquardt."], erklaerung: "Herr Rossi ist als entschuldigt eingetragen." },
          ],
        },
      ],
    },
  ],

  /* ---------------- Lesen und Schreiben ---------------- */
  lesenSchreiben: {
    titel: "Lesen und Schreiben",
    minuten: 20,
    anweisung: "Sie arbeiten im Kundenservice des Fahrradverleihs „Fördewind“. Ihre Teamleiterin hat Ihnen eine Kundenbeschwerde weitergeleitet. Lesen Sie beide Texte und lösen Sie die Aufgaben 19 und 20. Schreiben Sie dann eine Antwort an die Kundin.",
    material: `<div class="mail"><p><b>Von:</b> Birte Jensen<br><b>An:</b> Kundenservice<br><b>Betreff:</b> WG: Beschwerde Buchung 4471</p>
<p>Hallo,</p>
<p>bitte kümmere dich heute noch um die Beschwerde von Frau Hoffmann. Sie hat recht: Das reservierte Kinderrad war nicht da, weil es am Vortag in die Werkstatt musste und niemand sie informiert hat. Wir können ihr 50 Prozent des Mietpreises erstatten und für ihren nächsten Besuch einen Gutschein über einen Tag Leihe für die ganze Familie anbieten. Bitte entschuldige dich in unserem Namen und erkläre kurz, was wir ändern, damit so etwas nicht wieder passiert.</p>
<p>Danke und viele Grüße<br>Birte</p></div>
<hr>
<div class="mail"><p><b>Von:</b> Katrin Hoffmann<br><b>An:</b> info@foerdewind-verleih.example<br><b>Betreff:</b> Beschwerde Buchung 4471</p>
<p>Sehr geehrte Damen und Herren,</p>
<p>am vergangenen Samstag wollten wir als Familie eine Radtour an der Förde machen. Ich hatte zwei Wochen vorher online drei Räder reserviert: zwei Trekkingräder und ein Kinderrad für meinen achtjährigen Sohn. Als wir um zehn Uhr ankamen, war das Kinderrad nicht verfügbar. Man bot uns lediglich einen Kindersitz an – für ein Kind in diesem Alter keine Lösung.</p>
<p>Wir haben schließlich nur eine kurze Runde gedreht, abwechselnd zu Fuß und mit dem Rad. Den vollen Tagespreis von 64 Euro mussten wir trotzdem bezahlen. Besonders ärgerlich finde ich, dass uns niemand vorher Bescheid gegeben hat, obwohl meine Telefonnummer in der Buchung steht.</p>
<p>Ich erwarte, dass Sie mir zumindest einen Teil des Betrags zurückerstatten.</p>
<p>Mit freundlichen Grüßen<br>Katrin Hoffmann</p></div>`,
    aufgaben: [
      { typ: "mc", nr: 19, frage: "Worüber ärgert sich Frau Hoffmann besonders?", optionen: ["Dass man sie nicht vorher informiert hat.", "Dass der Kindersitz kaputt war.", "Dass die Online-Reservierung nicht funktioniert hat."], erklaerung: "„Besonders ärgerlich finde ich, dass uns niemand vorher Bescheid gegeben hat.“" },
      { typ: "mc", nr: 20, frage: "Was darf der Kundenservice Frau Hoffmann anbieten?", optionen: ["Die Hälfte des Preises zurück und einen Gutschein.", "Den vollen Preis zurück.", "Einen Gutschein über 64 Euro."], erklaerung: "Die Teamleiterin nennt 50 Prozent Erstattung und einen Gutschein für einen Tag Familienleihe." },
    ],
    schreibauftrag: "Antworten Sie Frau Hoffmann im Namen des Fahrradverleihs. Entschuldigen Sie sich, erklären Sie, was passiert ist, machen Sie das Angebot der Teamleiterin und beschreiben Sie, was Sie in Zukunft ändern. Schreiben Sie ca. 100 bis 150 Wörter.",
    checkliste: [
      "Passender Betreff und formelle Anrede",
      "Dank für die Rückmeldung und Entschuldigung",
      "Erklärung der Ursache (Rad in der Werkstatt, keine Information)",
      "Angebot: 50 Prozent Erstattung",
      "Angebot: Gutschein für einen Tag Familienleihe",
      "Konkrete Maßnahme für die Zukunft",
      "Höflicher Schluss und Gruß im Namen der Firma",
      "Register B2: Konjunktiv II, Nominalisierungen, keine Umgangssprache",
    ],
    musterloesung: `Betreff: Ihre Beschwerde zur Buchung 4471

Sehr geehrte Frau Hoffmann,

vielen Dank für Ihre Nachricht. Es tut uns sehr leid, dass Ihr Familienausflug am vergangenen Samstag nicht wie geplant stattfinden konnte.

Das reservierte Kinderrad musste kurzfristig am Vortag in unsere Werkstatt. Leider wurden Sie darüber nicht informiert, obwohl uns Ihre Telefonnummer vorlag. Dafür möchten wir uns ausdrücklich entschuldigen.

Als Entschädigung erstatten wir Ihnen 50 Prozent des Mietpreises, also 32 Euro, auf Ihr Konto. Außerdem würden wir uns freuen, Ihnen bei Ihrem nächsten Besuch einen Gutschein über einen Tag Leihe für die ganze Familie überreichen zu dürfen.

Damit sich ein solcher Fall nicht wiederholt, werden Reservierungen künftig am Vortag überprüft. Fällt ein Rad aus, rufen wir die Kundinnen und Kunden sofort an und bieten eine Alternative an.

Wir hoffen, Sie bald wieder bei uns begrüßen zu dürfen.

Mit freundlichen Grüßen
Ihr Kundenservice-Team
Fahrradverleih Fördewind`,
    minWoerter: 100,
  },
};
