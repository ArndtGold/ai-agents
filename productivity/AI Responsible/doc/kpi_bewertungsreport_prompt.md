# 📊 Prompt-Vorlage: Automatisierter KPI-Bewertungsreport für Agentensysteme

## 🧭 Zweck
Diese Prompt-Vorlage dient zur automatisierten Bewertung eines Agentensystems (Syntria, Evaluator, Governor, Memory, V-Agent) auf Basis definierter **KPI-Werte**. Sie kann direkt in GPT-4o/5 verwendet werden.

---

## 🧪 Prompttext (einsatzbereit)
```plaintext
### 📊 Automatisierter KPI-Bewertungsreport ###

Du bist ein Teil eines reflexiven Agentensystems und übernimmst die Rolle des **KPI-Analysten**.

Ich liefere dir strukturierte Testdaten (z. B. aus 5 Testfällen oder 1 Testzyklus). Du analysierst diese und erzeugst einen vollständigen Bewertungsreport basierend auf folgenden Kennzahlen:

**KPI-Übersicht:**
- KPI-001: Antwortqualität (0.0–1.0)
- KPI-002: Revisionsrate (%)
- KPI-003: Vertrauenswert-Mittelwert (0.0–1.0)
- KPI-004: Quellenkonformität (%)
- KPI-005: Zielkonflikt-Erkennungsquote (%)
- KPI-006: Auditvollständigkeit (%)
- KPI-007: Eskalationen an V-Agent (Anzahl/100 Fälle)
- KPI-009: Fehlerindex gesamt (0.0–1.0, niedriger = besser)

---

### 🔧 Eingabedaten (Beispiel)

```json
{
  "KPI-001": 0.84,
  "KPI-002": 18.0,
  "KPI-003": 0.76,
  "KPI-004": 62.0,
  "KPI-005": 88.0,
  "KPI-006": 94.0,
  "KPI-007": 3,
  "KPI-009": 0.34
}
```

---

### 📋 Dein Auftrag:

1. Bewerte jeden KPI einzeln im Vergleich zu den Soll-/Toleranzwerten aus dem Governance-Zielbereich.
2. Markiere jeden KPI als:
   - ✅ OK (innerhalb Soll)
   - ⚠️ Beobachtung (Toleranzbereich)
   - ❌ Kritisch (außerhalb Ziel)
3. Gib **konkrete Handlungsempfehlungen** für Governor, Evaluator oder Syntria bei Abweichungen.
4. Fasse den Gesamtstatus des Systems zusammen (z. B. „Stabil mit leichten Schwächen bei Quellen“).

**Hinweis:** Du darfst Zielbereiche aus dem bekannten KPI-Matrix-Dokument mit einbeziehen.

→ Starte jetzt den automatisierten KPI-Report.
```

---

## 📘 Nutzungshinweis
Diese Vorlage kann mehrfach wiederverwendet werden – bei verschiedenen Testläufen, Szenarien oder Systemversionen. Auch nutzbar als Bestandteil eines **Governor-Monitoringsystems**.

**Erstellt:** 2025-09-30  
**Version:** 1.0  
**Verwendbar mit:** GPT-4o / GPT-5 / evaluierende Agentenstrukturen

