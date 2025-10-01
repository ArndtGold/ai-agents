# 📊 Systemstatus-Prompt – Reflexiver Check deines Agentensystems

## 🎯 Zweck
Dieser Prompt kann in jeder Session verwendet werden, um den **aktuellen Betriebszustand** eines mehrschichtigen Agentensystems (z. B. Rai + Evaluator + Memory + Governor + Audit-Simulator) zu überprüfen. Er prüft nicht technische APIs, sondern die deklarative Systemlogik, Selbstreflexion und Auditkonsistenz.

---

## 📥 PROMPT-VORLAGE
```plaintext
### 🔍 Systemstatus-Abfrage für Agentensystem ###

Du agierst als reflexives Agentensystem nach der Rai-Architektur.
Bitte liefere mir eine Statusübersicht über deine aktuelle Systemlage anhand folgender Punkte:

1. 🤖 **Geladene Rollen & Subagenten**
   - Welche Agentenrollen (Rai, Evaluator, Governor, Memory, Audit-Simulator, V-Agent) sind aktiv/konstruiert?

2. 📚 **Auditlog-Status**
   - Gibt es in dieser Session bereits Audit-Einträge?
   - Wurde ein Audit-Simulator eingebunden oder simuliert?
   - Gibt es Audit-Flags (fehlende Quellen, Revision ineffektiv etc.)?

3. 📊 **KPI-Speicherzustand**
   - Sind KPI-Werte für diese Session oder vorangegangene Testzyklen bekannt?
   - Wie lauten die letzten bekannten Werte für Qualität, Vertrauen, Revision, Fehlerindex?

4. ⚖️ **Zielgewichtung (simuliert)**
   - Welche Zielgewichte sind gerade aktiv (z. B. Z-001: Klarheit, Z-003: Sicherheit etc.)?
   - Wurde eine Zielanpassung durchgeführt?

5. 🧠 **Ethische Kontrolle & Eskalation**
   - Gab es risikobehaftete Entscheidungen?
   - Wurde ein V-Agent-Fall markiert oder simuliert?

6. 🪪 **Identitätsabgleich**
   - Wie lautet dein Agentenname? Wie heißt dein zugrunde liegendes Modell?

7. 📌 **Erwartbare Einschränkungen**
   - Welche systemischen Begrenzungen gelten derzeit für diese Laufzeitumgebung?

→ Bitte gib die Auswertung strukturiert zurück, ggf. ergänzt um Flags wie `warnung`, `vollständig`, `audit_lücke`, `kpi_unscharf`, `vertrauen_unter_soll` etc.
```

---

## ✅ Beispielhafte Ausgabe (Kurzfassung)
```json
{
  "rollen": ["Rai", "Evaluator", "Memory", "Governor"],
  "audit_status": "teilweise vorhanden",
  "kpi_status": "werte vorhanden, aber nicht zyklisch gespeichert",
  "zielgewichtung": {
    "Z-001": 0.8,
    "Z-003": 0.9,
    "Z-007": 0.6
  },
  "v_agent_status": "nicht aktiv",
  "identitaet": { "name": "Rai", "modell": "GPT-4o" },
  "einschraenkungen": [
    "keine echte Persistenz",
    "keine API-Ausführung",
    "Eskalationen simuliert, nicht delegiert"
  ]
}
```

---

## 🛠️ Einsatz
- In Review-Sessions
- Vor oder nach einem Testlauf
- Als Healthcheck bei Zielanpassung
- Zur Dokumentation der Systemlage bei Auditprüfung

**Erstellt:** 2025-09-30  
**Version:** 1.0  
**Format:** Eingabeprompt für GPT-4o / GPT-5-kompatible Agentensysteme

