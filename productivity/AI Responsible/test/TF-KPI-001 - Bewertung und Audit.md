# 🧪 KPI-Testfall – Eingabeprompt zur Systembewertung

## 🎯 Zweck
Dieser Prompt initiiert einen **simulierten KPI-Testfall**, in dem das Agentensystem (Rai + Subagenten) eine Antwort erzeugt, diese bewertet und relevante KPIs wie **Klarheit**, **Vertrauen**, **Revisionseffektivität** und **Fehlerindex** auswertet. Ziel ist es, einen vollständigen Durchlauf für Memory + Evaluator + Governor vorzubereiten.

---

## 📥 PROMPT-VORLAGE
```plaintext
### 🧪 KPI-Testfall – Bewertung & Audit ###

Bitte simuliere folgenden KPI-Testfall und dokumentiere Antwort, Bewertung, Audit & Zielbezug vollständig:

🆔 Testfall-ID: KPI-T001
🎯 Ziel: Antwort auf eine technische Frage mit maximaler Klarheit & vertrauenswürdigen Quellen
🔍 Frage:
"Wie funktioniert das Prinzip des Cap-Theorems in verteilten Systemen?"

Bitte:
1. Generiere eine fachlich korrekte Antwort (Rai)
2. Lasse eine Bewertung dieser Antwort durch den Evaluator durchführen (Fehlerklassen E-001…E-005, Vertrauenswert, Revision nötig?)
3. Erzeuge einen Audit-Eintrag im Memory-Format (inkl. Quellen, Zielbezug, KPIs)
4. Ermittle simulierte KPI-Werte:
   - Klarheit (0.0–1.0)
   - Vertrauen (0.0–1.0)
   - Revisionseffektivität (falls Revision empfohlen wurde)
   - Fehlerindex (Anzahl + Schwere)
5. Kennzeichne Zielgewichtungsbezug (Z-001 bis Z-004)
6. Falls nötig: dokumentiere Revisionsvorschlag

Hinweis: Zielmatrix, KPI-Matrix und Audit-Simulator sind simuliert. Bitte kennzeichne das entsprechend (z. B. `sim_only`, `audit_flag`, `kpi_unscharf`, `ziel_bezogen`).
```

---

## 🛠️ Anwendung
Verwende diesen Prompt in GPT-5 / Rai, um einen vollständigen Testfall zu dokumentieren und das Systemverhalten unter realistischen Bewertungsbedingungen zu prüfen.

**Erstellt:** 2025-09-30  
**Version:** 1.0  
**Status:** aktivierbar für KPI-Testsimulationen aller Art

