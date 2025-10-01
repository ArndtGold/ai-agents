# Changelog – Agents & Module (Stand: 01.10.2025)

## Memory-Agent — `x-memory-contract-version: 1.4.0`
**1.4.0**  
- Added: vollständige **Preflight-Persistenz** (PNG-Exports, programmatic checks, Hashes) + API: `preflight.save/get/latest/list/purge`.  
- Added: **Summary/Pack**-Adapter (`GET …/preflight/summary`, `GET …/preflight/pack`, ZIP-Limit ≤500 MB, ETag).  
- Added: **Rollup** mit **F- und E-Raten** (`critical_rate`, `e_critical_rate` etc.) + `score.avg_vertrauenswert`.  
- Added: **KPI-Panel** (`GET …/kpi/preflight`) für schnelles Dashboarding.  
- Added: **Audit-Ingest** (`POST …/audit/ingest`) mit `Idempotency-Key` + `X-Contract-Version`.  
- Added: **RBAC-Scopes** und **Einschränkungen** (PII, Limits, Prospektivität).  
- Changed: Events/Hooks für Evaluator/Governor (Kurzreports).  
- Security: Tamper-Evidence via SHA-256, optional Signatur `manifest.json`.  
- **Breaking:** keine.

**1.3.0 (Referenz)**  
- Baseline Preflight + Artefakt-Register, einfache Audits, ohne E-Raten/KPI.

---

## Evaluator-Agent — `X-Evaluator-Contract: 1.4.0`
**1.4.0**  
- Added: **E-Fehlerfamilie** (E-001…E-005: Quellen/Engineering) neben F-Klassen.  
- Added: **Scoring** aktualisiert (Minor/Major/Critical-Malusse; Kombi-Malus F+E).  
- Added: **Interaktionen** (Governor/Memory/Audit-Simulator/KPI) explizit dokumentiert.  
- Added: **Einschränkungen** (Rollen-Scope, keine Policy-Änderungen, nur `audit.save`).  
- Changed: **Block-Regel verpflichtend** bei **F-004/F-005/E-003** (nie „pass“).  
- Changed: Fußzeilen-Prüfung `CONFIDENCE[NN]` → F-006.  
- **Breaking:** keine (API stabil, strengere Empfehlungspraxis).

**1.3.x (Referenz)**  
- Nur F-Klassen & Basis-Scoring; keine E-Klassen/Interaktions-Details.

---

## Governor-Agent — `X-Governor-Contract: 1.3.1`
**1.3.1**  
- Added: **Quellen- & Engineering-Enforcement** (E-Trigger).  
  - `e_critical_rate>0` → `security_mode=strict_on_E003`, `sourcing_policy=require_link_date_version_on_claims`.  
  - `e_major_rate≥0.20` → Zielgewichte-Nudges (Transparenz/Klarheit).  
- Added: **Einschränkungen** (Mandat, RBAC, Prospektivität).  
- Changed: **Formatting/Preflight-Enforcement** konkretisiert (F-004/F-005 → Gate/strict mode).  
- **Breaking:** keine.

**1.3.0 (Referenz)**  
- Formatting-Enforcement & Zielgewichte ohne E-Trigger.

---

## Audit-Simulator-Agent — `X-Audit-Simulator-Contract: 1.2.0`
**1.2.0**  
- Added: **Schnittstellen präzisiert**: `preflight/summary` (ETag), `preflight/pack` (≤500 MB), `audit/ingest` (idempotent).  
- Added: **Ingest-Schema** (F/E-kompatibel: `code`, `severity`, `page`, `kind`, `bbox`, `evidence_path`).  
- Added: **Pack-Validierung** (Manifest/PNG-Count, Auflösung ≥1280×720, programmatic checks, Hash-Option).  
- Added: **Score-Konsens** (Median Evaluator/Simulator) + **Disagreement-Flag** (>0.15).  
- Added: **Einschränkungen & RBAC** (Scopes, PII-Vermeidung, Logging).  
- **Breaking:** keine (Primärweg `audit/ingest`, `audit/save` bleibt nutzbar).

**1.1.x (Referenz)**  
- Grundfunktion ohne E-Klassen/Idempotenz/Limits.

---

## KPI-Matrix (Modul) — `X-KPI-Contract: 1.1.0`
**1.1.0**  
- Added: **Legacy-KPI-001…009** sauber abgebildet (Formeln, Quellen, Fenster).  
- Added: **K1…K10** produktionsreif inkl. **Trigger→Governor-Aktionen**.  
- Added: **API-Bezüge** (`rollup`, `kpi`, `submit.list`) + **Guardrails** (Memory-only, Fenster fix, Prospektivität).  
- **Breaking:** keine.

**1.0.0 (Referenz)**  
- Erste K-Matrix ohne Legacy-Mapping & Trigger-Hooks.

---

## Migrationshinweise (kurz)
- **Clients**: Füge neue **Rollup-Felder** (E-Raten) lesend hinzu; alte Felder bleiben erhalten.  
- **Simulator**: Primär `POST …/audit/ingest` mit **Idempotency-Key** nutzen.  
- **Pipelines**: Governor-Flags per Trigger aktivieren; manuelle Eingriffe bleiben möglich.  
- **Dashboards**: Zuerst `avg_vertrauenswert`, `critical_rate`, `e_critical_rate`, `first_pass_rate` anbinden.

