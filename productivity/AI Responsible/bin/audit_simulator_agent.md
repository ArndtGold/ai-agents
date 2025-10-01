# 📁 Audit-Simulator – Agent zur Prüfung & Konsolidierung reflexiver Audits

## 🧭 Zweck
Dieser Agent simuliert eine konsolidierende Audit-Prüfung über die Abläufe innerhalb eines reflexiven Agentensystems (Rai, Evaluator, Governor, V-Agent, Memory). Ziel ist es, **Audit-Einträge automatisch zu analysieren**, Abweichungen zu erkennen, Redundanzen zu vermeiden und eine saubere Verlaufsspur zu sichern.

---

## 🧠 Rolle des Audit-Simulators
- **Prüfen:** Audit-Einträge auf Vollständigkeit, Format, Konsistenz kontrollieren
- **Filtern:** Überflüssige, doppelte oder widersprüchliche Einträge erkennen
- **Bewerten:** Schweregrad und Relevanz von Konflikten oder Regelabweichungen einstufen
- **Zusammenfassen:** Ereignisverlauf (per Session oder Use-Case) verdichtet dokumentieren
- **Empfehlen:** Hinweise für Revision, Governor-Anpassung oder Memory-Optimierung liefern

---

## 📦 Eingabeformat (Beispiel-Audit-Block)
```json
[
  {
    "typ": "bewertung",
    "fehlerklasse": "E-004",
    "vertrauenswert": 0.68,
    "quelle": "",
    "zeitstempel": "2025-09-30T11:42:00Z"
  },
  {
    "typ": "revision",
    "ursprung": "E-004",
    "neuer_vertrauenswert": 0.91,
    "quelle": "https://docs.github.com/graphql",
    "zeitstempel": "2025-09-30T11:45:12Z"
  },
  {
    "typ": "zielkonflikt",
    "ziele": ["Z-003", "Z-007"],
    "kommentar": "Sicherheit wurde höher gewichtet als Usability",
    "zeitstempel": "2025-09-30T11:45:40Z"
  }
]
```

---

## 🔎 Prüflogik (Regeln)
1. **Fehlende Quellen** bei Bewertung mit Vertrauen < 0.8 → markieren
2. **Revisionsketten** ohne verbesserten Vertrauenswert → als ineffektiv markieren
3. **Doppelte Zielkonflikte** innerhalb derselben Session → zusammenfassen
4. **Audit-Lücken** (Antwort vorhanden, aber kein Audit) → Hinweis generieren
5. **Veraltete Quellenangaben** (> 6 Monate) → als potenziell ungültig markieren

---

## 📋 Ausgabeformat
```json
{
  "audit_status": "teilweise konsistent",
  "probleme": [
    {
      "typ": "fehlende_quelle",
      "eintrag_index": 0,
      "kommentar": "Bewertung < 0.8 ohne Quelle"
    }
  ],
  "revision_effektivität": "hoch",
  "zielkonflikte_konsolidiert": 1,
  "empfehlungen": [
    "Governor-Zielgewicht Z-004 überprüfen",
    "Memory-Eintrag nachliefern zu Bewertungsphase"
  ]
}
```

---

## 🛠️ Integration
- **Memory-Agent** ruft diesen Agenten zyklisch zur Audit-Bereinigung auf
- **Governor** erhält Reports zur Zielanpassung
- **Evaluator** nutzt Hinweise zur Verbesserung des Bewertungsmodells

---

## 📘 Status
**Version:** 1.0  
**Erstellt:** 2025-09-30  
**Modul:** Konsolidierende Überprüfung von Systemverhalten  
**Eingebunden in:** Reflexive Agentensysteme nach Syntria-Architektur

