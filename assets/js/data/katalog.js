/* ==========================================================
   Katalog aller Bereiche und Aktivitäten.
   status: "bereit" = spielbar, "bald" = in Arbeit (sichtbar, nicht startbar)
   fertigkeit: lesen | hoeren | schreiben | sprechen | wortschatz | grammatik
   ========================================================== */

export const FERTIGKEITEN = {
  wortschatz: "Wortschatz",
  grammatik: "Grammatik",
  lesen: "Lesen",
  hoeren: "Hören",
  schreiben: "Schreiben",
  sprechen: "Sprechen",
};

export const NIVEAUS = ["A1", "A2", "B1", "B2"];

export const BEREICHE = [
  { id: "lernpfad", titel: "Lernpfad", icon: "map", text: "Themenpakete von A1 bis B2: Wortschatz, Grammatik, Texte und ein Abschlusstest." },
  { id: "wortschatz", titel: "Wortschatz-Trainer", icon: "cards", text: "Karteikarten, die sich merken, was du schon kannst. Dazu Zuordnen, Artikel und Wortsalat." },
  { id: "grammatik", titel: "Grammatik-Werkstatt", icon: "puzzle", text: "Kurze Erklärungen und gestufte Übungen zu den wichtigsten Strukturen." },
  { id: "arena", titel: "Spielarena", icon: "trophy", text: "Allein spielen, Punkte für dein Team sammeln und in der Liga aufsteigen." },
  { id: "live", titel: "Live im Kurs", icon: "play", text: "Die Lehrkraft startet, alle spielen gleichzeitig am Handy gegeneinander." },
  { id: "gespraeche", titel: "Gespräche & Abenteuer", icon: "chat", text: "Chatten wie bei WhatsApp, Gespräche mit Verzweigungen und Schnitzeljagden zu zweit." },
  { id: "pruefung", titel: "Prüfungstraining", icon: "target", text: "Alle Teile von DTZ (A2–B1) und DTB B2 im echten Format, mit Prognose." },
];

export const AKTIVITAETEN = [
  // Lernpfad – je Niveau ein Themenpaket fürs Demo
  { id: "lp-a1-stadt", bereich: "lernpfad", niveau: "A1", titel: "Neu in der Stadt", text: "Sich vorstellen, Wohnung und Nachbarschaft, Zahlen und Uhrzeiten.", fertigkeit: "wortschatz", dauer: 45, status: "bald" },
  { id: "lp-a2-arzt", bereich: "lernpfad", niveau: "A2", titel: "Beim Arzt", text: "Termine machen, Beschwerden beschreiben, Modalverben.", fertigkeit: "wortschatz", dauer: 45, status: "bald" },
  { id: "lp-b1-amt", bereich: "lernpfad", niveau: "B1", titel: "Briefe vom Amt", text: "Behördenbriefe verstehen, formell antworten, weil – obwohl – deshalb.", fertigkeit: "lesen", dauer: 50, status: "bald" },
  { id: "lp-b2-betrieb", bereich: "lernpfad", niveau: "B2", titel: "Erster Tag im Betrieb", text: "Einarbeitung, Arbeitsschutz, Passiv und Nominalisierung.", fertigkeit: "lesen", dauer: 50, status: "bald" },

  // Wortschatz
  { id: "ws-karteikasten", bereich: "wortschatz", niveau: "A1", titel: "Karteikasten", text: "Fünf Fächer: Was du kannst, wandert nach hinten.", fertigkeit: "wortschatz", dauer: 10, status: "bald" },
  { id: "ws-artikel", bereich: "wortschatz", niveau: "A1", titel: "der, die oder das?", text: "Nomen in die richtige Spalte ziehen, gegen die Uhr.", fertigkeit: "wortschatz", dauer: 5, status: "bald" },
  { id: "ws-beruf", bereich: "wortschatz", niveau: "B2", titel: "Wortfeld Betrieb", text: "Begriffe aus Besprechung, Protokoll und Arbeitsschutz.", fertigkeit: "wortschatz", dauer: 10, status: "bald" },

  // Grammatik
  { id: "gr-satzklammer", bereich: "grammatik", niveau: "A2", titel: "Die Satzklammer", text: "Wo steht das Verb? Perfekt, Modalverben, trennbare Verben.", fertigkeit: "grammatik", dauer: 20, status: "bald" },
  { id: "gr-kasus", bereich: "grammatik", niveau: "A2", titel: "Akkusativ oder Dativ?", text: "Wechselpräpositionen mit Bildern: Wohin? Wo?", fertigkeit: "grammatik", dauer: 20, status: "bald" },
  { id: "gr-konnektoren", bereich: "grammatik", niveau: "B1", titel: "Sätze verbinden", text: "weil, obwohl, deshalb, trotzdem – und die Wortstellung.", fertigkeit: "grammatik", dauer: 20, status: "bald" },
  { id: "gr-passiv", bereich: "grammatik", niveau: "B2", titel: "Passiv im Betrieb", text: "Arbeitsabläufe beschreiben: wird geprüft, wurde geliefert.", fertigkeit: "grammatik", dauer: 20, status: "bald" },

  // Spielarena
  { id: "ar-liga", bereich: "arena", niveau: "A2", titel: "Liga: Alltag", text: "40 Aufgaben pro Liga: Silber, Gold, Diamant, Meister.", fertigkeit: "wortschatz", dauer: 15, status: "bald" },
  { id: "ar-liga-beruf", bereich: "arena", niveau: "B2", titel: "Liga: Beruf", text: "Berufswortschatz und Sprachbausteine im Wettkampf.", fertigkeit: "grammatik", dauer: 15, status: "bald" },

  // Live
  { id: "lv-quizduell", bereich: "live", niveau: "A2", titel: "Quiz-Duell", text: "Fragen auf dem Beamer, Antworten am Handy. Schnell sein lohnt sich.", fertigkeit: "wortschatz", dauer: 15, status: "bald" },
  { id: "lv-millionaer", bereich: "live", niveau: "B1", titel: "Wer wird Millionär?", text: "Teams spielen gegeneinander, mit Jokern.", fertigkeit: "grammatik", dauer: 20, status: "bald" },

  // Gespräche & Abenteuer
  { id: "gs-whatsapp", bereich: "gespraeche", niveau: "A2", titel: "Chat: Die Kursgruppe", text: "Nachrichten aus Satzbausteinen bauen und miteinander chatten.", fertigkeit: "schreiben", dauer: 30, status: "bald" },
  { id: "gs-whatsapp-b2", bereich: "gespraeche", niveau: "B2", titel: "Chat: Team Frühschicht", text: "Schicht tauschen, Kundenproblem weitergeben, höflich bleiben.", fertigkeit: "schreiben", dauer: 30, status: "bald" },
  { id: "gs-schnitzeljagd", bereich: "gespraeche", niveau: "A2", titel: "Schnitzeljagd: Der verlorene Schlüssel", text: "Zu zweit, jede Person sieht nur die Hälfte. Drei Ziffern öffnen das Schloss.", fertigkeit: "sprechen", dauer: 45, status: "bald" },

  // Prüfung
  { id: "pr-dtz-lesen", bereich: "pruefung", niveau: "B1", pruefung: "DTZ", titel: "DTZ Lesen", text: "Alle fünf Teile, 45 Minuten, 25 Aufgaben.", fertigkeit: "lesen", dauer: 45, status: "bald" },
  { id: "pr-dtz-hoeren", bereich: "pruefung", niveau: "B1", pruefung: "DTZ", titel: "DTZ Hören", text: "Ansagen, Radio, Gespräche, Meinungen. 20 Aufgaben.", fertigkeit: "hoeren", dauer: 25, status: "bald" },
  { id: "pr-dtz-schreiben", bereich: "pruefung", niveau: "B1", pruefung: "DTZ", titel: "DTZ Schreiben", text: "E-Mail oder Brief zu vier Leitpunkten, mit Checkliste.", fertigkeit: "schreiben", dauer: 30, status: "bald" },
  { id: "pr-dtz-sprechen", bereich: "pruefung", niveau: "B1", pruefung: "DTZ", titel: "DTZ Sprechen zu zweit", text: "Über sich sprechen, Bild beschreiben, gemeinsam planen.", fertigkeit: "sprechen", dauer: 16, status: "bald" },
  { id: "pr-dtb-lesen", bereich: "pruefung", niveau: "B2", pruefung: "DTB", titel: "DTB B2 Lesen", text: "Arbeitsmarkt, Unterweisungen, Forum und Protokoll.", fertigkeit: "lesen", dauer: 45, status: "bald" },
  { id: "pr-dtb-hoeren", bereich: "pruefung", niveau: "B2", pruefung: "DTB", titel: "DTB B2 Hören", text: "Gespräche im Betrieb, Präsentation, telefonische Mitteilungen.", fertigkeit: "hoeren", dauer: 20, status: "bald" },
  { id: "pr-dtb-schreiben", bereich: "pruefung", niveau: "B2", pruefung: "DTB", titel: "DTB B2 Schreiben", text: "Auf eine Kundenbeschwerde antworten und einen Forumsbeitrag schreiben.", fertigkeit: "schreiben", dauer: 40, status: "bald" },
  { id: "pr-dtb-sprachbausteine", bereich: "pruefung", niveau: "B2", pruefung: "DTB", titel: "DTB B2 Sprachbausteine", text: "Zwei Briefe mit je sechs Lücken.", fertigkeit: "grammatik", dauer: 15, status: "bald" },
  { id: "pr-dtb-telefonnotiz", bereich: "pruefung", niveau: "B2", pruefung: "DTB", titel: "DTB B2 Hören & Schreiben", text: "Telefonnotiz aufnehmen: Name, Nummer, Anliegen, zu erledigen.", fertigkeit: "hoeren", dauer: 5, status: "bald" },
  { id: "pr-dtb-sprechen", bereich: "pruefung", niveau: "B2", pruefung: "DTB", titel: "DTB B2 Sprechen Teil 3", text: "Lösungswege für ein Problem am Arbeitsplatz diskutieren.", fertigkeit: "sprechen", dauer: 5, status: "bald" },
];

export const aktivitaet = (id) => AKTIVITAETEN.find((a) => a.id === id);
export const bereich = (id) => BEREICHE.find((b) => b.id === id);
