/* Grammatik A2: Akkusativ oder Dativ? Wechselpräpositionen */
export default {
  id: "gr-kasus",
  titel: "Akkusativ oder Dativ?",
  niveau: "A2",
  module: [
    {
      id: "wohin",
      titel: "Wohin? Akkusativ",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "Wohin? → Akkusativ", html:
          "<p>Die Wechselpräpositionen: <b>in, an, auf, über, unter, vor, hinter, neben, zwischen</b>.</p>" +
          "<p>Frage <b>Wohin?</b> = Bewegung zu einem Ziel → <b>Akkusativ</b>. Typische Verben: <b>legen, stellen, hängen, setzen, gehen, fahren</b>.</p>" +
          "<table><tr><th>der</th><th>die</th><th>das</th><th>Plural</th></tr>" +
          "<tr><td><b>den</b> Tisch</td><td><b>die</b> Küche</td><td><b>das</b> Regal</td><td><b>die</b> Schränke</td></tr></table>" +
          "<p><b>Ich lege das Buch auf den Tisch.</b> <b>Wir gehen in die Stadt.</b></p>" +
          "<p>Kurzformen: in + das = <b>ins</b>, an + das = <b>ans</b></p>" },
        { typ: "luecke", satz: "Ich stelle die Lampe auf ___ Tisch.", optionen: ["den", "dem", "der", "das"], erklaerung: "Wohin? → Akkusativ: der Tisch → den Tisch." },
        { typ: "luecke", satz: "Amira hängt das Bild an ___ Wand.", optionen: ["die", "der", "den", "dem"], erklaerung: "Wohin? → Akkusativ: die Wand bleibt „die“." },
        { typ: "luecke", satz: "Tarek legt die Schlüssel in ___ Regal.", optionen: ["das", "dem", "den", "der"], erklaerung: "Wohin? → Akkusativ: das Regal bleibt „das“." },
        { typ: "luecke", satz: "Wir fahren am Sonntag an ___ Ostsee.", optionen: ["die", "der", "den", "dem"], erklaerung: "Wohin? → Akkusativ: die Ostsee." },
        { typ: "mc", frage: "Wohin gehst du? – Ich gehe …", optionen: ["ins Kino.", "im Kino.", "in dem Kino.", "in der Kino."], erklaerung: "Wohin? → Akkusativ: in + das = ins." },
        { typ: "luecke", satz: "Stell die Flasche bitte in ___ Kühlschrank.", optionen: ["den", "dem", "der", "die"], erklaerung: "Wohin? → Akkusativ: der Kühlschrank → den Kühlschrank." },
        { typ: "satzbau", woerter: ["Olena", "setzt", "das Kind", "auf den Stuhl."], alternativen: ["Auf den Stuhl setzt Olena das Kind."], erklaerung: "setzen → Wohin? → Akkusativ: auf den Stuhl." },
        { typ: "luecke", satz: "Jonas legt die Zeitung neben ___ Sofa.", optionen: ["das", "dem", "den", "der"], erklaerung: "Wohin? → Akkusativ: das Sofa." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Ich hänge die Jacke in den Schrank.", "Ich hänge die Jacke in dem Schrank.", "Ich hänge die Jacke in der Schrank."], erklaerung: "hängen (Bewegung) → Wohin? → Akkusativ." },
      ],
    },
    {
      id: "wo",
      titel: "Wo? Dativ",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "Wo? → Dativ", html:
          "<p>Frage <b>Wo?</b> = Ort, keine Bewegung zu einem Ziel → <b>Dativ</b>. Typische Verben: <b>liegen, stehen, hängen, sitzen, sein, wohnen, arbeiten</b>.</p>" +
          "<table><tr><th>der</th><th>die</th><th>das</th><th>Plural</th></tr>" +
          "<tr><td><b>dem</b> Tisch</td><td><b>der</b> Küche</td><td><b>dem</b> Regal</td><td><b>den</b> Schränken</td></tr></table>" +
          "<p><b>Das Buch liegt auf dem Tisch.</b> <b>Wir sind in der Stadt.</b></p>" +
          "<p>Kurzformen: in + dem = <b>im</b>, an + dem = <b>am</b></p>" },
        { typ: "luecke", satz: "Das Buch liegt auf ___ Tisch.", optionen: ["dem", "den", "der", "das"], erklaerung: "Wo? → Dativ: der Tisch → dem Tisch." },
        { typ: "luecke", satz: "Die Milch steht in ___ Kühlschrank.", optionen: ["dem", "den", "der", "die"], erklaerung: "Wo? → Dativ: der Kühlschrank → dem Kühlschrank." },
        { typ: "luecke", satz: "Das Bild hängt an ___ Wand.", optionen: ["der", "die", "dem", "den"], erklaerung: "Wo? → Dativ: die Wand → der Wand." },
        { typ: "mc", frage: "Wo ist Herr Yılmaz? – Er ist …", optionen: ["im Büro.", "ins Büro.", "in das Büro.", "in den Büro."], erklaerung: "Wo? → Dativ: in + dem = im." },
        { typ: "luecke", satz: "Die Katze schläft unter ___ Bett.", optionen: ["dem", "das", "den", "der"], erklaerung: "Wo? → Dativ: das Bett → dem Bett." },
        { typ: "luecke", satz: "Frau Schulz wartet vor ___ Apotheke.", optionen: ["der", "die", "dem", "den"], erklaerung: "Wo? → Dativ: die Apotheke → der Apotheke." },
        { typ: "satzbau", woerter: ["Die Kinder", "spielen", "hinter", "dem Haus."], alternativen: ["Hinter dem Haus spielen die Kinder."], erklaerung: "Wo? → Dativ: hinter dem Haus." },
        { typ: "luecke", satz: "Der Schlüssel liegt zwischen ___ Büchern.", optionen: ["den", "die", "dem", "der"], erklaerung: "Wo? → Dativ Plural: den Büchern (mit -n)." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Wir sitzen auf dem Balkon.", "Wir sitzen auf den Balkon.", "Wir sitzen auf der Balkon."], erklaerung: "sitzen → Wo? → Dativ: auf dem Balkon." },
      ],
    },
    {
      id: "mix",
      titel: "Wo oder wohin?",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "sortieren", anweisung: "Wo? oder Wohin?", gruppen: {
          "Wo? (Dativ)": ["auf dem Tisch", "im Bett", "an der Wand", "in der Küche", "neben dem Sofa"],
          "Wohin? (Akkusativ)": ["auf den Tisch", "ins Bett", "an die Wand", "in die Küche", "neben das Sofa"],
        } },
        { typ: "luecke", satz: "Ich lege das Handy auf ___ Schreibtisch. Jetzt liegt es dort.", optionen: ["den", "dem", "der", "das"], erklaerung: "legen → Wohin? → Akkusativ." },
        { typ: "luecke", satz: "Das Handy liegt jetzt auf ___ Schreibtisch.", optionen: ["dem", "den", "der", "das"], erklaerung: "liegen → Wo? → Dativ." },
        { typ: "mc", frage: "Wir gehen heute Abend …", optionen: ["in die Stadt.", "in der Stadt.", "in den Stadt."], erklaerung: "gehen → Wohin? → Akkusativ: in die Stadt." },
        { typ: "mc", frage: "Wir wohnen …", optionen: ["in der Stadt.", "in die Stadt.", "in den Stadt."], erklaerung: "wohnen → Wo? → Dativ: in der Stadt." },
        { typ: "sortieren", anweisung: "Welche Frage passt zum Verb?", gruppen: {
          "Wo? (Dativ)": ["liegen", "stehen", "sitzen", "wohnen"],
          "Wohin? (Akkusativ)": ["legen", "stellen", "setzen", "fahren"],
        } },
        { typ: "luecke", satz: "Amira stellt die Blumen auf ___ Fensterbank.", optionen: ["die", "der", "den", "dem"], erklaerung: "stellen → Wohin? → Akkusativ: die Fensterbank." },
        { typ: "luecke", satz: "Jetzt stehen die Blumen auf ___ Fensterbank.", optionen: ["der", "die", "den", "dem"], erklaerung: "stehen → Wo? → Dativ: der Fensterbank." },
        { typ: "paare", anweisung: "Welche Antwort passt?", paare: [
          ["Wo ist der Schlüssel?", "In der Tasche."],
          ["Wohin legst du den Schlüssel?", "In die Tasche."],
          ["Wo arbeitest du?", "Im Krankenhaus."],
          ["Wohin fährst du?", "Ins Krankenhaus."],
        ] },
        { typ: "satzbau", woerter: ["Ich", "hänge", "die Jacke", "an den Haken."], alternativen: ["An den Haken hänge ich die Jacke."], erklaerung: "hängen (Bewegung) → Wohin? → Akkusativ." },
      ],
    },
  ],
};
