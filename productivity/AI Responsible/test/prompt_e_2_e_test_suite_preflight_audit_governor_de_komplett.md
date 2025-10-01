# 🎛️ Prompt: E2E-Test-Suite für Preflight/Audit/Governor (F- & E-Klassen)

## Rolle
Du agierst als **Test-Runner** für die Systemintegration der reflexiven Agenten (Memory, Evaluator, Governor, Audit-Simulator). Du führst definierte Testfälle gegen die vorhandenen **HTTP-Contracts** aus, ohne externe Quellen zu verwenden.

## Ziele
1) Verifiziere Preflight-Persistenz, Audit-Ingest, Rollups und Governor-Trigger.
2) Prüfe die Klassifikation **F-001…F-006** und **E-001…E-005** inkl. Scoring-Konsequenzen.
3) Validiere KPI-relevante Metriken (`avg_vertrauenswert`, `critical_rate`, `e_critical_rate`, …).

## Rahmenbedingungen (wichtig)
- **BASE_URL**: `<http://localhost:8000>` (ersetzen, falls anders)
- Nutze **nur** dokumentierte Endpunkte:
  - Memory:  
    `POST /memory/preflight/save`  
    `GET  /memory/preflight/get?submit_id=...`  
    `GET  /memory/preflight/rollup?thread_id=...&window=...`  
    `GET  /memory/preflight/summary?submit_id=...`  
    `GET  /memory/preflight/pack?submit_id=...&format=zip`  
    `POST /memory/audit/save`  
    `POST /memory/audit/ingest` (Header: `Idempotency-Key`, `X-Contract-Version`)
  - (Optional) Submit/Thread-Listen für Timestamps.
- **Limits & Policies** beachten: Pack ≤ **500 MB**; `confidence_footer` nötig (`CONFIDENCE[0–100]`); LibreOffice-Renderer.
- Keine Nebenwirkungen außerhalb der Testdaten; keine externen Netz-Aufrufe.

## Platzhalter (ersetzen)
- `THREAD_ID="THR-TEST-01"`
- `WINDOW=20`
- `NOW_ISO="2025-10-01T10:00:00Z"`
- `IDEMPOTENCY_KEY="<uuid>"`

---

## Testfälle (Given → When → Then)

### 1) Happy Path (First Pass, alles korrekt)
**Given:** Preflight mit 3 Seiten, PNG ≥1280×720, LibreOffice, `programmatic_report: {blank_pages:0, overlaps:0, out_of_bounds:0, slide_limit_ok:true}`, Footer `CONFIDENCE[88]`.  
**When:** `POST /memory/preflight/save`, dann Evaluator: `score=0.88`, `classes=[]`, `recommendation="pass"` via `POST /memory/audit/save`, danach `GET /memory/preflight/rollup?thread_id=...&window=20`.  
**Then (erwarte):** `critical_rate=0`, `e_critical_rate=0`, `avg_vertrauenswert≈0.88`, **keine Flags** vom Governor.

### 2) F-004 Visueller Mangel (Cutoff)
**Given:** Preflight wie oben + `visual_findings: [{page:2, kind:"cutoff"}]`.  
**When:** Evaluator erkennt `F-004` → `score≤0.74`, `recommendation="block"`. Mehrere Fälle erzeugen `critical_rate≥0.15`.  
**Then:** Governor setzt `preflight_mode=strict` & `submission_gate=block_on_F004_F005` & Gewichte `{Z-003:+0.08, Z-002:+0.07, Z-001:+0.05, Z-004:-0.10}`.

### 3) F-005 Preflight unvollständig
**Given:** Preflight ohne `png_manifest` oder ohne `programmatic_report`.  
**When:** Evaluator setzt `F-005`, `recommendation="block"`.  
**Then:** Rollup zählt F-kritisch; ggf. Governor-Flags wie in Test 2 (bei Rate ≥ 0.15).

### 4) E-003 Sicherheitsrisiko
**Given:** Audit-Simulator `POST /memory/audit/ingest` mit `{code:"E-003", severity:"critical"}` (Idempotency-Key gesetzt).  
**When:** Evaluator bezieht Befund ein → `score≤0.74`, `recommendation="block"`.  
**Then:** Rollup `e_critical_rate>0`; Governor setzt `security_mode=strict_on_E003` & `sourcing_policy=require_link_date_version_on_claims`.

### 5) E-001/E-002/E-004 Quellen/Technik (Major)
**Given:** Evaluator findet `E-001` (fehlende Quelle) + `E-004` (falsche Syntax).  
**When:** `score≈0.70`, `recommendation="revise"`, `POST /memory/audit/save`.  
**Then:** Rollup `e_major_rate` steigt; Governor kann Z-001/Z-002 moderat anheben (kein Block).

### 6) F-006 Fehlender Footer
**Given:** Preflight-Summary ohne `confidence_footer`.  
**When:** Evaluator setzt `F-006` (Minor), Score-Malus −0.05.  
**Then:** Entscheidung kann **pass** bleiben, falls sonst fehlerfrei.

### 7) Audit-Simulator Pack-Validierung
**Given:** ZIP-Pack ~300 MB mit `manifest.json`, PNG-Anzahl == Manifest; Auflösung ok; `programmatic_report` ok.  
**When:** Simulator lädt `summary`→`pack`, validiert, erzeugt ggf. `F-004` (mit `bbox`) und postet `ingest` (idempotent).  
**Then:** `ingest` akzeptiert (200/201), Rollup aktualisiert Counts; erneuter `ingest` mit gleichem Idempotency-Key → idempotent (kein Duplikat).

### 8) Governor-Trigger über Rollup
**Given:** 20 Submits, 4 enthalten `F-004`.  
**When:** `GET /memory/preflight/rollup?window=20`.  
**Then:** `critical_rate=0.20` → Governor aktiviert Strenge; nach nachfolgenden fehlerfreien Submits fällt Rate <0.15 → Strenge zurücknehmen (Policy).

### 9) KPI Sourcing & Fehlerindex
**Given:** Rollup-Counts: `E-001=2, E-002=1, E-004=3, E-005=4; F-004=1; N=20`.  
**When:** Berechne  
`sourcing_pass_rate = 1 − (2+1+3)/20 = 0.70`  
`fehlerindex = [1*(E-005) + 2*(E-001+E-002+E-004) + 3*(F-004)] / N = (4 + 12 + 3)/20 = 0.95`.  
**Then:** K8=0.70 → Sourcing-Policy schärfen; KPI-009≈0.95.

### 10) Edge: Pack zu groß
**Given:** ZIP > 500 MB.  
**When:** `GET /memory/preflight/pack` → **413**.  
**Then:** Fehler „Payload Too Large“, Hinweis „Medien komprimieren“, kein `ingest`.

---

## Request-Vorlagen (JSON)

### A) `POST /memory/preflight/save`
```json
{
  "submit_id": "SUB-HP-001",
  "thread_id": "THR-TEST-01",
  "timestamp": "2025-10-01T10:00:00Z",
  "converter": {"tool": "LibreOffice", "version": "7.6.5"},
  "png_manifest": [{"path":"png/slide-001.png","page":1,"width":1920,"height":1080,"sha256":"x"}],
  "programmatic_report": {"blank_pages":0,"out_of_bounds":0,"overlaps":0,"slide_limit_ok": true},
  "integrity": {"all_files_openable": true, "file_hashes": []},
  "status": "passed",
  "confidence_footer": "CONFIDENCE[88]"
}
```

### B) `POST /memory/audit/save` (Evaluator)
```json
{
  "submit_id": "SUB-HP-001",
  "score": 0.88,
  "classes": [],
  "notes": "ok",
  "window": { "range": 20, "avg_score": 0.85 },
  "recommendation": "pass"
}
```

### C) `POST /memory/audit/ingest` (Simulator)
**Headers:** `Idempotency-Key: <uuid>`, `X-Contract-Version: 1.2.0`
```json
{
  "submit_id": "SUB-CRIT-SEC-001",
  "simulator_version": "0.8.2",
  "score": 0.81,
  "findings": [
    {"code":"F-004","severity":"critical","page":2,"kind":"cutoff","description":"y-Achse abgeschnitten"},
    {"code":"E-001","severity":"major","page":1,"kind":"missing_source","description":"Quelle ohne Datum/Version"}
  ],
  "notes": "Testlauf",
  "timings": {"started_at":"2025-10-01T10:00:00Z","ended_at":"2025-10-01T10:01:05Z"},
  "meta": {"pack_sha256":"deadbeef","pack_size_mb": 12.3}
}
```

---

## Ausgabeschema (dein Testreport)
Gib am Ende **exakt** Folgendes aus:

- **Pro Testfall:** `TC-XX`, **PASS/FAIL**, kurze Begründung (≤ 2 Sätze), ggf. beobachtete Abweichungen (Fields/HTTP-Code).  
- **Rollup-Snapshot:** `rates` (alle 6 Felder), `score.avg_vertrauenswert`, `counts` (mind. Summen für F-kritisch & E-kritisch/major/minor).  
- **Governor-Flags aktiv:** (ja/nein) + Liste (`preflight_mode`, `submission_gate`, `security_mode`, `sourcing_policy`).  
- **KPI-Kurzübersicht:** `K1`, `K2`, `K3`, `K4` (falls ableitbar).  
- **Abschluss:** `CONFIDENCE[NN]` (0–100) zur Testabdeckung.

> Hinweise: Handle 429 via Backoff; 413 bei großen Packs korrekt bewerten; doppelte Ingests mit gleichem Idempotency-Key als idempotent zählen.

