export default {
  id: "gr-konnektoren",
  titel: "Sätze verbinden",
  niveau: "B1",
  module: [
    {
      id: "grund",
      titel: "Gründe nennen: weil, da, denn, deshalb",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Gründe und Folgen",
          html: `<table>
<tr><th>Wort</th><th>Satzart</th><th>Verb</th><th>Beispiel</th></tr>
<tr><td>weil / da</td><td>Nebensatz (Grund)</td><td>am Ende</td><td>Ich komme später, <b>weil</b> der Bus Verspätung <b>hat</b>.</td></tr>
<tr><td>denn</td><td>Hauptsatz (Grund)</td><td>Position 2 – denn zählt nicht mit</td><td>Ich komme später, <b>denn</b> der Bus <b>hat</b> Verspätung.</td></tr>
<tr><td>deshalb</td><td>Hauptsatz (Folge)</td><td>direkt nach deshalb</td><td>Der Bus hat Verspätung, <b>deshalb komme</b> ich später.</td></tr>
</table>
<p><b>da</b> steht oft am Satzanfang: <b>Da</b> ich krank bin, <b>bleibe</b> ich zu Hause.</p>
<p>Auf die Frage <b>Warum?</b> antwortet man allein nur mit <b>weil</b>: – Warum kommst du nicht? – <b>Weil</b> ich arbeiten muss.</p>`,
        },
        {
          typ: "luecke",
          satz: "Tarek lernt jeden Abend, ___ er im Juni die Prüfung hat.",
          optionen: ["weil", "denn", "deshalb"],
          erklaerung: "Das Verb (hat) steht am Ende – das ist ein weil-Satz.",
        },
        {
          typ: "luecke",
          satz: "Tarek lernt jeden Abend, ___ er hat im Juni die Prüfung.",
          optionen: ["denn", "weil", "deshalb"],
          erklaerung: "Nach denn bleibt die normale Wortstellung: er hat …",
        },
        {
          typ: "luecke",
          satz: "Tarek hat im Juni die Prüfung, ___ lernt er jeden Abend.",
          optionen: ["deshalb", "denn", "weil"],
          erklaerung: "Folge, und das Verb (lernt) kommt direkt danach: deshalb.",
        },
        {
          typ: "luecke",
          satz: "___ die Kita heute geschlossen ist, bleibt Amira zu Hause.",
          optionen: ["Da", "Denn", "Deshalb"],
          erklaerung: "Nebensatz mit Verb am Ende am Satzanfang: da (oder weil).",
        },
        {
          typ: "satzbau",
          woerter: ["Ich", "gehe", "heute", "früher,", "weil", "ich", "einen Arzttermin", "habe."],
          alternativen: [
            "Weil ich einen Arzttermin habe, gehe ich heute früher.",
            "Heute gehe ich früher, weil ich einen Arzttermin habe.",
            "Ich gehe, weil ich einen Arzttermin habe, heute früher.",
          ],
          erklaerung: "Im weil-Satz steht das Verb (habe) am Ende.",
        },
        {
          typ: "satzbau",
          woerter: ["Es", "regnet", "stark,", "deshalb", "fahre", "ich", "mit dem Bus."],
          alternativen: ["Es regnet stark, ich fahre deshalb mit dem Bus."],
          erklaerung: "deshalb + Verb + Subjekt, oder: Subjekt + Verb + deshalb.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Olena ist müde, denn sie hat Nachtschicht gehabt.",
            "Olena ist müde, denn hat sie Nachtschicht gehabt.",
            "Olena ist müde, weil sie hat Nachtschicht gehabt.",
            "Olena ist müde, deshalb sie hat Nachtschicht gehabt.",
          ],
          erklaerung: "denn zählt nicht mit: denn + Subjekt + Verb.",
        },
        {
          typ: "mc",
          frage: "– Warum hast du nicht angerufen? – …",
          optionen: [
            "Weil mein Handy leer war.",
            "Denn mein Handy war leer.",
            "Deshalb war mein Handy leer.",
            "Da war mein Handy leer.",
          ],
          erklaerung: "Als kurze Antwort auf Warum? steht weil.",
        },
      ],
    },
    {
      id: "gegensatz",
      titel: "Gegensätze: obwohl, trotzdem, aber",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Etwas passiert – trotz eines Problems",
          html: `<table>
<tr><th>Wort</th><th>Verb</th><th>Beispiel</th></tr>
<tr><td>obwohl</td><td>am Ende (Nebensatz)</td><td>Ich gehe zur Arbeit, <b>obwohl</b> ich erkältet <b>bin</b>.</td></tr>
<tr><td>trotzdem</td><td>direkt danach (Position 1)</td><td>Ich bin erkältet, <b>trotzdem gehe</b> ich zur Arbeit.</td></tr>
<tr><td>aber</td><td>normale Stellung – aber zählt nicht mit</td><td>Ich bin erkältet, <b>aber</b> ich <b>gehe</b> zur Arbeit.</td></tr>
</table>
<p><b>trotzdem</b> kann auch im Satz stehen: Ich gehe <b>trotzdem</b> zur Arbeit.</p>
<p>Achtung: <b>obwohl</b> und <b>trotzdem</b> stehen beim jeweils anderen Satzteil. <b>Obwohl</b> ich müde bin … / Ich bin müde, <b>trotzdem</b> …</p>`,
        },
        {
          typ: "luecke",
          satz: "Jonas fährt mit dem Fahrrad zur Arbeit, ___ es regnet.",
          optionen: ["obwohl", "trotzdem", "aber"],
          erklaerung: "Das Verb (regnet) steht am Ende: obwohl.",
        },
        {
          typ: "luecke",
          satz: "Es regnet. ___ fährt Jonas mit dem Fahrrad zur Arbeit.",
          optionen: ["Trotzdem", "Obwohl", "Aber"],
          erklaerung: "Das Verb (fährt) folgt direkt: trotzdem.",
        },
        {
          typ: "luecke",
          satz: "Es regnet, ___ Jonas fährt mit dem Fahrrad zur Arbeit.",
          optionen: ["aber", "trotzdem", "obwohl"],
          erklaerung: "Nach aber steht das Subjekt, dann das Verb.",
        },
        {
          typ: "satzbau",
          woerter: ["Obwohl", "die Wohnung", "teuer", "ist,", "nehmen", "wir", "sie."],
          alternativen: ["Wir nehmen die Wohnung, obwohl sie teuer ist."],
          hinweis: "Beginne mit dem obwohl-Satz.",
          erklaerung: "Nach dem Nebensatz folgt sofort das Verb: nehmen wir sie.",
        },
        {
          typ: "satzbau",
          woerter: ["Der Kurs", "ist", "schwer,", "trotzdem", "macht", "er", "mir", "Spaß."],
          alternativen: ["Der Kurs ist schwer, er macht mir trotzdem Spaß."],
          erklaerung: "trotzdem auf Position 1, dann das Verb.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Obwohl Herr Yılmaz wenig Zeit hat, hilft er seinen Nachbarn.",
            "Obwohl Herr Yılmaz hat wenig Zeit, hilft er seinen Nachbarn.",
            "Obwohl Herr Yılmaz wenig Zeit hat, er hilft seinen Nachbarn.",
            "Trotzdem Herr Yılmaz wenig Zeit hat, hilft er seinen Nachbarn.",
          ],
          erklaerung: "obwohl + Verb am Ende, danach Verb an erster Stelle.",
        },
        {
          typ: "mc",
          frage: `Was bedeutet: „Frau Schulz hat Urlaub. Trotzdem liest sie ihre E-Mails.“?`,
          optionen: [
            "Sie liest E-Mails, obwohl sie Urlaub hat.",
            "Sie liest E-Mails, weil sie Urlaub hat.",
            "Sie hat Urlaub, deshalb liest sie keine E-Mails.",
            "Sie liest keine E-Mails, denn sie hat Urlaub.",
          ],
          erklaerung: "trotzdem und obwohl drücken denselben Gegensatz aus.",
        },
        {
          typ: "luecke",
          satz: "Ich habe die Anleitung zweimal gelesen. Ich verstehe sie ___ nicht.",
          optionen: ["trotzdem", "obwohl", "weil"],
          erklaerung: "trotzdem kann auch in der Satzmitte stehen.",
        },
      ],
    },
    {
      id: "folge",
      titel: "Folge und Ziel: sodass, damit, um … zu",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Was ist das Ergebnis? Was ist das Ziel?",
          html: `<table>
<tr><th>Wort</th><th>Bedeutung</th><th>Beispiel</th></tr>
<tr><td>sodass</td><td>Folge (Ergebnis)</td><td>Der Zug hatte Verspätung, <b>sodass</b> ich zu spät <b>kam</b>.</td></tr>
<tr><td>damit</td><td>Ziel – zwei verschiedene Personen</td><td>Ich erkläre es langsam, <b>damit</b> du es <b>verstehst</b>.</td></tr>
<tr><td>um … zu</td><td>Ziel – dieselbe Person</td><td>Ich lerne Deutsch, <b>um</b> eine Ausbildung <b>zu machen</b>.</td></tr>
</table>
<p>Bei <b>sodass</b> und <b>damit</b> steht das Verb am Ende. Bei <b>um … zu</b> gibt es kein Subjekt; am Ende steht <b>zu + Infinitiv</b>.</p>
<p>Trennbare Verben: um früh <b>aufzustehen</b>.</p>`,
        },
        {
          typ: "luecke",
          satz: "Amira spart Geld, ___ eine größere Wohnung zu mieten.",
          optionen: ["um", "damit", "sodass"],
          erklaerung: "Dieselbe Person und zu + Infinitiv: um … zu.",
        },
        {
          typ: "luecke",
          satz: "Ich spreche langsam, ___ mich alle verstehen.",
          optionen: ["damit", "um", "sodass"],
          erklaerung: "Ziel mit zwei verschiedenen Personen (ich – alle): damit.",
        },
        {
          typ: "luecke",
          satz: "Die Straße war gesperrt, ___ wir einen Umweg fahren mussten.",
          optionen: ["sodass", "damit", "um"],
          erklaerung: "Das ist ein Ergebnis, kein Ziel: sodass.",
        },
        {
          typ: "luecke",
          satz: "Herr Mensah steht um fünf Uhr auf, um pünktlich bei der Arbeit ___.",
          optionen: ["zu sein", "ist", "sein"],
          erklaerung: "um … zu + Infinitiv: um pünktlich zu sein.",
        },
        {
          typ: "satzbau",
          woerter: ["Ich", "gehe", "zum Bürgeramt,", "um", "meinen Ausweis", "abzuholen."],
          alternativen: ["Um meinen Ausweis abzuholen, gehe ich zum Bürgeramt."],
          erklaerung: "Trennbares Verb: abholen → abzuholen.",
        },
        {
          typ: "satzbau",
          woerter: ["Wir", "schreiben", "alles", "auf,", "damit", "wir", "nichts", "vergessen."],
          alternativen: ["Damit wir nichts vergessen, schreiben wir alles auf."],
          erklaerung: "Im damit-Satz steht das Verb am Ende.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Olena macht einen Kurs, um besser Deutsch zu sprechen.",
            "Olena macht einen Kurs, um sie besser Deutsch spricht.",
            "Olena macht einen Kurs, damit besser Deutsch zu sprechen.",
            "Olena macht einen Kurs, um besser Deutsch sprechen.",
          ],
          erklaerung: "um … zu ohne Subjekt, zu + Infinitiv am Ende.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz drückt eine Folge aus?",
          optionen: [
            "Es hat stark geschneit, sodass die Schule ausfiel.",
            "Ich nehme den Schirm mit, damit ich nicht nass werde.",
            "Ich lerne viel, um die Prüfung zu bestehen.",
            "Ich rufe an, damit du Bescheid weißt.",
          ],
          erklaerung: "sodass nennt das Ergebnis; damit und um … zu nennen ein Ziel.",
        },
      ],
    },
  ],
};
