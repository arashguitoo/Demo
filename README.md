# Sprachhafen (Arbeitstitel)

Übungsplattform für Integrations- und Berufssprachkurse, A1 bis B2.
Konzept & Inhalte: Arash Guitoo

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Startportal mit Anmeldung (Code für Lernende, E-Mail für Lehrkräfte) |
| `app.html` | Die App für beide Rollen (Router über `#/…`) |
| `einrichten.html` | Legt die Demo-Schule in Firebase an bzw. erneuert die Beispieldaten |
| `assets/js/config.js` | **Produktname und Firebase-Konfiguration** – nur hier ändern |
| `assets/js/core/` | Datenschicht (Firebase oder Demo im Browser), Anmeldung, UI, Auswertung |
| `assets/js/views/` | Seiten der App |
| `assets/js/data/katalog.js` | Bereiche und Aktivitäten |
| `assets/js/data/demo-daten.js` | Beispielschule, relativ zu „heute“ |
| `database.rules.json` | Sicherheitsregeln (erzeugt mit `python3 tools/regeln.py`) |

## Zwei Betriebsarten

- **Demo-Modus** (`FIREBASE_CONFIG = null`): alles liegt im Browser, die Beispielschule wird automatisch angelegt.
- **Firebase**: Config in `config.js` eintragen, Regeln aus `database.rules.json` in der Konsole einfügen,
  dann einmal `einrichten.html` öffnen und „Demo-Schule einrichten“ klicken.

## Demo-Zugänge

| Rolle | Zugang |
|---|---|
| Lehrkraft Demo 1–3 | demo1@sprachhafen.de, demo2@…, demo3@… / hafen2026 |
| Lernende (Integrationskurs, Wochenendkurs, BSK) | Codes GASTA2, GASTC2, GASTB2 |

## Datenmodell (Realtime Database)

```
users/{uid}                     Lehrkraft → Schule, Rolle
codes/{CODE}                    Code → Schule, Lernende:r
sessions/{uid}                  angemeldete:r Lernende:r (anonym)
schools/{sid}/meta|teachers|klassen|students
schools/{sid}/klassenbuch/{kid}/{datum}          Thema, Hausaufgabe, Ausfall
schools/{sid}/anwesenheit/{kid}/{datum}/{stid}   Status, Check-in, bestätigt
schools/{sid}/ergebnisse/{stid}/{id}             Übungsergebnisse
schools/{sid}/rueckmeldung/{stid}                Rückmeldung der Lehrkraft
```

Von Lernenden wird nur der Vorname gespeichert.
