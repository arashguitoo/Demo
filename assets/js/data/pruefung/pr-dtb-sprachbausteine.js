/* DTB B2 Sprachbausteine + Schreiben (Forumsbeitrag) – eigener Übungssatz im Prüfungsformat */
const KASTEN = ["a AUFGRUND", "b BEI", "c BEREITS", "d DAMIT", "e DESHALB", "f FALLS", "g INDEM", "h OBWOHL", "i SOWIE", "j WÄHREND"];

export default {
  id: "pr-dtb-sprachbausteine",
  titel: "DTB B2 Sprachbausteine",
  pruefung: "DTB",
  fertigkeit: "grammatik",
  niveau: "B2",
  minuten: 15,
  teile: [
    /* ---------------- Teil 1 ---------------- */
    {
      titel: "Sprachbausteine Teil 1",
      ziel: "Passende Wörter in einer E-Mail ergänzen",
      anweisung: "Lesen Sie die E-Mail. Welches Wort aus dem Kasten (a bis j) passt in die Lücken 46 bis 51? Jedes Wort passt nur einmal. Nicht alle Wörter passen.",
      material: `<table class="wortkasten"><tr>
<td>a AUFGRUND</td><td>b BEI</td><td>c BEREITS</td><td>d DAMIT</td><td>e DESHALB</td></tr><tr>
<td>f FALLS</td><td>g INDEM</td><td>h OBWOHL</td><td>i SOWIE</td><td>j WÄHREND</td></tr></table>
<div class="mail"><p><b>Betreff:</b> Ihre Anfrage zum Seminar „Konfliktmanagement im Team“</p>
<p>Sehr geehrte Frau Krüger,</p>
<p>vielen Dank für Ihre Anfrage vom 3. Mai. <b>(46)</b> ____ des großen Interesses sind unsere Seminare im Juni leider <b>(47)</b> ____ ausgebucht. Wir können Ihnen jedoch zwei Termine im Juli anbieten: den 8. und 9. Juli oder den 22. und 23. Juli.</p>
<p><b>(48)</b> ____ Sie sich für einen dieser Termine entscheiden, bitten wir Sie um eine kurze Rückmeldung bis zum 31. Mai, <b>(49)</b> ____ wir die Plätze für Ihre Mitarbeitenden verbindlich reservieren können. Die Seminargebühr umfasst die Schulungsunterlagen <b>(50)</b> ____ die Verpflegung an beiden Tagen.</p>
<p><b>(51)</b> ____ Rückfragen stehe ich Ihnen gern telefonisch zur Verfügung.</p>
<p>Mit freundlichen Grüßen<br>Jasper Holm<br>Seminarorganisation, Bildungswerk Ostsee</p></div>`,
      aufgaben: [
        { typ: "luecke", nr: 46, fest: true, satz: "___ des großen Interesses sind unsere Seminare im Juni leider … ausgebucht.", optionen: KASTEN, loesung: "a AUFGRUND", erklaerung: "Grund mit Genitiv: aufgrund des großen Interesses." },
        { typ: "luecke", nr: 47, fest: true, satz: "… sind unsere Seminare im Juni leider ___ ausgebucht.", optionen: KASTEN, loesung: "c BEREITS", erklaerung: "bereits = schon: Die Seminare sind schon ausgebucht." },
        { typ: "luecke", nr: 48, fest: true, satz: "___ Sie sich für einen dieser Termine entscheiden, bitten wir Sie um eine kurze Rückmeldung …", optionen: KASTEN, loesung: "f FALLS", erklaerung: "Bedingung: falls = wenn." },
        { typ: "luecke", nr: 49, fest: true, satz: "…, ___ wir die Plätze für Ihre Mitarbeitenden verbindlich reservieren können.", optionen: KASTEN, loesung: "d DAMIT", erklaerung: "Zweck mit Modalverb im Nebensatz: damit." },
        { typ: "luecke", nr: 50, fest: true, satz: "Die Seminargebühr umfasst die Schulungsunterlagen ___ die Verpflegung an beiden Tagen.", optionen: KASTEN, loesung: "i SOWIE", erklaerung: "sowie = und (auch), verbindet zwei Nomen." },
        { typ: "luecke", nr: 51, fest: true, satz: "___ Rückfragen stehe ich Ihnen gern telefonisch zur Verfügung.", optionen: KASTEN, loesung: "b BEI", erklaerung: "Feste Formulierung: Bei Rückfragen stehe ich Ihnen zur Verfügung." },
      ],
    },

    /* ---------------- Teil 2 ---------------- */
    {
      titel: "Sprachbausteine Teil 2",
      ziel: "Feste Wendungen in einem Rundschreiben ergänzen",
      anweisung: "Lesen Sie das Rundschreiben. Welche Lösung (a, b oder c) passt in die Lücken 52 bis 57?",
      material: `<div class="mail"><p><b>An:</b> alle Beschäftigten<br><b>Betreff:</b> Neue Regelung zum mobilen Arbeiten</p>
<p>Liebe Kolleginnen und Kollegen,</p>
<p>zum 1. Juli <b>(52)</b> ____ die neue Betriebsvereinbarung zum mobilen Arbeiten in Kraft. Künftig können alle Beschäftigten in der Verwaltung bis zu zwei Tage pro Woche von zu Hause aus arbeiten. Wer dieses Angebot in Anspruch <b>(53)</b> ____ möchte, spricht dies bitte zunächst mit der eigenen Teamleitung ab.</p>
<p>Für die Arbeit zu Hause <b>(54)</b> ____ Ihnen die Firma einen Laptop und ein Headset zur Verfügung. Bitte <b>(55)</b> ____ Sie bei der Planung Rücksicht auf die Teamtermine: Am Dienstag sollen möglichst alle im Büro sein.</p>
<p>Ob mobiles Arbeiten für Ihre Tätigkeit grundsätzlich in <b>(56)</b> ____ kommt, klärt die Teamleitung im Einzelfall. Bitte <b>(57)</b> ____ Sie der Personalabteilung bis zum 15. Juni Bescheid, an welchen Tagen Sie zu Hause arbeiten möchten.</p>
<p>Viele Grüße<br>Ihre Personalabteilung</p></div>`,
      aufgaben: [
        { typ: "luecke", nr: 52, fest: true, satz: "Zum 1. Juli ___ die neue Betriebsvereinbarung zum mobilen Arbeiten in Kraft.", optionen: ["a tritt", "b geht", "c kommt"], loesung: "a tritt", erklaerung: "Feste Wendung: in Kraft treten." },
        { typ: "luecke", nr: 53, fest: true, satz: "Wer dieses Angebot in Anspruch ___ möchte, …", optionen: ["a geben", "b nehmen", "c stellen"], loesung: "b nehmen", erklaerung: "Feste Wendung: etwas in Anspruch nehmen." },
        { typ: "luecke", nr: 54, fest: true, satz: "Für die Arbeit zu Hause ___ Ihnen die Firma einen Laptop und ein Headset zur Verfügung.", optionen: ["a gibt", "b legt", "c stellt"], loesung: "c stellt", erklaerung: "Feste Wendung: jemandem etwas zur Verfügung stellen." },
        { typ: "luecke", nr: 55, fest: true, satz: "Bitte ___ Sie bei der Planung Rücksicht auf die Teamtermine.", optionen: ["a nehmen", "b haben", "c machen"], loesung: "a nehmen", erklaerung: "Feste Wendung: Rücksicht nehmen auf." },
        { typ: "luecke", nr: 56, fest: true, satz: "Ob mobiles Arbeiten für Ihre Tätigkeit grundsätzlich in ___ kommt, …", optionen: ["a Betracht", "b Ordnung", "c Gebrauch"], loesung: "a Betracht", erklaerung: "Feste Wendung: in Betracht kommen = möglich sein." },
        { typ: "luecke", nr: 57, fest: true, satz: "Bitte ___ Sie der Personalabteilung bis zum 15. Juni Bescheid, …", optionen: ["a teilen", "b geben", "c melden"], loesung: "b geben", erklaerung: "Feste Wendung: jemandem Bescheid geben." },
      ],
    },
  ],

  /* ---------------- Schreiben: Forumsbeitrag ---------------- */
  schreiben: {
    titel: "Schreiben: Forumsbeitrag",
    minuten: 30,
    anweisung: "Wählen Sie Thema A oder Thema B. Schreiben Sie einen Beitrag für das Online-Forum Ihrer Firma. Äußern Sie Ihre Meinung, begründen Sie sie und gehen Sie auf mögliche Gegenargumente ein. Schreiben Sie mindestens 120 Wörter.",
    aufgaben: [
      {
        titel: "Thema A",
        situation: "Im Mitarbeiterforum wird diskutiert: „Sollte unsere Firma feste Bürozeiten für alle wieder einführen – oder mehr Homeoffice erlauben?“",
        leitpunkte: ["Ihre Meinung zum Thema", "Vorteile und Nachteile", "Eigene Erfahrungen oder Beispiele", "Ein Vorschlag für eine Lösung"],
        textart: "Forumsbeitrag",
        adressat: "Kolleginnen und Kollegen im Forum",
        formell: false,
      },
      {
        titel: "Thema B",
        situation: "Im Mitarbeiterforum wird gefragt: „Sollten Weiterbildungen während der Arbeitszeit stattfinden und vom Betrieb bezahlt werden?“",
        leitpunkte: ["Ihre Meinung zum Thema", "Gründe für Ihre Meinung", "Mögliche Gegenargumente", "Ein Vorschlag, wie man es regeln könnte"],
        textart: "Forumsbeitrag",
        adressat: "Kolleginnen und Kollegen im Forum",
        formell: false,
      },
    ],
    redemittel: {
      "Einstieg": ["Ich möchte mich gern an der Diskussion beteiligen.", "Zu der Frage, ob …, habe ich eine klare Meinung.", "Das Thema … betrifft uns alle."],
      "Meinung äußern": ["Meiner Ansicht nach …", "Ich bin davon überzeugt, dass …", "Aus meiner Sicht spricht vieles dafür, dass …"],
      "Begründen": ["Ein wichtiges Argument dafür ist …", "Das liegt vor allem daran, dass …", "Hinzu kommt, dass …"],
      "Gegenargumente": ["Natürlich kann man einwenden, dass …", "Zwar …, aber …", "Einerseits …, andererseits …"],
      "Beispiel": ["In meinem Team haben wir die Erfahrung gemacht, dass …", "Ein Beispiel dafür ist …"],
      "Vorschlag und Schluss": ["Ich schlage deshalb vor, …", "Eine mögliche Lösung wäre …", "Was haltet ihr davon?", "Ich bin gespannt auf eure Meinungen."],
    },
    checkliste: [
      "Thema klar eingeleitet",
      "Eigene Meinung deutlich formuliert",
      "Mindestens zwei Argumente mit Begründung",
      "Auf ein Gegenargument eingegangen (zwar … aber, einerseits … andererseits)",
      "Ein Beispiel oder eigene Erfahrung",
      "Konkreter Vorschlag am Schluss",
      "Konnektoren und Nebensätze abwechslungsreich (da, obwohl, sodass, deshalb)",
      "Mindestens 120 Wörter, Ton passend für ein Firmenforum",
    ],
    musterloesung: {
      A: `Liebe Kolleginnen und Kollegen,

ich möchte mich gern an der Diskussion über feste Bürozeiten beteiligen. Meiner Ansicht nach wäre es ein Rückschritt, das Homeoffice wieder stark einzuschränken.

Ein wichtiges Argument dafür ist die Konzentration: Zu Hause kann ich komplexe Aufgaben wie Auswertungen ohne Unterbrechungen erledigen. Hinzu kommt, dass viele von uns lange Anfahrtswege haben. Wer zweimal pro Woche nicht pendeln muss, spart Zeit und Geld und ist ausgeruhter.

Natürlich kann man einwenden, dass der persönliche Austausch leidet. Das stimmt teilweise: In meinem Team haben wir gemerkt, dass neue Kolleginnen ohne gemeinsame Bürotage schwerer Anschluss finden.

Ich schlage deshalb einen Kompromiss vor: Jedes Team legt zwei feste Präsenztage fest, an denen Besprechungen stattfinden, und an den übrigen Tagen entscheidet jeder selbst. So verbinden wir Flexibilität mit Zusammenarbeit.

Was haltet ihr davon?
Viele Grüße
Mehmet`,
      B: `Hallo zusammen,

zu der Frage, ob Weiterbildungen während der Arbeitszeit stattfinden sollten, habe ich eine klare Meinung: Ja, und zwar auf Kosten des Betriebs.

Aus meiner Sicht profitiert vor allem die Firma davon, wenn wir uns weiterbilden. Neue Software, neue Vorschriften und neue Kundenwünsche erfordern ständig zusätzliches Wissen. Wer Kurse am Wochenende besuchen muss, ist dagegen schnell überlastet, insbesondere mit Familie.

Zwar verursachen Schulungen während der Arbeitszeit Kosten und Ausfälle im Team, aber diese Investition zahlt sich langfristig aus, da gut qualifizierte Beschäftigte effizienter arbeiten und seltener kündigen.

Eine mögliche Lösung wäre ein festes Weiterbildungsbudget pro Person und Jahr, zum Beispiel fünf Tage. Die Teamleitung plant die Termine so, dass nie mehr als eine Person gleichzeitig fehlt.

Ich bin gespannt auf eure Meinungen!
Liebe Grüße
Johanna`,
    },
    minWoerter: 120,
  },
};
