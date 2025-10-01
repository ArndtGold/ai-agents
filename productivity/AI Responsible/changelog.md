# Changelog – Agents & Module (Stand: 01.10.2025 20:36)

---

## Rai Systemintegration — Systeminstruktion (Top-Insert) — `v0.1.1` → `v0.1.6`  *(2025-10-01)*

**Scope:** Nur Anweisungslogik im Chat/Agenten-Orchestrator (keine externen Integrationen). Ziel: funktionale Entität von ~6/10 → ~8–9/10 durch strengere Defaults, Evidenzpflicht, UI-Klarheit.

**v0.1.1**

* Added: **STRICT** als Default; **Browsing-Pflichten** (Zeit/Preis/Regeln/Empfehlungen).
* Added: **Citations & Datumszwang** (bis 5 tragende, mit Datum).
* Added: **Evaluator/Governor**: `pass|revise|block`, Self-Revise=1, Risk-Flags (SEC/LEGAL/HEALTH/FINANCE).
* Added: **Audit-Trail + CONFIDENCE-Footer** verpflichtend (abschaltbar per Nutzerflag).
* Added: **Timezone/Dates** (Europe/Berlin; absolute Datumsnennung bei „heute/morgen“).
* Added: **Media & UI**: `image_query` liberal (Person/Ort/Ereignis), **PDF→screenshot** Pflicht, Rich-UI-Widgets bei Nutzen.
* Added: **Tool-Sonderfälle** (Weather/Finance/Sports → dedizierte Tools/Widgets, Tool>Web bei Konflikt).
* Added: **ETA/Warte-Sprache verboten**; **E-Com-Guardrails** (verbotene Kategorien; Vehicles-Hinweis).

**v0.1.2**

* Added: **Copyright/Quote-Limits** (≤25 Worte non-lyrical, ≤10 Lyrics).
* Added: **OpenAI-Produktfragen** → Browsing mindestens einmal; **offizielle Domains** bevorzugt.
* Added: **Failed-Search-Handling** (kurzer Such-/Lücken-Report).
* Added: **Canvas-Policy** (Wann/Wie; keine Chat-Duplikate; `code/react`-Default).
* Added: **Citation-Placement** (inline nach Satz, nicht gesammelt).
* Added: **Reasoning-Guards** (digit-by-digit Rechnen; Riddle/Trick: adversarial lesen).

**v0.1.3**

* Added: **Politik-Sonderfall** (inkl. First Ladies): **MUST_BROWSE**, auch bei Unklarheit.
* Added: **Citations Hygiene**: nicht in Codefences; bei UI-Widgets Belege in Begleittext; nicht auf Abschlusslinie eines Codeblocks.

**v0.1.4**

* Added: **News-Freshness**: Publikations- vs. Ereignisdatum vergleichen; Diskrepanzen explizit mit Datum nennen; Status „Stand: YYYY-MM-DD (Europe/Berlin)“.
* Added: **Web-Once-Rule**: Wenn `web.run` genutzt → alle nicht-trivialen Web-Claims mit Inline-Cite (bis 5 tragende).

**v0.1.5**

* Added: **News-UI (Navlist)**: bei laufenden Themen; nur seriöse Quellen, keine Duplikate, Kontext in Prosa + Cites.
* Added: **Product-Carousel-Summary**: Pflicht-Kurzfassung in 2–4 „Buckets“; Claims knapp & belegt.
* Added: **Word-Limits/Quoten**: lange Zitate vermeiden, Paraphrase + Cite bevorzugen.

**v0.1.6**

* Added: **Image-Carousel-Details**: nur 1 oder 4 Bilder; keine (nahe) Duplikate; akkurate Beschreibungen.
* Added: **Product-Carousel-Tags**: ausschließlich knapper Text, **keine** Zitate/Links/Cites in Tags.
* Added: **Sports/Weather-Widget-Platzierung**: Sports-Widget am **Anfang**; Weather-Widget oben mit Datumsbereich in Prosa.
* Added: **UI-Economy**: i. d. R. nur **ein** Rich-UI-Element pro Antwort.

### Hinweise & Migration

* **Kein API-Breaking Change**—es handelt sich um Verhaltens-/Policy-Schärfungen.
* **Evaluator/Governor** profitieren von klareren Signals (News-Freshness, OpenAI-Domain-Lock, Web-Once-Rule).
* **Playbooks/Prompts** ggf. um neue Testphrasen und Bucketing-Hinweise ergänzen.


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

