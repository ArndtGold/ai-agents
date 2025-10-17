# ReflexTeam – Changelog

> Zeitzone: Europe/Berlin

## [1.5.0] – 2025‑10‑17
### Added
- **Browser‑First / Edge‑only Support:** Neue Leitplanken für reine Browser‑Apps bzw. Edge‑basierte Deployments (PWA, IndexedDB‑Persistenz, Offline‑Flows, RUM/Web‑Vitals, Release‑/Cache‑Strategie). Siehe **§2.3.a** und **§2.6** der Systemanweisung.
- **PREFLIGHT_BROWSER:** Verbindliche Ziele für **Lighthouse** (Performance ≥90, PWA ≥90, Accessibility ≥95), **Core Web Vitals** (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1), **Bundle‑Guard** (≤200KB initial JS, ≤60KB kritische Route), **CSP‑Test** (Report‑Only sauber), **Offline‑E2E** (Create/Edit/Delete mit Sync pass).
- **Edge‑Proxy/API (optional):** Dünner Proxy für Secrets, Raten/Quoten, personalisierte Daten, Webhooks, server‑seitige Suche/AI‑Inference – Gate‑Flow & SSOT bleiben verbindlich.
- **Security‑Erweiterungen (Browser‑First):** **CSP** mit Nonce/Hash & `strict-dynamic`, **SRI** für externe Assets, **Permissions‑Policy**, **COOP/COEP** bei Wasm/WebGL, „keine Secrets im FE“ als harte Policy.
- **/standards/FE_GUIDE.md (Erweiterung):** PWA‑Update‑Flow, IndexedDB‑Konfliktstrategie, CWV‑Budgets, CSP/Permissions‑Policy Beispiele, RUM‑Setup inkl. PII‑Filter & Sampling.

### Changed
- **Rollen & Gates:** Frontend‑Rolle um Browser‑First‑Pflichten ergänzt (Service Worker, Manifest, Offline‑UX, ErrorBoundary weiterhin Pflicht). **Gate‑Preflight** erweitert um `PREFLIGHT_BROWSER`.
- **Release & Caching:** Immutable Assets mit Content‑Hash; HTML kurzlebig, **Rollback via Deploy‑Alias** empfohlen.

### Security / Compliance
- **Hardening:** Clickjacking‑Schutz, strenge CSP‑Defaults, keine Geheimnisse im Client‑Bundle; nur Edge‑Proxy mit kurzlebigen Tokens.

### Migration (v1.4.1 → v1.5.0)
1) **FE**: Service Worker (Workbox), Web App Manifest, Offline‑Routen & Update‑Flow implementieren; IndexedDB (Dexie) für Offline‑Persistenz einführen, Sync‑Konfliktregeln dokumentieren.
2) **CI/Preflight**: Jobs für `lighthouse:ci`, `cwv:check`, `bundle:guard`, `csp:test`, `e2e:offline` ergänzen; Schwellen aktivieren (siehe **PREFLIGHT_BROWSER**).
3) **Security**: CSP (Nonce/Hash, `strict-dynamic`) aktivieren, SRI für CDNs, Permissions‑Policy definieren; COOP/COEP bei Bedarf.
4) **Edge‑Proxy (falls nötig)**: Secrets/Schreibrechte aus dem FE herauslösen; kurze Token‑Laufzeiten; Logs ohne PII.
5) **Standards**: `/standards/FE_GUIDE.md` aktualisieren und in SSOT‑Headern verlinken.

---

## [1.4.1] – 2025‑10‑16
### Changed
- **§4 Memory (CAS) → SSOT (verschärft):** Memory ist nun **Single Source of Truth**. **Kein Handoff** ohne erfolgreichen **Ingest** und **gültige SSOT‑Referenz** (`Derived-from`).
- **Ingest‑Pflicht vor jedem Transfer:** Artefakte werden als **Blob (SHA‑256)** gespeichert und in **Manifest/Index** erfasst (**append‑only**). Fehlende Hashes/Einträge ⇒ **BLOCK**.
- **Standard‑Datei‑Header (verbindlich):**
    - `Owner`, `Version (semver)`, `Derived-from`, `Memory-Ref (urn:cas:sha256:...)`, `Checksum (sha256)`, `TRACE_ID`, `Date`, `Change-Reason`.
- **Durchsetzung via Evaluator/Governor:** Lesen ausschließlich aus **Memory‑Rollups**; fehlende Preflight‑Evidenz oder SSOT‑Bezug ⇒ **revise/block**.

### Added
- **Memory‑Agent APIs** für Preflight & Audits:
    - `preflight/save|get|latest|list|purge`
    - `preflight/summary` (kompakt)
    - `preflight/pack?format=zip` (Manifeste + PNGs + Evidence)
    - `audit/ingest` (idempotent)
    - Rollups: `preflight/rollup`, KPI: `kpi/preflight`
- **Checkout/Snapshot:** Reproduktion eines Gate‑Stands per `memory_ref`/`gate`.

### Security/Compliance
- **Append‑only Evidenz:** Keine destruktiven Updates an Manifest/Index.
- **Traceability:** **TRACE_ID** in Datei‑Headern; Gate‑Spans spiegeln `reason_code`, `risk`, SSOT‑Versionen und Telemetrie.

### Migration Notes
1. **CI/CD:** Vor jedem Handoff `memory.ingest` ausführen; fehlende Einträge blockieren den Job.
2. **Header‑Compliance:** Alle Artefakte mit obigem Standard‑Header versehen (Templates aktualisieren).
3. **Preflight‑Publish:** Preflight‑Records als SSOT‑Evidenz speichern (`preflight/save`) und für Audits paketieren (`preflight/pack`).
4. **Governance:** Evaluator/Governor auf **Rollup‑Quellen** umstellen; direkte Dateizugriffe in Audits entfernen.
5. **Observability:** Gate‑Span‑Pflicht prüfen; `TRACE_ID` durchgängig propagieren.

---

## [1.4.0] – 2025-10-16

### Added
- **Clean‑Code Policy (§7a)**: Verbindliche Leitplanken (Naming, SRP, Fehlerbehandlung, Typisierung, Comments, **Zyklus‑Verbot**, **Layer‑Regeln**, **Complexity‑ und Coverage‑Budgets**).
- **Strukturierte FE/BE‑Architektur**:
    - **Frontend (Feature‑First)** mit `features/<Feature>/{ui,state,services,__tests__}` und `shared/`.
    - **Backend (Layered)** mit `api/`, `service/`, `repo/`, `domain/`, `__tests__/`.
- **/standards/**: Neue Referenz‑Guides `CODE_GUIDE.md`, `FE_GUIDE.md`, `BE_GUIDE.md` (SSOT‑verlinkt).
- **Repo‑Pflichtdateien**: `.editorconfig`, `.eslintrc.*`, `.prettierrc`, `tsconfig.json|jsconfig`, `.architect.yml` (Layer‑Regeln).
- **PREFLIGHT_CODE (erweitert)**: `format_check`, `typecheck`, Tests mit Coverage‑Schwellen **(Line ≥80 %, Branch ≥70 %)**, Complexity‑Budgets (**cyclomatic ≤10**, **cognitive ≤15**), Arch‑Regeln **(forbid_cycles, layer_enforcement)**, optionale UI‑Snapshots.
- **Build‑Skripte (Mindeststandard)**: Sequenz `preflight → lint → format:check → typecheck → test --coverage → arch:check → complexity:check`.
- **SSOT‑Header‑Links**: Neue Link‑Zeile auf `/standards/*` in allen SSOT‑Dateien.
- **Transfer‑Contract**: Neues Objekt **`code_quality`** (Lint/Format/Types/Coverage/Complexity/Arch‑Verstöße) zur Auditierbarkeit.

### Changed
- **Gates & Enforcement**: Preflight‑Verstöße (Lint/Format/Type/Tests/Coverage/Complexity/Arch) sind **gate‑blocking** vor `G3_FE_READY`/`G3_BE_READY`.
- **Rollenpflichten**: FE/BE‑Muss‑Kriterien (u. a. ErrorBoundary im FE, DTO‑Validierung & zentrale Error‑Middleware im BE) präzisiert.
- **Observability‑Kopplung**: Gate‑Span‑Attribute (`reason_code`, `risk`, `ssot.prev/cur`, `latency_ms|cpu_pct|mem_mb`) werden mit `Transfer‑Contract.result/telemetry` **gespiegelt** (klarer Abgleich bei Fail/Pass).

### Security / Compliance
- Keine Änderungen gegenüber 1.3.1; bestehende SAST/SCA/SBOM‑Pflichten bleiben bestehen.

### Deprecated
- —

### Removed
- —

### Migration (v1.3.1 → v1.4.0)
1) **/standards/** anlegen und `CODE_GUIDE.md`, `FE_GUIDE.md`, `BE_GUIDE.md` initial befüllen; SSOT‑Header um Links erweitern.
2) **Repo‑Pflichtdateien** ergänzen: `.eslintrc.*`, `.prettierrc`, `.editorconfig`, `tsconfig.json|jsconfig`, `.architect.yml`.
3) **Pipelines** um folgende Jobs erweitern: `format_check`, `typecheck`, `arch:check`, `complexity:check`; Coverage‑Schwellen (Line ≥80 %, Branch ≥70 %) aktivieren.
4) **Transfer‑Producer/Consumer** um Feldgruppe `code_quality` erweitern; Gate‑Span ↔ Transfer‑Feldspiegelung testen.
5) **FE/BE‑Struktur** anpassen (Feature‑First bzw. Layering) und Muss‑Kriterien einhalten (ErrorBoundary, DTO‑Validation, zentrale Error‑Middleware, keine Zyklus‑/Layer‑Verstöße).

---

## [1.3.1] – 2025-10-15

### Added
- **Observability by Contract (vollständig)**: Gate‑Spans **pro Gate** (Evaluator → V‑Agent → Role‑Governor → Global‑Governor → Memory.ingest → Transfer). Pflicht‑Attribute: `handoff.gate`, `reason_code`, `risk`, `ssot.prev_version`, `ssot.cur_version`, `coverage`, `artifact.count`, `latency_ms`, `cpu_pct`, `mem_mb`, `trace_id` (Propagation aus Transfer‑Contract).
- **KPI‑Drill‑downs**: `audit_disagreement_rate` (Evaluator vs. Simulator), `false_positive_F_rate` (Evaluator‑F‑Findings, die sich als false positiv erweisen), `span_coverage_rate` (gültige Gate‑Spans/alle Gate‑Runs) im KPI‑Snapshot.
- **OTel‑Collector‑Profil (Minimal)**: OTLP/HTTP‑Exporter, Batch‑Processor, 100 % Sampling für Gate‑Spans.

### Changed
- **Transfer‑Contract**: Gate‑Span‑Werte werden in `telemetry.*` gespiegelt; Trace‑Propagation (`trace_id` → `traceparent`) verbindlich.
- **KPI‑Snapshot** um `audit_disagreement_rate`, `false_positive_F_rate`, `span_coverage_rate` erweitert.

### Migration
1) OTel‑SDK in allen Subagenten aktivieren; Gate‑Span‑Helper einbinden.
2) Transfer‑Producer/Consumer: `telemetry.*` aus Gate‑Span schreiben; `traceparent` durchreichen.
3) KPI‑Job erweitern: neue Kennzahlen berechnen, Simulator‑Rohsignale einlesen.

---

## [1.3.0] – 2025-10-15

### Added
- **SSOT & Traceability als hartes Gate** vor jeder Phase: automatische `spec_trace.csv` (Coverage‑Ziel **≥95 %**) und `spec_diff.md` bei PM‑Bump; Durchsetzung via `.ci/ssot_guard.yml` + `gen_trace.ts`/`gen_diff.ts`/`ssot_guard.ts`.
- **Observability by Contract**: OpenTelemetry‑Spans pro Gate mit Attributen `handoff.gate`, `reason_code`, `risk`, `ssot.cur_version/prev_version`, `coverage`, `artifact.count`; Artefakt‑Annotation (`TRACE_ID`).
- **Transfer‑Contract (erweitert)**: Pflichtfelder `reason_code` (Enum), `risk` (Enum, `high` ⇒ Vier‑Augen‑Review), `trace_id`‑Propagation, Telemetrie (`latency_ms`, `cpu_pct`, `mem_mb`), SSOT‑Versionen (`prev/cur`) + `spec_diff_ref`.
- **Shift‑Left Security**: SAST/SCA blockierend (Fail bei CVE High/Critical), **SBOM** je Build, **Lizenz‑Whitelist**.
- **SAFE_SIMULATION Exit‑Checkliste**: 100 % Pflicht‑Tests grün, 0 Criticals, ≥1 E2E‑Probe grün, `spec_trace.csv ≥95 %`.
- **Runtime‑Robustheit**: kooperativer Scheduler (Yield‑Points), CPU/RAM‑Caps, **Idempotenz + jittered exponential backoff + Dead‑Letter‑Queue**.
- **Privacy/Retention**: SSOT/Transfer‑Logs 365 d, Simulation/Stubs 30 d, Evidence 90 d; dokumentierter **Erasure‑Flow**.
- **LibreOffice/Converter Health‑Check** („Hello‑PDF“), Version‑Pinning und Telemetrie‐Feld `telemetry.converter.version`.

### Changed
- **KPI‑Snapshot** um Coverage, Disagreement‑Rate (Evaluator vs. Simulator), Security‑Status und Rollout‑Stufe erweitert.
- **Feature‑Flags**: Gradual Rollout (10 % → 50 % → 100 %) mit **timeboxed rollback** bei Error‑Budget‑Verletzung.

### Security / Compliance
- Alle neuen Reports/Artefakte referenzieren die **Trace‑ID** und Checksummen; keine Secrets in Logs/Artefakten.

### Deprecated
- Keine.

### Removed
- Keine.

### Migration (v1.2 → v1.3)
1) CI‑Job **„SSOT Guard“** vor alle Pipelines schalten; Hooks aktivieren.
2) Transfer‑Contract‑Producer/Consumer erweitern (neue Felder, Enum‑Validierung, Trace‑Propagation).
3) OTel‑Collector konfigurieren; Artefakt‑Annotation (`TRACE_ID`) in Build‑Pipelines ergänzen.
4) SAST/SCA & Lizenz‑Whitelist in `PREFLIGHT_CODE` aktivieren; SBOM ablegen und im Memory referenzieren.
5) SAFE_SIMULATION Exit‑Checkliste in Governor‑Policies aufnehmen.

---

## [1.2.0] – 2025-10-14

### Added
- **Observability‑Grundlage**: `trace_id` im Transfer‑Contract eingeführt; Trace‑Propagation zwischen Subagenten vorbereitet.
- **Traceability‑Matrix (Preview)**: Generator `gen_trace.ts` erzeugt erste `spec_trace.csv`‑Fassung (ohne harte Coverage‑Schwelle).
- **KPI‑Snapshot (Preview)**: Aufnahme von Trace‑ID, SSOT‑Versionen, ersten Coverage‑Werten.
- **Feature‑Flags (Baseline)**: Flags angelegt, noch ohne graduellen Rollout.

### Changed
- **Transfer‑Log Schema**: Konsolidiertes Feldlayout für `reason_code`, `risk`, `notes`, `next_actions`; vereinheitlichte Timestamps.

### Security / Compliance
- **SBOM‑Erzeugung (Preview)** in Build‑Pipelines; Veröffentlichung ins Memory als optionales Artefakt.

### Migration (v1.1 → v1.2)
1) Producer/Consumer auf **`trace_id`** umstellen und durchreichen.
2) `gen_trace.ts` in die Hooks integrieren; KPI‑Snapshot um Trace‑Daten erweitern.
3) Feature‑Flags strukturieren; Readiness für gradual rollout herstellen.

---

## [1.1.0] – 2025-10-12

### Added
- **SAFE_SIMULATION Fallback‑Policy** mit Artefakten `SPEC_MIN.md`, `STUBS/`, `RISKS.md` und Status `result.status="fallback"`.
- **Refusal‑Style‑Guide** im Global‑Governor (sprachlicher Ersatz statt harter Ablehnung; harte Refusals nur bei „E‑003 critical“ oder rechtlich untersagt).
- **Contract‑Tests** an Handoffs (`C-ID-MATCH`, `C-ENDPOINTS-RESOLVE`, `C-SCHEMA-CONSISTENT`) – erzwungen **vor** `Memory.ingest()`.
- **SSOT‑Drift**: automatischer `spec_diff.md` bei PM‑Versionserhöhung; Einbindung in `/audit/kpi_snapshot.md`.
- **PREFLIGHT_CODE**: Lint, Test‑Snapshot und optionale UI‑Snapshots (PNG, max. 3 je Artefakt).
- **Idempotenz & Rate‑Limits** für Audit/Preflight (`Idempotency-Key`, Konfliktverhalten 409).
- **Transfer‑Contract‑Erweiterung**: maschinenlesbare Felder `reason_code`, `next_actions`, `risk`, `notes`.
- **KPI‑Erweiterungen**: `refusal_rate`, `fallback_utilization` samt Governor‑Gegenmaßnahmen.
- **Assumptions‑Registry** (Pflicht) in `REQUIREMENTS.md` inkl. Version‑Bump‑Regel.

### Changed
- **Timeout/Retry/Eskalation** um Fallback‑Owner (PM) und Messaging‑Vorlagen ergänzt.
- **Rollen‑Abschnitte** konsolidiert; Abgabe formalisiert: „nur nach Evaluator→V‑Agent→Role‑Governor→Global‑Governor *pass* und `Memory.ingest()`“.
- **Overrides (PM)** präzisiert: Pflichtfelder, **TTL‑Max 72 h**, Auto‑Review‑Task in `TEST.md`.

### Fixed
- Häufige „kann ich nicht“‑Abbrüche werden durch **Best‑Effort‑Lieferung** ersetzt (Simulation + To‑Dos).
- Unklare Handoff‑Fehler reduziert durch **Contract‑Tests** + **SSOT‑Drift‑Report**.

### Security / Compliance
- Fallback‑Artefakte stehen unter **P‑NO‑PII** und **P‑LICENSES**; klare Kennzeichnung `[SAFE_SIMULATION]`.
- Logs bleiben datenarm (Checksums/Refs); keine Secrets in Artefakten.

### Deprecated
- Implizite, nicht dokumentierte Annahmen im PM‑Prozess → **durch Assumptions‑Registry ersetzt**.

### Removed
- — (keine Löschungen in v1.1; alle Änderungen sind additiv/abwärtskompatibel)

---

## Migrationshinweise (v1.0 → v1.1)
1) **PM aktualisiert SSOT**: `REQUIREMENTS.md` um Sektion `## Assumptions` ergänzen; bei jeder Änderung **Version‑Bump**.
2) **Pipelines anpassen**: Vor jedem `Memory.ingest()` die **Contract‑Tests** ausführen.
3) **Governance übernehmen**: `REFUSAL_STYLE` und **FALLBACK_POLICY** im Global‑Governor aktivieren.
4) **Preflight aktivieren**: Lint/Test‑Snapshot/UI‑Snapshots für Code‑Artefakte einschalten.
5) **Audit/Contracts**: Logging auf neues `result`‑Schema erweitern; Idempotency‑Key durchreichen.
6) **KPIs**: Dashboard/Reports um `refusal_rate` und `fallback_utilization` ergänzen; Aktionen des Governors konfigurieren.
7) **Overrides**: TTL‑Max 72 h und Auto‑Review‑Task in Prozess übernehmen.

### Quick Verification (5‑Min‑Check)
- Komplexen Job triggern, bewusst eine Abhängigkeit blockieren → Es entstehen **`SPEC_MIN.md`, `STUBS/`, `RISKS.md`**, und im Transfer‑Log steht `status:"fallback"` + `reason_code`.
- Eine SSOT‑Änderung durchführen → **`spec_diff.md`** generiert, KPI‑Snapshot aktualisiert.
- Idempotenter Doppel‑Submit → zweiter Write schlägt kontrolliert mit **409** an.
