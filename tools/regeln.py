"""Erzeugt database.rules.json (Firebase Realtime Database).
Aufruf: python3 tools/regeln.py  → schreibt database.rules.json ins Projekt."""
import json, os

LK = "root.child('users/' + auth.uid + '/schoolId').val() === $sid"          # Lehrkraft dieser Schule
ADMIN = LK + " && root.child('users/' + auth.uid + '/rolle').val() === 'admin'"
SES = "root.child('sessions/' + auth.uid)"
TN = f"(auth != null && {SES}.child('schoolId').val() === $sid)"             # Lernende:r dieser Schule
TN_ID = f"{SES}.child('studentId').val()"
TN_KL = f"root.child('schools/' + $sid + '/students/' + {TN_ID} + '/klasseId').val()"

regeln = {
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && (auth.uid === $uid || root.child('users/' + auth.uid + '/schoolId').val() === data.child('schoolId').val())",
        # Selbst anlegen: neue Schule (noch ohne meta) ODER Einladung für die eigene E-Mail
        ".write": "auth != null && auth.uid === $uid && !data.exists() && newData.exists() && ("
                  "!root.child('schools/' + newData.child('schoolId').val() + '/meta').exists() || "
                  "root.child('schools/' + newData.child('schoolId').val() + '/einladungen/' + auth.token.email.toLowerCase().replace('.', '_')).exists())",
        ".validate": "newData.hasChildren(['schoolId', 'name', 'rolle'])",
        "rolle": {".validate": "newData.val() === 'lehrkraft' || (newData.val() === 'admin' && !root.child('schools/' + newData.parent().child('schoolId').val() + '/meta').exists())"},
      }
    },
    "codes": {
      "$code": {
        ".read": "auth != null",
        ".write": "auth != null && ("
                  "root.child('users/' + auth.uid + '/schoolId').val() === newData.child('schoolId').val() || "
                  "(!newData.exists() && root.child('users/' + auth.uid + '/schoolId').val() === data.child('schoolId').val()))",
      }
    },
    "sessions": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid && (!newData.exists() || ("
                  "root.child('codes/' + newData.child('code').val() + '/studentId').val() === newData.child('studentId').val() && "
                  "root.child('codes/' + newData.child('code').val() + '/schoolId').val() === newData.child('schoolId').val()))",
      }
    },
    "schools": {
      "$sid": {
        ".read": f"auth != null && {LK}",
        ".write": f"auth != null && {LK}",
        "meta": {
          ".read": f"auth != null && ({LK} || {TN})",
          ".write": f"auth != null && (({ADMIN}) || (!data.exists() && root.child('users/' + auth.uid + '/schoolId').val() === $sid))",
        },
        "teachers": {"$uid": {".write": f"auth != null && (({ADMIN}) || (auth.uid === $uid && root.child('users/' + auth.uid + '/schoolId').val() === $sid))"}},
        "einladungen": {".write": f"auth != null && {ADMIN}"},
        "klassen": {"$kid": {".read": f"{TN} && {TN_KL} === $kid"}},
        "students": {"$stid": {".read": f"{TN} && {TN_ID} === $stid"}},
        "klassenbuch": {"$kid": {".read": f"{TN} && {TN_KL} === $kid"}},
        "anwesenheit": {"$kid": {"$tag": {"$stid": {
          ".read": f"{TN} && {TN_ID} === $stid",
          # Lernende dürfen nur unbestätigt einchecken, und nur, wenn noch nichts eingetragen ist
          ".write": f"{TN} && {TN_ID} === $stid && {TN_KL} === $kid && !data.exists() && newData.child('bestaetigt').val() === false && newData.child('status').val() === 'da'",
        }}}},
        "ergebnisse": {"$stid": {
          ".read": f"{TN} && {TN_ID} === $stid",
          "$eid": {
            ".write": f"{TN} && {TN_ID} === $stid && !data.exists()",
            ".validate": "newData.hasChildren(['aktivitaet', 'punkte', 'max', 'ts']) && newData.child('punkte').isNumber() && newData.child('max').isNumber() && newData.child('punkte').val() <= newData.child('max').val()",
          },
        }},
        "rueckmeldung": {"$stid": {".read": f"{TN} && {TN_ID} === $stid"}},
        "live": {
          ".read": f"auth != null && ({LK} || {TN})",
          "$raum": {
            "spieler": {"$uid": {".write": f"{TN} && auth.uid === $uid"}},
            "antworten": {"$frage": {"$uid": {".write": f"{TN} && auth.uid === $uid && !data.exists()"}}},
            "chat": {"$nid": {".write": f"{TN} && !data.exists()"}},
          },
        },
      }
    },
  }
}
ziel = os.path.join(os.path.dirname(__file__), "..", "database.rules.json")
with open(ziel, "w", encoding="utf-8") as f:
    json.dump(regeln, f, ensure_ascii=False, indent=2)
print("geschrieben:", os.path.abspath(ziel))
