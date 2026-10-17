/* Themenpaket A2: Beim Arzt */
export default {
  id: "lp-a2-arzt",
  titel: "Beim Arzt",
  niveau: "A2",
  module: [
    {
      id: "woerter",
      titel: "Wörter: Körper und Beschwerden",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "paare", anweisung: "Was tut weh? Finde das passende Wort.", paare: [
          ["der Kopf", "Kopfschmerzen"],
          ["der Bauch", "Bauchschmerzen"],
          ["der Hals", "Halsschmerzen"],
          ["der Zahn", "Zahnschmerzen"],
          ["der Rücken", "Rückenschmerzen"],
        ] },
        { typ: "sortieren", anweisung: "Der Körper: der, die oder das?", gruppen: {
          der: ["Arm", "Fuß", "Rücken", "Finger"],
          die: ["Hand", "Nase", "Schulter"],
          das: ["Bein", "Knie", "Auge", "Ohr"],
        } },
        { typ: "mc", frage: "Tarek hat 39 Grad. Er hat …", optionen: ["Fieber.", "Husten.", "Schnupfen.", "Durchfall."] },
        { typ: "luecke", satz: "Meine Nase läuft. Ich habe ___.", optionen: ["Schnupfen", "Fieber", "Rückenschmerzen"], erklaerung: "Wenn die Nase läuft, hat man Schnupfen." },
        { typ: "paare", anweisung: "Wer oder was passt?", paare: [
          ["Ich habe Zahnschmerzen.", "zum Zahnarzt gehen"],
          ["Ich brauche ein Medikament.", "in die Apotheke gehen"],
          ["Ich habe einen Unfall.", "den Notruf 112 wählen"],
          ["Ich bin krank und kann nicht arbeiten.", "den Arbeitgeber anrufen"],
        ] },
        { typ: "mc", frage: "Die Ärztin schreibt ein Medikament auf. Das ist …", optionen: ["ein Rezept.", "eine Versichertenkarte.", "ein Termin.", "eine Rechnung."] },
        { typ: "luecke", satz: "Bitte bringen Sie Ihre ___ mit. Die brauchen wir für die Krankenkasse.", optionen: ["Versichertenkarte", "Tablette", "Salbe"], erklaerung: "In der Praxis zeigt man die Versichertenkarte (Gesundheitskarte)." },
        { typ: "mc", frage: "Olena kann nicht arbeiten. Was bekommt sie vom Arzt für den Arbeitgeber?", optionen: ["Eine Krankmeldung.", "Ein Rezept.", "Eine Überweisung.", "Einen Termin."], erklaerung: "Die Krankmeldung heißt offiziell Arbeitsunfähigkeitsbescheinigung." },
        { typ: "paare", anweisung: "Finde die passende Erklärung.", paare: [
          ["das Wartezimmer", "Hier wartet man auf den Arzt."],
          ["die Sprechstunde", "Dann ist die Praxis offen."],
          ["die Überweisung", "Damit geht man zum Facharzt."],
          ["die Tablette", "Man nimmt sie mit Wasser."],
          ["die Salbe", "Man cremt sie auf die Haut."],
        ] },
        { typ: "luecke", satz: "Ich möchte einen ___ machen. Haben Sie am Dienstag Zeit?", optionen: ["Termin", "Husten", "Rücken"], erklaerung: "Beim Arzt macht man einen Termin." },
        { typ: "mc", frage: "Was sagt man in der Apotheke?", optionen: ["Ich habe hier ein Rezept.", "Ich möchte ein Zimmer reservieren.", "Einmal Hamburg, bitte."] },
        { typ: "sortieren", anweisung: "Was ist das?", gruppen: {
          "Körperteil": ["Magen", "Kopf", "Hals", "Knie"],
          "Beschwerde": ["Fieber", "Husten", "Schnupfen", "Übelkeit"],
        } },
      ],
    },
    {
      id: "grammatik",
      titel: "Modalverben: müssen, dürfen, sollen",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "müssen, dürfen, sollen", html:
          "<table><tr><th></th><th>müssen</th><th>dürfen</th><th>sollen</th></tr>" +
          "<tr><td>ich</td><td><b>muss</b></td><td><b>darf</b></td><td><b>soll</b></td></tr>" +
          "<tr><td>du</td><td><b>musst</b></td><td><b>darfst</b></td><td><b>sollst</b></td></tr>" +
          "<tr><td>er / sie / es</td><td><b>muss</b></td><td><b>darf</b></td><td><b>soll</b></td></tr>" +
          "<tr><td>wir / sie / Sie</td><td><b>müssen</b></td><td><b>dürfen</b></td><td><b>sollen</b></td></tr>" +
          "<tr><td>ihr</td><td><b>müsst</b></td><td><b>dürft</b></td><td><b>sollt</b></td></tr></table>" +
          "<ul><li><b>müssen</b> = es ist nötig: <b>Ich muss im Bett bleiben.</b></li>" +
          "<li><b>dürfen</b> = es ist erlaubt (nicht dürfen = verboten): <b>Sie dürfen keinen Sport machen.</b></li>" +
          "<li><b>sollen</b> = eine andere Person sagt es: <b>Der Arzt sagt, ich soll viel trinken.</b></li></ul>" +
          "<p>Satzklammer: Das Modalverb steht auf Position 2, der Infinitiv am Ende: <b>Ich muss heute zum Arzt gehen.</b></p>" },
        { typ: "luecke", satz: "Du hast Fieber. Du ___ zu Hause bleiben.", optionen: ["musst", "muss", "müsst", "müssen"], erklaerung: "du musst" },
        { typ: "luecke", satz: "Nach der Operation ___ Herr Yılmaz drei Wochen keinen Sport machen.", optionen: ["darf", "darfst", "dürft", "dürfen"], erklaerung: "er darf – „nicht dürfen“ / „kein … dürfen“ heißt: verboten." },
        { typ: "luecke", satz: "Die Ärztin sagt, ich ___ dreimal am Tag eine Tablette nehmen.", optionen: ["soll", "sollst", "sollen", "darf"], erklaerung: "Eine andere Person (die Ärztin) sagt es, also „sollen“." },
        { typ: "mc", frage: "Im Wartezimmer steht: <b>Bitte nicht telefonieren!</b> Das heißt:", optionen: ["Man darf hier nicht telefonieren.", "Man muss hier telefonieren.", "Man soll hier telefonieren."], erklaerung: "Es ist verboten, also „nicht dürfen“." },
        { typ: "satzbau", woerter: ["Ich", "muss", "morgen", "zum Arzt", "gehen."], alternativen: ["Morgen muss ich zum Arzt gehen."], hinweis: "Satzklammer: Modalverb auf Position 2, Infinitiv am Ende.", erklaerung: "„muss“ steht auf Position 2, „gehen“ am Ende." },
        { typ: "satzbau", woerter: ["Sie", "dürfen", "heute", "nichts", "essen."], alternativen: ["Heute dürfen Sie nichts essen."], erklaerung: "„dürfen“ auf Position 2, „essen“ am Ende." },
        { typ: "luecke", satz: "Wir ___ um 8 Uhr in der Praxis sein.", optionen: ["müssen", "muss", "müsst", "musst"], erklaerung: "wir müssen" },
        { typ: "satzbau", woerter: ["Am Montag", "soll", "Amira", "wieder", "in die Praxis", "kommen."], alternativen: ["Amira soll am Montag wieder in die Praxis kommen.", "Amira soll wieder am Montag in die Praxis kommen."], erklaerung: "„soll“ auf Position 2, „kommen“ am Ende." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Ihr dürft hier nicht rauchen.", "Ihr darf hier nicht rauchen.", "Ihr dürft hier nicht raucht.", "Ihr dürfen hier nicht rauchen."], erklaerung: "ihr dürft + Infinitiv am Ende." },
        { typ: "satzbau", woerter: ["Musst", "du", "heute", "arbeiten?"], erklaerung: "Ja/Nein-Frage: Das Modalverb steht vorne, der Infinitiv am Ende." },
      ],
    },
    {
      id: "perfekt",
      titel: "Was ist passiert? Das Perfekt",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "Das Perfekt", html:
          "<p>Über die Vergangenheit spricht man meistens im Perfekt: <b>haben</b> oder <b>sein</b> + Partizip II am Ende.</p>" +
          "<ul><li><b>Ich habe Kopfschmerzen gehabt.</b></li>" +
          "<li><b>Er hat eine Tablette genommen.</b></li>" +
          "<li><b>Sie ist zum Arzt gegangen.</b></li></ul>" +
          "<p><b>sein</b> bei Bewegung von A nach B (gehen, fahren, kommen) und bei Veränderung (einschlafen, aufstehen). Auch: <b>bleiben</b> → <b>ich bin geblieben</b>.</p>" +
          "<p>Partizip II: <b>machen → gemacht</b>, <b>nehmen → genommen</b>, <b>anrufen → angerufen</b>, <b>untersuchen → untersucht</b>.</p>" },
        { typ: "luecke", satz: "Gestern ___ ich beim Arzt gewesen.", optionen: ["bin", "habe", "hat", "ist"], erklaerung: "sein → ich bin gewesen" },
        { typ: "luecke", satz: "Ich habe die Praxis ___.", optionen: ["angerufen", "anrufen", "angeruft", "geanrufen"], erklaerung: "anrufen → angerufen: „ge“ steht zwischen „an“ und „rufen“." },
        { typ: "luecke", satz: "Jonas ist mit dem Bus zur Praxis ___.", optionen: ["gefahren", "gefahrt", "fahren", "gefährt"], erklaerung: "fahren → ist gefahren" },
        { typ: "luecke", satz: "Die Ärztin hat mich ___.", optionen: ["untersucht", "geuntersucht", "untersuchen", "untergesucht"], erklaerung: "Verben mit „unter-“ (untrennbar) bekommen kein „ge-“." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Ich bin drei Tage im Bett geblieben.", "Ich habe drei Tage im Bett geblieben.", "Ich bin drei Tage im Bett gebleibt."], erklaerung: "bleiben → ist geblieben" },
        { typ: "satzbau", woerter: ["Ich", "habe", "eine Tablette", "genommen."], erklaerung: "„habe“ auf Position 2, Partizip „genommen“ am Ende." },
        { typ: "satzbau", woerter: ["Gestern", "ist", "Olena", "zur Apotheke", "gegangen."], alternativen: ["Olena ist gestern zur Apotheke gegangen."], erklaerung: "„ist“ auf Position 2, „gegangen“ am Ende." },
        { typ: "luecke", satz: "Was ___ passiert? – Ich bin vom Fahrrad gefallen.", optionen: ["ist", "hat", "bist", "habe"], erklaerung: "passieren → ist passiert" },
        { typ: "satzbau", woerter: ["Hast", "du", "deinen Chef", "schon", "angerufen?"], alternativen: ["Hast du schon deinen Chef angerufen?"], erklaerung: "Ja/Nein-Frage: „Hast“ vorne, „angerufen“ am Ende." },
        { typ: "paare", anweisung: "Finde das Partizip II.", paare: [
          ["schlafen", "geschlafen"],
          ["trinken", "getrunken"],
          ["schreiben", "geschrieben"],
          ["warten", "gewartet"],
          ["aufstehen", "aufgestanden"],
        ] },
      ],
    },
    {
      id: "text",
      titel: "Lesen: In der Praxis",
      fertigkeit: "lesen",
      aufgaben: [
        { typ: "lesen", titel: "Aushang an der Praxistür", text:
          "<p><b>Hausarztpraxis Dr. Meyer</b></p>" +
          "<p>Sprechzeiten: Montag bis Freitag 8–12 Uhr, Montag und Donnerstag auch 15–18 Uhr. Mittwochnachmittag ist die Praxis geschlossen.</p>" +
          "<p><b>Urlaub:</b> Vom 20. bis 31. Oktober ist die Praxis geschlossen. Die Vertretung macht Frau Dr. Petersen, Holtenauer Straße 12, Telefon 0431 55 12 34.</p>" +
          "<p>Bitte kommen Sie nur mit Termin. Bringen Sie immer Ihre Versichertenkarte mit.</p>" +
          "<p>Im Notfall nachts und am Wochenende: Telefon 116 117.</p>",
          fragen: [
            { typ: "rf", aussage: "Am Mittwochnachmittag kann man in die Praxis gehen.", richtig: false, erklaerung: "Mittwochnachmittag ist die Praxis geschlossen." },
            { typ: "mc", frage: "Am 25. Oktober ist Amira krank. Was macht sie?", optionen: ["Sie geht zu Frau Dr. Petersen.", "Sie geht zu Dr. Meyer.", "Sie ruft am Wochenende 116 117 an."], erklaerung: "Vom 20. bis 31. Oktober macht Frau Dr. Petersen die Vertretung." },
            { typ: "rf", aussage: "Man soll ohne Termin in die Praxis kommen.", richtig: false, erklaerung: "Im Text steht: „Bitte kommen Sie nur mit Termin.“" },
            { typ: "mc", frage: "Wann hat die Praxis am Donnerstag geöffnet?", optionen: ["8–12 Uhr und 15–18 Uhr", "nur 8–12 Uhr", "nur 15–18 Uhr"] },
          ] },
        { typ: "lesen", titel: "Am Telefon", text:
          "<p><b>Praxis:</b> Praxis Dr. Meyer, guten Morgen.</p>" +
          "<p><b>Herr Yılmaz:</b> Guten Morgen, hier ist Kemal Yılmaz. Ich habe morgen um 10 Uhr einen Termin. Leider muss ich den Termin absagen. Mein Sohn ist krank.</p>" +
          "<p><b>Praxis:</b> Kein Problem. Möchten Sie einen neuen Termin?</p>" +
          "<p><b>Herr Yılmaz:</b> Ja, gern. Geht es am Freitag?</p>" +
          "<p><b>Praxis:</b> Am Freitag ist leider alles voll. Aber am Montag um 9:30 Uhr ist noch etwas frei.</p>" +
          "<p><b>Herr Yılmaz:</b> Das passt gut. Vielen Dank!</p>",
          fragen: [
            { typ: "mc", frage: "Warum ruft Herr Yılmaz an?", optionen: ["Er möchte seinen Termin absagen.", "Er möchte ein Rezept.", "Er hat Fieber."] },
            { typ: "rf", aussage: "Herr Yılmaz ist krank.", richtig: false, erklaerung: "Sein Sohn ist krank." },
            { typ: "mc", frage: "Wann ist der neue Termin?", optionen: ["Am Montag um 9:30 Uhr.", "Am Freitag um 10 Uhr.", "Morgen um 10 Uhr.", "Am Montag um 10 Uhr."] },
          ] },
      ],
    },
    {
      id: "test",
      titel: "Abschlusstest",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "luecke", satz: "Ich habe Halsschmerzen und ___ nicht sprechen.", optionen: ["kann", "muss", "darf", "soll"], erklaerung: "Es ist nicht möglich, also „können“." },
        { typ: "luecke", satz: "Gestern habe ich den ganzen Tag ___.", optionen: ["geschlafen", "geschlaft", "schlafen", "schläft"], erklaerung: "schlafen → hat geschlafen" },
        { typ: "mc", frage: "Wo bekommt man Medikamente mit einem Rezept?", optionen: ["In der Apotheke.", "Im Rathaus.", "In der Bäckerei.", "Im Wartezimmer."] },
        { typ: "satzbau", woerter: ["Ich", "kann", "heute", "nicht", "zur Arbeit", "kommen."], alternativen: ["Heute kann ich nicht zur Arbeit kommen."], erklaerung: "Modalverb auf Position 2, Infinitiv am Ende." },
        { typ: "luecke", satz: "Der Arzt sagt, du ___ viel Tee trinken.", optionen: ["sollst", "soll", "sollt", "sollen"], erklaerung: "Eine andere Person sagt es: du sollst." },
        { typ: "paare", anweisung: "Was passt zusammen?", paare: [
          ["das Auge", "sehen"],
          ["das Ohr", "hören"],
          ["die Nase", "riechen"],
          ["der Mund", "essen"],
          ["das Bein", "laufen"],
        ] },
        { typ: "luecke", satz: "Tarek ___ heute Morgen den Arbeitgeber angerufen.", optionen: ["hat", "ist", "habe", "bist"], erklaerung: "anrufen → hat angerufen" },
        { typ: "mc", frage: "Sie sind krank und können nicht arbeiten. Was müssen Sie tun?", optionen: ["Den Arbeitgeber sofort informieren.", "Nichts sagen und zu Hause bleiben.", "Nur eine E-Mail an die Kollegen schreiben."], erklaerung: "Man muss den Arbeitgeber sofort informieren und eine Krankmeldung schicken." },
        { typ: "satzbau", woerter: ["Am Freitag", "bin", "ich", "zum Arzt", "gegangen."], alternativen: ["Ich bin am Freitag zum Arzt gegangen."], erklaerung: "„bin“ auf Position 2, „gegangen“ am Ende." },
        { typ: "luecke", satz: "Mit dem gebrochenen Arm ___ Sie nicht Auto fahren.", optionen: ["dürfen", "darf", "dürft", "darfst"], erklaerung: "Sie dürfen nicht = es ist verboten." },
        { typ: "sortieren", anweisung: "Perfekt mit haben oder sein?", gruppen: {
          haben: ["nehmen", "schlafen", "anrufen", "warten", "trinken"],
          sein: ["gehen", "fahren", "kommen", "bleiben", "aufstehen"],
        } },
        { typ: "mc", frage: "Sie können nicht zum Termin kommen. Was sagen Sie am Telefon?", optionen: ["Ich muss leider meinen Termin absagen.", "Ich muss leider meinen Termin nehmen.", "Ich habe leider einen Termin gemacht."] },
      ],
    },
  ],
};
