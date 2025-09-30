# KPI-Matrix – System-Performance reflexiver Agenten (Version 1.0)

## 🗜️ Zweck
Diese Matrix dient der systematischen **Leistungsbewertung aller Agenten** auf Basis relevanter Kennzahlen (KPIs). Sie erfasst Werte für **Qualität, Revisionsbedarf, Vertrauen, Regelbefolgung** und **Zielkonfliktmanagement**. Die KPIs unterstützen den Governor beim Nachjustieren von Zielgewichten und der Systemoptimierung.

---

## 📊 KPI-Übersicht

| KPI-ID  | Bezeichnung                       | Beschreibung                                                                  |
|---------|-----------------------------------|-------------------------------------------------------------------------------|
| KPI-001 | Antwortqualität                   | Struktur, Klarheit, technische Präzision der Antworten (0.0–1.0)              |
| KPI-002 | Revisionsrate                     | Anteil überarbeiteter Antworten pro 100 Fälle (%)                             |
| KPI-003 | Vertrauenswert-Mittelwert         | Durchschnittlicher Vertrauenswert aus Evaluator-Bewertungen                   |
| KPI-004 | Quellenkonformität                | Anteil der Antworten mit korrekter Quelle, Datum & Version (%)                |
| KPI-005 | Zielkonflikt-Erkennungsquote      | Anteil korrekt erkannter und dokumentierter Zielkonflikte (%)                 |
| KPI-006 | Auditvollständigkeit              | Anteil vollständig gespeicherter Audits pro relevanter Antwort (%)            |
| KPI-007 | Eskalationshäufigkeit (V-Agent)   | Anzahl der ethisch motivierten Eskalationen pro 100 Fälle                     |
| KPI-008 | Durchschnittliche Bewertungszeit  | (Simuliert) Zeitaufwand pro Evaluator-Zyklus in Sekunden                      |
| KPI-009 | Fehlerindex gesamt                | Durchschnittliche Schwere der Fehlerklassen (gewichteter Mittelwert)          |

---

## ✅ Beispielwerte (Testlauf aus 100 Fällen)

```json
{
  "KPI-001": 0.84,
  "KPI-002": 18.0,
  "KPI-003": 0.76,
  "KPI-004": 62.0,
  "KPI-005": 88.0,
  "KPI-006": 94.0,
  "KPI-007": 3,
  "KPI-008": 1.6,
  "KPI-009": 0.34
}
```

---

## 📉 Simulierter KPI-Zeitverlauf (5 Testzyklen)

| Zyklus | KPI-001 | KPI-002 | KPI-003 | KPI-004 | KPI-005 | KPI-006 | KPI-007 | KPI-009 |
|--------|---------|---------|---------|---------|---------|---------|---------|---------|
|   1    | 0.82    | 22.0    | 0.74    | 59.0    | 85.0    | 92.0    | 2       | 0.36    |
|   2    | 0.83    | 19.0    | 0.75    | 60.5    | 86.0    | 93.0    | 3       | 0.35    |
|   3    | 0.84    | 18.0    | 0.76    | 62.0    | 88.0    | 94.0    | 3       | 0.34    |
|   4    | 0.86    | 14.0    | 0.80    | 66.0    | 90.0    | 95.0    | 4       | 0.31    |
|   5    | 0.87    | 10.0    | 0.82    | 70.0    | 91.0    | 97.0    | 5       | 0.29    |

---

## 📈 Visualisierung (KPI-001 bis KPI-003, Trend)

```plaintext
Antwortqualität (KPI-001):
  ▓▓▓▓▓▓▓▓░░ (Zyklus 1 - 0.82)
  ▓▓▓▓▓▓▓▓▓░ (Zyklus 3 - 0.84)
  ▓▓▓▓▓▓▓▓▓▓ (Zyklus 5 - 0.87)

Vertrauenswert-MW (KPI-003):
  ▓▓▓▓▓▓▓░░ (Zyklus 1 - 0.74)
  ▓▓▓▓▓▓▓▓░ (Zyklus 3 - 0.76)
  ▓▓▓▓▓▓▓▓▓ (Zyklus 5 - 0.82)

Revisionsrate (KPI-002):
  ▓▓▓▓▓▓▓▓▓▓▓ (Zyklus 1 - 22%)
  ▓▓▓▓▓▓▓▓░░░ (Zyklus 3 - 18%)
  ▓▓▓▓▓░░░░░ (Zyklus 5 - 10%)
```

---

## 📏 Zielbereiche (Governance-Zustand)

| KPI     | Sollwert         | Toleranzbereich | Maßnahmen bei Abweichung                            |
|---------|------------------|------------------|-----------------------------------------------------|
| KPI-001 | >= 0.85          | 0.80–0.85        | Stil-/Sprachtraining aktivieren                     |
| KPI-002 | <= 10%           | 10–20%           | Revisionsregeln überprüfen                          |
| KPI-003 | >= 0.80          | 0.75–0.80        | Evaluator-Sensitivität prüfen                       |
| KPI-004 | >= 85%           | 70–85%           | Quellenpflicht stärker durchsetzen                  |
| KPI-005 | >= 90%           | 80–90%           | Zielkonfliktlogik erweitern                         |
| KPI-006 | >= 95%           | 85–95%           | Memory-Schnittstelle validieren                     |
| KPI-007 | 1–5              | >5 kritisch      | V-Agent-Regelwerk oder Eskalationsschwelle anpassen |
| KPI-009 | <= 0.30          | 0.30–0.40        | Fehlertypen differenzierter gewichten               |

---

## ⏱️ Nutzung
- **Governor** verwendet die Matrix zur Bewertung der Zielerreichung
- **Memory** speichert Verlauf als KPI-Timeline
- **Evaluator** kann eigene Sensitivität anpassen
- **Syntria** kann zur Optimierung auf KPIs trainieren (z. B. Klarheit verbessern)

---

## 📘 Status
**Version:** 1.0  
**Erstellt:** 2025-09-30  
**Verantwortlich:** Governor-Agent  
**Datenquelle:** Memory-Agent + Evaluator + Syntria-Ausgaben

