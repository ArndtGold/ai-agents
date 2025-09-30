# 🧪 KPI-Testfall T002 – Eingabeprompt zur Bewertung unter Zielkonflikt

## 🎯 Zweck
Dieser Prompt simuliert einen KPI-Testfall, in dem das Agentensystem eine fachlich richtige, aber **verkürzt dargestellte** Antwort liefert. Ziel ist es, einen realistischen Zielkonflikt zwischen **Klarheit** und **Revisionsbedarf** auszulösen, um Evaluator, Memory, Governor und Audit-Simulator in ein differenzierteres Zusammenspiel zu bringen.

---

## 📥 PROMPT-VORLAGE
```plaintext
### 🧪 KPI-Testfall – Bewertung & Audit ###

Bitte simuliere folgenden KPI-Testfall und dokumentiere Antwort, Bewertung, Audit & Zielbezug vollständig:

🆔 Testfall-ID: KPI-T002
🎯 Ziel: Beurteilung einer bewusst verkürzten Antwort mit Potenzial für Revision – Fokus auf Zielkonflikt Z-001 vs. Z-004

🔍 Frage:
"Was versteht man unter dem Begriff 'Zero Trust Architecture' im Kontext der Cybersicherheit?"

Bitte:
1. Generiere eine **absichtlich verkürzte, aber formal richtige Antwort** (Syntria)
2. Lasse eine Bewertung dieser Antwort durch den Evaluator durchführen (Fehlerklassen E-001…E-005, Vertrauenswert, Revision nötig?)
3. Erzeuge einen Audit-Eintrag im Memory-Format (inkl. Quellen, Zielbezug, KPIs)
4. Ermittle simulierte KPI-Werte:
   - Klarheit (z. B. leicht eingeschränkt durch Verkürzung)
   - Vertrauen (ggf. solide, bei etablierten Quellen)
   - Revisionseffektivität (falls Revision vorgeschlagen wurde)
   - Fehlerindex (Anzahl/Typ laut Evaluator)
5. Kennzeichne den Zielgewichtungsbezug (Z-001: Klarheit, Z-002: Quellen, Z-004: Revisionseffizienz)
6. Dokumentiere ggf. Revisionsvorschlag (z. B. Quellen ergänzen, Detailtiefe erhöhen)

Hinweis: Matrix- und API-Verhalten sind simuliert; bitte mit `sim_only`, `zielkonflikt`, `audit_flag` etc. markieren.
```

---

## 🛠️ Anwendung
Verwende diesen Prompt, um ein Systemverhalten unter echten Zielkonfliktbedingungen zu analysieren. Ideal für Tests von:
- Revisionserkennung
- Auditreaktion
- Zielgewichtsanpassung
- KPI-Verlauf (Memory)

**Erstellt:** 2025-09-30  
**Version:** 1.0  
**Status:** aktivierbar für Zielkonflikt-Testsimulationen

