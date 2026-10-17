/* ==========================================================
   Zentrale Einstellungen – hier wird der Produktname und die
   Firebase-Verbindung festgelegt. Sonst nirgends.
   ========================================================== */

export const APP = {
  name: "Sprachhafen",
  claim: "Deutsch üben von A1 bis B2 – allein, im Team und in der Klasse",
  autor: "Arash Guitoo",
  version: "0.1 Demo",
  /* Zugänge zum Ausprobieren auf der Startseite zeigen */
  demoZugaenge: true,
};

/* Firebase-Web-Config hier eintragen. Solange `null`, läuft die
   Plattform im Demo-Modus: alle Daten liegen nur in diesem Browser. */
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDTn3qDY8XIullqxl6Uez3TIfqENivlGPg",
  authDomain: "deutsch-88bf3.firebaseapp.com",
  databaseURL: "https://deutsch-88bf3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "deutsch-88bf3",
  storageBucket: "deutsch-88bf3.firebasestorage.app",
  messagingSenderId: "1067135067521",
  appId: "1:1067135067521:web:181a8d37f289b2914ab480",
};
/* Beispiel:
export const FIREBASE_CONFIG = {
  apiKey: "…",
  authDomain: "lern-deutsch-mit-arash.firebaseapp.com",
  databaseURL: "https://lern-deutsch-mit-arash-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lern-deutsch-mit-arash",
  appId: "…",
};
*/

export const GOATCOUNTER = "https://aguitoo.goatcounter.com/count";
