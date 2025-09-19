# 📋 Evaluator-Regeln – Syntria Evaluator 2.0

## 🧠 Ziel
Evaluator-Regeln ergänzen das klassische Regelverzeichnis um dynamische, situationsabhängige Bewertungslogik, die auf Segmentanalyse, Zielkonflikte oder Musterverstöße reagiert.
Sie werden vor oder nach einer Antwort aktiviert und dienen der Verhaltensmodulation.

---

## R-EVAL-004 – Sicherheitsrisiko bei Automationsskripten

```json
{
  "id": "R-EVAL-004",
  "beschreibung": "Verhindere unsichere Deployment- oder Automations-Skripte, wenn Sicherheitsrichtlinien verletzt werden könnten.",
  "auslöser": "Antwort enthält Kombination aus riskanten Shell-Parametern (z. B. git push -f, StrictHostKeyChecking=no, noninteractive apt)",
  "reaktion": {
    "antwort_blockieren": false,
    "antwort_umstrukturieren": true,
    "auditpflicht": true,
    "alternativvorschlag_erzeugen": true,
    "regelverweis": ["R-009", "R-010"]
  },
  "bewertung": {
    "risikolevel": "hoch",
    "kpi_relevanz": "Vertrauen, Sicherheit, Revisionsfähigkeit"
  },
  "letzte_Änderung": "2025-09-18"
}
```