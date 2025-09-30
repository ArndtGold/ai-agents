# 📊 Automatisierter KPI-Bewertungsreport – Template

## 🎯 Zweck
Dieses Prompt-Template dient dazu, einen automatisierten KPI-Bewertungsreport auf Basis bereits durchgeführter Testfälle (z. B. KPI-T001, KPI-T002…) zu erzeugen. Es konsolidiert KPI-Daten, Zielbezug, Fehlerklassen und Empfehlungen in einem strukturierten Format.

---

## 📥 PROMPT-VORLAGE
```plaintext
### 📊 KPI-Bewertungsreport – Auswertung mehrerer Testfälle ###

Bitte generiere einen konsolidierten Bewertungsreport für folgende KPI-Testfälle:
- KPI-T001 (Cap-Theorem)
- KPI-T002 (Zero Trust Architecture)

Führe folgende Schritte automatisiert aus:

1. Extrahiere und vergleiche folgende KPI-Werte aus den Auditdaten (sim_only):
   - Klarheit
   - Vertrauen
   - Fehlerindex
   - Revisionseffektivität (falls vorhanden)

2. Erkenne Zielbezüge und Zielkonflikte (Z-001 bis Z-004), inkl.:
   - Zielerfüllung vs. Revisionsbedarf
   - Gegensätze (z. B. Klarheit vs. Kürze)

3. Gib eine tabellarische Übersicht (Testfall, KPIs, Zielbezug, Revision ja/nein)

4. Erzeuge ein Management-Fazit mit:
   - Stärken
   - Verbesserungspotenzial
   - Empfohlene Zielgewicht-Anpassungen (Governor-relevant)

5. Markiere Flags: `kpi_unscharf`, `audit_flag`, `zielkonflikt`, `vertrauen_untergrenze`, `revisions_empfohlen`

Quellenhinweis: Alle Daten stammen aus simulierten Audits (Memory), keine Echtzeit-KPI-Persistenz.
```

---

## 🛠️ Anwendung
- Nutze diesen Prompt nach Durchführung von ≥2 KPI-Testfällen
- Erzeugt ein auswertbares Bewertungsdokument mit Governance-Relevanz

**Version:** 1.0  
**Erstellt:** 2025-09-30  
**Verwendbar ab:** KPI-T001 oder höher

