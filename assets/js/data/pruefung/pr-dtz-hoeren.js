/* DTZ Hören – eigener Übungssatz im Prüfungsformat (alle Hörtexte selbst geschrieben) */
export default {
  id: "pr-dtz-hoeren",
  titel: "DTZ Hören",
  pruefung: "DTZ",
  fertigkeit: "hoeren",
  niveau: "B1",
  minuten: 25,
  teile: [
    /* ---------------- Teil 1 ---------------- */
    {
      titel: "Teil 1",
      ziel: "Ansagen am Telefon und Durchsagen verstehen",
      anweisung: "Sie hören vier Ansagen. Zu jeder Ansage gibt es eine Aufgabe. Wählen Sie die richtige Lösung. Sie hören jeden Text zweimal.",
      hoertexte: [
        { titel: "Ansage 1", wiederholen: 2, sprecher: [
          { wer: "Praxis", stimme: "w", text: "Guten Tag, hier ist die Praxis Doktor Petersen. Leider sind wir im Moment nicht erreichbar. Unsere Praxis ist vom zwölften bis zum dreiundzwanzigsten August wegen Urlaub geschlossen. In dringenden Fällen gehen Sie bitte zu unserer Vertretung, Doktor Yilmaz, in der Holtenauer Straße vierzig. Rezepte können Sie ab dem vierundzwanzigsten August wieder bei uns abholen. Vielen Dank." },
        ]},
        { titel: "Ansage 2", wiederholen: 2, sprecher: [
          { wer: "Durchsage", stimme: "m", text: "Liebe Kundinnen und Kunden, heute ist bei uns Familientag! Alle Kinder bekommen an der Kasse ein Eis geschenkt. Und für die Eltern: In der Obstabteilung gibt es Äpfel und Birnen heute zum halben Preis. Unser Markt hat heute übrigens bis zweiundzwanzig Uhr für Sie geöffnet. Viel Spaß beim Einkaufen!" },
        ]},
        { titel: "Ansage 3", wiederholen: 2, sprecher: [
          { wer: "Frau Nowak", stimme: "w", text: "Hallo Herr Rahimi, hier ist Petra Nowak vom Elternrat der Kita Sonnenblume. Wir planen ja das Sommerfest am Samstag. Sie haben gesagt, Sie können einen Kuchen mitbringen. Vielen Dank dafür! Wir brauchen aber leider auch noch jemanden für den Aufbau am Freitagnachmittag. Hätten Sie vielleicht Zeit? Rufen Sie mich doch bitte kurz zurück. Meine Nummer ist null – eins – sieben – sechs, fünf – fünf – drei, acht – zwei – eins. Danke und tschüss!" },
        ]},
        { titel: "Ansage 4", wiederholen: 2, sprecher: [
          { wer: "Durchsage", stimme: "m", text: "Sehr geehrte Fahrgäste, wegen einer Baustelle hält der Bus der Linie elf heute nicht an der Haltestelle Rathaus. Bitte steigen Sie an der Haltestelle Markt aus und gehen Sie von dort zu Fuß weiter. Der Weg dauert etwa fünf Minuten. Wir danken für Ihr Verständnis." },
        ]},
      ],
      aufgaben: [
        { typ: "mc", nr: 1, hoertext: 0, frage: "Was sollen Patienten in dringenden Fällen tun?", optionen: ["Zu einer anderen Praxis gehen.", "Ab dem vierundzwanzigsten August anrufen.", "Ein Rezept in der Praxis abholen."], erklaerung: "In dringenden Fällen geht man zur Vertretung, Doktor Yilmaz." },
        { typ: "mc", nr: 2, hoertext: 1, frage: "Was ist heute im Supermarkt billiger?", optionen: ["Obst.", "Eis.", "Getränke."], erklaerung: "Äpfel und Birnen gibt es zum halben Preis. Das Eis ist für Kinder geschenkt." },
        { typ: "mc", nr: 3, hoertext: 2, frage: "Was möchte Frau Nowak von Herrn Rahimi?", optionen: ["Er soll beim Aufbau helfen.", "Er soll einen Kuchen backen.", "Er soll am Samstag früher kommen."], erklaerung: "Für den Kuchen bedankt sie sich – sie braucht noch Hilfe beim Aufbau am Freitag." },
        { typ: "mc", nr: 4, hoertext: 3, frage: "Wo sollen die Fahrgäste zum Rathaus aussteigen?", optionen: ["An der Haltestelle Markt.", "An der Haltestelle Rathaus.", "An der Baustelle."], erklaerung: "Der Bus hält nicht am Rathaus; man steigt am Markt aus." },
      ],
    },

    /* ---------------- Teil 2 ---------------- */
    {
      titel: "Teil 2",
      ziel: "Informationen im Radio verstehen",
      anweisung: "Sie hören fünf Informationen aus dem Radio. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Lösung. Sie hören jeden Text einmal.",
      hoertexte: [
        { titel: "Radio 1", wiederholen: 1, sprecher: [
          { wer: "Sprecherin", stimme: "w", text: "Und nun das Wetter für morgen: Am Vormittag ist es noch sonnig bei Temperaturen um achtzehn Grad. Ab dem Mittag kommen von Westen dunkle Wolken, und am Nachmittag gibt es überall Gewitter mit starkem Regen. Wer eine Radtour plant, sollte also früh losfahren." },
        ]},
        { titel: "Radio 2", wiederholen: 1, sprecher: [
          { wer: "Sprecher", stimme: "m", text: "Eine Information für alle Autofahrer: Die Brücke über den Kanal in Holtenau ist ab Montag für drei Wochen gesperrt. Grund sind Reparaturarbeiten. Eine Umleitung ist ausgeschildert. Fahrräder und Fußgänger können die Brücke weiter benutzen." },
        ]},
        { titel: "Radio 3", wiederholen: 1, sprecher: [
          { wer: "Sprecherin", stimme: "w", text: "Am Sonntag ist wieder Flohmarkt auf dem Exerzierplatz. Von acht bis sechzehn Uhr können Sie dort nach Kleidung, Büchern und Spielzeug suchen. Wer selbst etwas verkaufen möchte, muss sich bis Freitag im Internet anmelden. Ein Stand kostet zehn Euro." },
        ]},
        { titel: "Radio 4", wiederholen: 1, sprecher: [
          { wer: "Sprecher", stimme: "m", text: "Gute Nachrichten für Familien: Das Schwimmbad am Westring ist nach dem Umbau wieder geöffnet. Neu ist ein großes Becken nur für Kinder. Zur Eröffnung am Samstag ist der Eintritt für alle frei. Ab Sonntag gelten dann wieder die normalen Preise." },
        ]},
        { titel: "Radio 5", wiederholen: 1, sprecher: [
          { wer: "Sprecherin", stimme: "w", text: "Die Volkshochschule bietet im Herbst einen neuen Kurs an: Kochen mit wenig Geld. An sechs Abenden lernen die Teilnehmenden, wie man gesund und günstig kocht. Der Kurs ist am Mittwoch um achtzehn Uhr dreißig. Anmeldungen sind ab sofort telefonisch oder im Büro der Volkshochschule möglich." },
        ]},
      ],
      aufgaben: [
        { typ: "mc", nr: 5, hoertext: 0, frage: "Wie wird das Wetter morgen?", optionen: ["Am Nachmittag regnet es.", "Es ist den ganzen Tag sonnig.", "Am Vormittag gibt es Gewitter."], erklaerung: "Ab dem Nachmittag gibt es Gewitter mit starkem Regen." },
        { typ: "mc", nr: 6, hoertext: 1, frage: "Wer darf ab Montag nicht über die Brücke?", optionen: ["Autos.", "Fahrräder.", "Fußgänger."], erklaerung: "Die Brücke ist für Autofahrer gesperrt; Räder und Fußgänger dürfen weiter darüber." },
        { typ: "mc", nr: 7, hoertext: 2, frage: "Was müssen Verkäufer für den Flohmarkt tun?", optionen: ["Sich bis Freitag anmelden.", "Am Sonntag um acht Uhr zehn Euro bezahlen.", "Nur Kleidung und Spielzeug mitbringen."], erklaerung: "Verkäufer müssen sich bis Freitag im Internet anmelden." },
        { typ: "mc", nr: 8, hoertext: 3, frage: "Was gibt es am Samstag im Schwimmbad?", optionen: ["Freien Eintritt.", "Einen Schwimmkurs für Kinder.", "Neue, höhere Preise."], erklaerung: "Zur Eröffnung am Samstag ist der Eintritt frei." },
        { typ: "mc", nr: 9, hoertext: 4, frage: "Was lernt man im neuen Kurs der Volkshochschule?", optionen: ["Günstig und gesund zu kochen.", "Mit wenig Geld zu sparen.", "Sechs Gerichte aus aller Welt."], erklaerung: "Der Kurs heißt „Kochen mit wenig Geld“: gesund und günstig kochen." },
      ],
    },

    /* ---------------- Teil 3 ---------------- */
    {
      titel: "Teil 3",
      ziel: "Gespräche im Alltag verstehen",
      anweisung: "Sie hören vier Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Lösung (a, b oder c) passt? Sie hören jedes Gespräch einmal.",
      hoertexte: [
        { titel: "Gespräch 1", wiederholen: 1, sprecher: [
          { wer: "Verkäufer", stimme: "m", text: "Guten Tag, kann ich Ihnen helfen?" },
          { wer: "Frau Demir", stimme: "w", text: "Ja, ich habe letzte Woche diese Jacke gekauft. Aber zu Hause habe ich gesehen, dass ein Knopf fehlt. Kann ich die Jacke umtauschen?" },
          { wer: "Verkäufer", stimme: "m", text: "Natürlich. Haben Sie den Kassenbon dabei?" },
          { wer: "Frau Demir", stimme: "w", text: "Ja, hier ist er." },
          { wer: "Verkäufer", stimme: "m", text: "Danke. Leider haben wir die Jacke in Blau nicht mehr in Ihrer Größe. In Schwarz habe ich sie noch. Oder möchten Sie Ihr Geld zurück?" },
          { wer: "Frau Demir", stimme: "w", text: "Hm, Schwarz gefällt mir eigentlich auch gut. Dann nehme ich die schwarze." },
        ]},
        { titel: "Gespräch 2", wiederholen: 1, sprecher: [
          { wer: "Jonas", stimme: "m", text: "Hallo Olena! Du siehst müde aus. Alles in Ordnung?" },
          { wer: "Olena", stimme: "w", text: "Ach, hallo Jonas. Ja, ich bin müde. Ich habe seit zwei Wochen eine neue Stelle im Krankenhaus und arbeite jetzt im Schichtdienst. Diese Woche habe ich Nachtschicht." },
          { wer: "Jonas", stimme: "m", text: "Oh, das ist anstrengend. Und wie gefällt dir die Arbeit?" },
          { wer: "Olena", stimme: "w", text: "Die Arbeit macht mir viel Spaß, und die Kollegen sind sehr nett. Nur das Schlafen am Tag ist schwierig, weil es in unserer Straße so laut ist." },
          { wer: "Jonas", stimme: "m", text: "Hast du schon mal Ohrstöpsel probiert? Meine Schwester arbeitet auch nachts, und sie sagt, das hilft." },
          { wer: "Olena", stimme: "w", text: "Nein, noch nicht. Gute Idee, die kaufe ich heute noch." },
        ]},
        { titel: "Gespräch 3", wiederholen: 1, sprecher: [
          { wer: "Mitarbeiterin", stimme: "w", text: "Bürgerbüro, guten Tag. Was kann ich für Sie tun?" },
          { wer: "Herr Osei", stimme: "m", text: "Guten Tag. Ich bin letzten Monat umgezogen und möchte meine neue Adresse anmelden. Brauche ich dafür einen Termin?" },
          { wer: "Mitarbeiterin", stimme: "w", text: "Ja, Sie brauchen einen Termin. Den können Sie im Internet buchen oder hier am Telefon. Der nächste freie Termin ist am Dienstag um zehn Uhr fünfzehn." },
          { wer: "Herr Osei", stimme: "m", text: "Dienstag passt gut. Was muss ich mitbringen?" },
          { wer: "Mitarbeiterin", stimme: "w", text: "Ihren Pass oder Personalausweis und die Bestätigung von Ihrem Vermieter. Die Anmeldung selbst kostet nichts." },
          { wer: "Herr Osei", stimme: "m", text: "Prima, vielen Dank." },
        ]},
        { titel: "Gespräch 4", wiederholen: 1, sprecher: [
          { wer: "Amira", stimme: "w", text: "Du, Malte, ich möchte am Wochenende mit den Kindern einen Ausflug machen. Hast du eine Idee?" },
          { wer: "Malte", stimme: "m", text: "Wie wäre es mit dem Tierpark? Da waren wir letzten Monat, und die Kinder fanden es toll." },
          { wer: "Amira", stimme: "w", text: "Das klingt gut. Aber ist das nicht teuer?" },
          { wer: "Malte", stimme: "m", text: "Für Erwachsene kostet es acht Euro, Kinder unter sechs Jahren sind frei. Und du kannst dein Essen selbst mitbringen. Es gibt dort einen schönen Picknickplatz." },
          { wer: "Amira", stimme: "w", text: "Super. Meine Kinder sind vier und sieben. Wie kommt man da am besten hin?" },
          { wer: "Malte", stimme: "m", text: "Mit dem Bus Nummer zweiundzwanzig. Der hält direkt vor dem Eingang." },
        ]},
      ],
      aufgaben: [
        { typ: "rf", nr: 10, hoertext: 0, aussage: "Frau Demir hat einen Kassenbon.", richtig: true, erklaerung: "Sie gibt dem Verkäufer den Kassenbon." },
        { typ: "mc", nr: 11, hoertext: 0, frage: "Was macht Frau Demir?", optionen: ["Sie nimmt eine Jacke in einer anderen Farbe.", "Sie bekommt ihr Geld zurück.", "Sie lässt den Knopf annähen."], erklaerung: "Sie nimmt die schwarze Jacke." },
        { typ: "rf", nr: 12, hoertext: 1, aussage: "Olena gefällt ihre neue Arbeit nicht.", richtig: false, erklaerung: "Die Arbeit macht ihr viel Spaß." },
        { typ: "mc", nr: 13, hoertext: 1, frage: "Was ist Olenas Problem?", optionen: ["Sie kann am Tag schlecht schlafen.", "Sie versteht sich nicht mit den Kollegen.", "Sie hat zu viele Nachtschichten im Monat."], erklaerung: "Am Tag ist es in ihrer Straße zu laut zum Schlafen." },
        { typ: "rf", nr: 14, hoertext: 2, aussage: "Herr Osei kann ohne Termin ins Bürgerbüro kommen.", richtig: false, erklaerung: "Er braucht einen Termin." },
        { typ: "mc", nr: 15, hoertext: 2, frage: "Was muss Herr Osei mitbringen?", optionen: ["Einen Ausweis und eine Bestätigung vom Vermieter.", "Seinen Mietvertrag und Geld für die Anmeldung.", "Ein Foto und seinen Pass."], erklaerung: "Pass oder Personalausweis und die Bestätigung vom Vermieter; die Anmeldung kostet nichts." },
        { typ: "rf", nr: 16, hoertext: 3, aussage: "Malte war schon einmal im Tierpark.", richtig: true, erklaerung: "Er war letzten Monat mit den Kindern dort." },
        { typ: "mc", nr: 17, hoertext: 3, frage: "Was stimmt für den Eintritt von Amiras Kindern?", optionen: ["Nur das ältere Kind muss bezahlen.", "Beide Kinder sind frei.", "Beide Kinder zahlen acht Euro."], erklaerung: "Kinder unter sechs sind frei – das Kind mit vier Jahren, nicht aber das mit sieben." },
      ],
    },

    /* ---------------- Teil 4 ---------------- */
    {
      titel: "Teil 4",
      ziel: "Meinungen verstehen",
      anweisung: "Sie hören drei Personen. Sie sprechen in einer Radiosendung zum Thema „Kinder und Handy“. Welcher Satz a bis f passt zu den Aussagen 18 bis 20? Lesen Sie zuerst die Sätze a bis f. Sie hören die Aussagen zweimal.",
      material: `<table>
<tr><th>a</th><td>Kinder sollen mit dem Handy auch etwas lernen.</td></tr>
<tr><th>b</th><td>Ein Handy ist für Kinder vor allem wegen der Sicherheit wichtig.</td></tr>
<tr><th>c</th><td>Kinder sollten erst mit vierzehn Jahren ein Handy bekommen.</td></tr>
<tr><th>d</th><td>Eltern sollten selbst weniger auf das Handy schauen.</td></tr>
<tr><th>e</th><td>Handys sollten in der Schule ganz verboten sein.</td></tr>
<tr><th>f</th><td>Kinder brauchen feste Regeln für das Handy.</td></tr>
</table>`,
      hoertexte: [
        { titel: "Aussage 18", wiederholen: 2, sprecher: [
          { wer: "Herr Becker", stimme: "m", text: "Mein Sohn ist zehn und hat seit einem Jahr ein Handy. Bei uns gibt es aber klare Abmachungen: Er darf eine Stunde am Tag spielen, nicht beim Essen und nicht nach acht Uhr abends. Am Anfang gab es oft Streit, aber jetzt funktioniert es gut. Ohne solche Abmachungen geht es meiner Meinung nach nicht." },
        ]},
        { titel: "Aussage 19", wiederholen: 2, sprecher: [
          { wer: "Frau Ahmadi", stimme: "w", text: "Ehrlich gesagt sind oft wir Erwachsenen das Problem. Ich sehe so viele Mütter und Väter auf dem Spielplatz, die nur auf ihr Telefon schauen. Und dann wundern wir uns, dass die Kinder das auch so machen. Ich lege mein Handy jetzt am Nachmittag in eine Schublade. Die Kinder merken das sofort." },
        ]},
        { titel: "Aussage 20", wiederholen: 2, sprecher: [
          { wer: "Frau Lindner", stimme: "w", text: "Meine Tochter fährt jeden Tag allein mit dem Bus zur Schule, das sind fast vierzig Minuten. Ich bin einfach ruhiger, wenn sie mich anrufen kann, wenn der Bus nicht kommt oder etwas passiert. Spiele hat sie auf dem Handy übrigens kaum. Für mich geht es nur darum, dass ich weiß: Sie kann mich immer erreichen." },
        ]},
      ],
      aufgaben: [
        { typ: "mc", nr: 18, hoertext: 0, fest: true, frage: "Herr Becker", optionen: ["a", "b", "c", "d", "e", "f"], loesung: "f", erklaerung: "Er spricht über klare Abmachungen, also Regeln." },
        { typ: "mc", nr: 19, hoertext: 1, fest: true, frage: "Frau Ahmadi", optionen: ["a", "b", "c", "d", "e", "f"], loesung: "d", erklaerung: "Sie meint, die Erwachsenen sollten weniger auf das Telefon schauen." },
        { typ: "mc", nr: 20, hoertext: 2, fest: true, frage: "Frau Lindner", optionen: ["a", "b", "c", "d", "e", "f"], loesung: "b", erklaerung: "Für sie ist wichtig, dass die Tochter sie erreichen kann – Sicherheit." },
      ],
    },
  ],
};
