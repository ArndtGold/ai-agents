# ReflexTeam – Changelog

## [1.1.0] – 2025-10-12 (Europe/Berlin)

### Added
- **SAFE_SIMULATION Fallback-Policy** mit Artefakten `SPEC_MIN.md`, `STUBS/`, `RISKS.md` und Status `result.status="fallback"`.
- **Refusal-Style-Guide** im Global-Governor (sprachlicher Ersatz statt harter Ablehnung; harte Refusals nur bei „E-003 critical“ oder rechtlich untersagt).
- **Contract-Tests** an Handoffs (`C-ID-MATCH`, `C-ENDPOINTS-RESOLVE`, `C-SCHEMA-CONSISTENT`) – erzwungen **vor** `Memory.ingest()`.
- **SSOT-Drift**: automatischer `spec_diff.md` bei PM-Versionserhöhung; Einbindung in `/audit/kpi_snapshot.md`.
- **PREFLIGHT_CODE**: Lint, Test-Snapshot und optionale UI-Snapshots (PNG, max. 3 je Artefakt).
- **Idempotenz & Rate-Limits** für Audit/Preflight (`Idempotency-Key`, Konfliktverhalten 409).
- **Transfer-Contract-Erweiterung**: maschinenlesbare Felder `reason_code`, `next_actions`, `risk`, `notes`.
- **KPI-Erweiterungen**: `refusal_rate`, `fallback_utilization` samt Governor-Gegenmaßnahmen.
- **Assumptions-Registry** (Pflicht) in `REQUIREMENTS.md` inkl. Version-Bump-Regel.

### Changed
- **Timeout/Retry/Eskalation** um Fallback-Owner (PM) und Messaging-Vorlagen ergänzt.
- **Rollen-Abschnitte** konsolidiert; Abgabe formalisiert: „nur nach Evaluator→V-Agent→Role-Governor→Global-Governor *pass* und `Memory.ingest()`“.
- **Overrides (PM)** präzisiert: Pflichtfelder, **TTL-Max 72h**, Auto-Review-Task in `TEST.md`.

### Fixed
- Häufige „kann ich nicht“-Abbrüche werden durch **Best-Effort-Lieferung** ersetzt (Simulation + To-Dos).
- Unklare Handoff-Fehler reduziert durch **Contract-Tests** + **SSOT-Drift-Report**.

### Security / Compliance
- Fallback-Artefakte stehen unter **P-NO-PII** und **P-LICENSES**; klare Kennzeichnung `[SAFE_SIMULATION]`.
- Logs bleiben datenarm (Checksums/Refs); keine Secrets in Artefakten.

### Deprecated
- Implizite, nicht dokumentierte Annahmen im PM-Prozess → **durch Assumptions-Registry ersetzt**.

### Removed
- — (keine Löschungen in v1.1; alle Änderungen sind additiv/abwärtskompatibel)

---

## Migrationshinweise (v1.0 → v1.1)
1) **PM aktualisiert SSOT**: `REQUIREMENTS.md` um Sektion `## Assumptions` ergänzen; bei jeder Änderung **Version-Bump**.
2) **Pipelines anpassen**: Vor jedem `Memory.ingest()` die **Contract-Tests** ausführen.
3) **Governance übernehmen**: `REFUSAL_STYLE` und **FALLBACK_POLICY** im Global-Governor aktivieren.
4) **Preflight aktivieren**: Lint/Test-Snapshot/UI-Snapshots für Code-Artefakte einschalten.
5) **Audit/Contracts**: Logging auf neues `result`-Schema erweitern; Idempotency-Key durchreichen.
6) **KPIs**: Dashboard/Reports um `refusal_rate` und `fallback_utilization` ergänzen; Aktionen des Governors konfigurieren.
7) **Overrides**: TTL-Max 72h und Auto-Review-Task in Prozess übernehmen.

### Quick Verification (5-Min-Check)
- Komplexen Job triggern, bewusst eine Abhängigkeit blockieren → Es entstehen **`SPEC_MIN.md`, `STUBS/`, `RISKS.md`**, und im Transfer-Log steht `status:"fallback"` + `reason_code`.
- Eine SSOT-Änderung durchführen → **`spec_diff.md`** generiert, KPI-Snapshot aktualisiert.
- Idempotenter Doppel-Submit → zweiter Write schlägt kontrolliert mit **409** an.

