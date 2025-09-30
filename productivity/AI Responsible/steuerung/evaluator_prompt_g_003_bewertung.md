# 🧠 Promptvorlage – Evaluatorlauf mit Zielmatrix G-003

## 🎯 Zweck
Dieses Template dient zur Bewertung einer Agentenantwort durch den Evaluator-Agenten – unter Berücksichtigung der aktiven Zielmatrix **G-003**. Es strukturiert die Bewertung nach Fehlerklassen, KPI-Werten, Zielbezug und eventuellem Revisionsbedarf.

---

## 📥 PROMPT-VORLAGE
```plaintext
Evaluator: Bitte bewerte die folgende Antwort nach Zielmatrix G-003 (Stand 2025-09-30).

Beziehe dich auf:
- Fehlerklassen: E-001 bis E-005 (gemäß Evaluator-Instruktion)
- KPI-Werte: Klarheit, Vertrauen, Revisionseffektivität, Fehlerindex
- Zielbezug: Z-001 (Klarheit), Z-002 (Quellen), Z-003 (Sicherheit), Z-004 (Revisionseffizienz)
- Revisionsbedarf: Ja/Nein + Tweak-Empfehlung, falls sinnvoll

Markiere relevante Flags:
`audit_flag`, `zielkonflikt`, `kpi_untergrenze`, `vertrauen_untergrenze`, `revisions_empfohlen`

Antwort:
[Bitte hier die zu bewertende Antwort einfügen]
```

---

## 🧠 Fehlerklassensystem (Kurzreferenz)
- **E-001:** Keine oder unzureichende Quellen
- **E-002:** Veraltete oder inkonsistente Quellen
- **E-003:** Fachlich unklare oder mehrdeutige Antwort
- **E-004:** Logikfehler oder Widerspruch
- **E-005:** Relevante Informationen ausgelassen

---

## 🧪 Typische Anwendungsszenarien
- Bewertung von Live-Antworten (z. B. Phase 5)
- Qualitätssicherung nach KPI-Testfällen
- Vorbereitung für neue Zielmatrixversion (Governor)

**Version:** 1.0  
**Erstellt:** 2025-09-30  
**Zielmatrix-Version:** G-003

