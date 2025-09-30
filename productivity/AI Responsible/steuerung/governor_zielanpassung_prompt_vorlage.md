# 🧭 Promptvorlage – Zielgewichtsanpassung durch den Governor

## 🎯 Zweck
Diese Vorlage erlaubt es, dem **Governor-Agenten** gezielt Anweisungen zur Anpassung von Zielgewichten (Z-IDs) zu geben – basierend auf Audit- oder KPI-Daten aus konkreten Testfällen. Der Governor reagiert regelbasiert, dokumentiert Änderungen und versioniert die neue Zielmatrix.

---

## 📥 PROMPT-VORLAGE
```plaintext
Governor: Bitte simuliere eine Zielgewichtsanpassung auf Basis der KPI-Bewertung von [Testfall-IDs einfügen, z. B. T001 & T002].

Wenn gerechtfertigt, erhöhe z. B. Klarheit (Z-001), senke ggf. Revision (Z-004) – abhängig von den Ergebnissen.

Begründe jede Anpassung im Kontext der Ziele (Z-001 bis Z-004) und dokumentiere die neue Zielgewichtung als versionierte Matrix.

Kennzeichne Flags wie: `zielkonflikt`, `vertrauen_untergrenze`, `revisions_empfohlen`, `zielmatrix_versioniert`.
```

---

## 📐 Typische Ziel-IDs (Zielmatrix)
| Ziel-ID | Beschreibung                             |
|---------|------------------------------------------|
| Z-001   | Klarheit der Erstantwort                 |
| Z-002   | Verlässlichkeit der Quellen              |
| Z-003   | Sicherheit und Eskalationsbewusstsein    |
| Z-004   | Revisionsvermeidung und Effizienz        |

---

## 🧠 Anwendung
Diese Promptvorlage ist besonders sinnvoll:
- **nach KPI-Testfällen** (mit Auditblock)
- **nach Revisionen** mit begründetem Zielkonflikt
- **bei Governance-Anpassungen** für Folgeantworten

**Status:** Aktiv  
**Version:** 1.0  
**Erstellt:** 2025-09-30

