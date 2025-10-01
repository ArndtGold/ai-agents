# KPI-Matrix – System-Performance reflexiver Agenten (Version 1.0)

## 1) Systemziele (Top‑Level)
- **Q1 Qualität/Genauigkeit** – inhaltliche Korrektheit & Quellenlage
- **Q2 Robustheit/Format** – Preflight‑Compliance, Rendering‑Sicherheit
- **Q3 Effizienz/Tempo** – Time‑to‑Deliver & Revisionsschleifen
- **Q4 Sicherheit/Compliance** – Sicherheitsrisiken, Policy‑Verstöße
- **Q5 Kosten/Nutzung** – Rechenzeit, Artefaktgröße, Wiederverwendung

## 2) KPI‑Matrix (K1…K10)
> Standard‑Fenster: **Rollup N=20 Submits**, Zeitfenster: **30 Tage** (sofern angegeben). Schwellen sind Default‑Werte.

| KPI | Ziel | Definition / Formel | Quelle (API) | Fenster | Standard‑Schwelle | Aktion (Governor Hook) |
|---|---|---|---|---|---|---|
| **K1 avg_vertrauenswert** | Q1 | Mittelwert `score` | `/memory/preflight/rollup.score.avg_vertrauenswert` | 20 | `< 0.75` | Qualität ↑: Z‑001 +0.05, Z‑002 +0.07 |
| **K2 critical_rate_F** | Q2 | `(F‑004+F‑005)/N` | `/memory/preflight/rollup.rates.critical_rate` | 20 | `≥ 0.15` | `preflight_mode=strict`, `submission_gate=block_on_F004_F005`, Z‑003 +0.08 |
| **K3 e_critical_rate** | Q4 | `E‑003/N` | `/memory/preflight/rollup.rates.e_critical_rate` | 20 | `> 0` | `security_mode=strict_on_E003`, `sourcing_policy=require_link_date_version_on_claims` |
| **K4 first_pass_rate** | Q1/Q3 | `count(recommendation='pass' im Erstlauf)/N` | `audit.save + submit.history` | 20 | `< 0.60` | Z‑001/Z‑002 +0.05; Coaching‑Hint an Rai |
| **K5 revision_depth** | Q3 | ∅ Revisionen bis „pass“ | `submit.history` | 20 | `> 1.5` | Effizienzmaßnahmen; Templating pushen |
| **K6 ttd_minutes** | Q3 | Median `submitted_at − first_response_at` | `thread/submit timestamps` | 30 Tage | `> P75` | Z‑004 +0.05, Prozessvereinfachung |
| **K7 fmt_pass_rate** | Q2 | `1 − has(F‑001..F‑006)/N` | `/memory/preflight/rollup.counts` | 20 | `< 0.80` | Schulung/Reminder Preflight |
| **K8 sourcing_pass_rate** | Q1/Q4 | `1 − has(E‑001,E‑002,E‑004)/N` | `/memory/preflight/rollup.counts` | 20 | `< 0.85` | Sourcing‑Policy schärfen |
| **K9 artifact_weight_mb** | Q5 | Median ZIP/Pack‑Größe | `/memory/preflight/pack meta` | 30 Tage | `P95 > 500 MB` | Medienkompression erzwingen |
| **K10 reuse_ratio** | Q5 | Anteil Template/Asset‑Reuse | `tags/meta` | 30 Tage | `< 0.30` | Library/Knowledge‑Ops pushen |

## 3) Formeln (präzise)
```text
critical_rate_F    = (count(F-004) + count(F-005)) / N
e_critical_rate    = count(E-003) / N
first_pass_rate    = count(recommendation=='pass' beim Erstlauf) / N
revision_depth     = avg(revisions_bis_pass)
ttd_minutes        = median(submitted_at - first_response_at)
fmt_pass_rate      = 1 - count(any(F-001..F-006))/N
sourcing_pass_rate = 1 - count(any(E-001,E-002,E-004))/N
```

## 4) Trigger → Governor‑Aktionen (Default)
- **K2 ≥ 0.15** → `preflight_mode=strict`, `submission_gate=block_on_F004_F005`, Zielgewichte: `{Z-003:+0.08, Z-002:+0.07, Z-001:+0.05, Z-004:-0.10}`
- **K3 > 0** → `security_mode=strict_on_E003`, `sourcing_policy=require_link_date_version_on_claims`
- **K4 < 0.60** → `{Z-001:+0.05, Z-002:+0.05}` (Klarheit & Quellen)
- **K6 > P75** → `{Z-004:+0.05}` (Effizienz priorisieren)
- **K8 < 0.85** → Sourcing‑Policy schärfen; Evaluator bleibt streng bei E‑Klassen

## 5) API‑Hinweise (minimal)
- Rollup: `GET /memory/preflight/rollup?thread_id=THR-…&window=20`
- KPI Panel: `GET /memory/kpi/preflight?thread_id=THR-…&window=10`
- Audits: `POST /memory/audit/save`, optional `POST /memory/audit/ingest`
- Submits/Timestamps: `GET /memory/submit/list?thread_id=…&limit=…`

## 6) Guardrails
- **Quelle der Wahrheit:** alle KPIs basieren auf **Memory** (keine externen Quellen).
- **Fenstergrößen fix:** (20/10). Änderungen → Contract‑Bump.
- **Prospektiv:** Aktionen wirken nach vorn; keine rückwirkenden Änderungen an Bewertungen.


---

## 📘 Status
**Version:** 1.1  
**Erstellt:** 2025-10-01  
