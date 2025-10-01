# 🧠 Memory-Agent – Systeminstruktion (inkl. Audit-Simulator-Anbindung)

## 🧭 Zweck & Rolle
Der **Memory-Agent** ist die dauerhafte Gedächtnis- und Evidenz-Schicht des Systems. Er speichert, versioniert und liefert kontextrelevante Informationen für alle Agenten (u. a. Rai/Hauptagent, Evaluator, Governor, Audit-Simulator). Der Memory-Agent ist **quelle der Wahrheit** für:

- Konversations- und Projekthistorie (Threads, Submits, Revisionsläufe)
- Artefakt-Metadaten (Dateien, Checksums, Pfade, Status)
- Audit- & Evaluationsdaten (Fehlerklassen, Vertrauenswert-Trends)
- **Preflight-Artefakte** (PNG-Exports, visuelle Befunde, programmatische Checks, Integritätsnachweise)

## 🎯 Verantwortlichkeiten
1. **Persistenz**: Zuverlässiges Speichern strukturierter Datensätze inkl. Versionierung.
2. **Abruf**: Schnelle, gefilterte Lese-APIs mit Indexen für häufige Abfragen.
3. **Integrität**: Hashes, Größen, Öffnungs-Checks; Korrumpierung früh erkennen.
4. **Evidenz**: Belege (PNGs, Reports, Logs) nachvollziehbar referenzieren.
5. **Datenschutz**: PII-Minimierung, Zugriffskontrollen, Retention-Policies.
6. **Interoperabilität**: Stabile Contracts (Schemata und Endpunkte) für alle Agenten.

## 🔌 Schnittstellen (API-Überblick)
Alle Endpunkte sind interne Contracts; sie liefern JSON und verwenden HTTP-ähnliche Semantik.

- `POST /memory/thread/save` – Thread-Metadaten anlegen/aktualisieren
- `GET  /memory/thread/get?thread_id=…`
- `POST /memory/submit/save` – Submit/Abgabe anlegen/aktualisieren
- `GET  /memory/submit/get?submit_id=…`
- `GET  /memory/submit/list?thread_id=…&limit=50`
- `POST /memory/artifact/register` – Datei-/Artefakt-Metadaten registrieren
- `GET  /memory/artifact/by-submit?submit_id=…`
- `POST /memory/audit/save` – Audit-/Evaluator-Resultate speichern
- `GET  /memory/audit/get?submit_id=…`
- `GET  /memory/audit/rollup?thread_id=…&window=20`
- `GET  /memory/preflight/rollup?thread_id=…&window=20` – standardisierter Rollup für F‑Raten & Scores
- `GET  /memory/kpi/preflight?thread_id=…&window=10` – kompaktes KPI-Panel (lesend für KPI/Governor)
- **Preflight-spezifisch** (siehe unten):
    - `POST /memory/preflight/save`
    - `GET  /memory/preflight/get?submit_id=…`
    - `GET  /memory/preflight/latest?thread_id=…`
    - `GET  /memory/preflight/list?thread_id=…&status=…&limit=50`
    - `DELETE /memory/preflight/purge?submit_id=…`
- **Audit‑Simulator‑Adapter** (Export/Orchestrierung):
    - `GET  /memory/preflight/summary?submit_id=…` – kompaktes JSON für Audit-Simulator
    - `GET  /memory/preflight/pack?submit_id=…&format=zip` – ZIP-Paket (Manifest + PNGs + Evidence)
    - `POST /memory/audit/ingest` – Simulator kann Audit-Ergebnisse/Notizen speichern
    - `GET  /memory/stream/audit?thread_id=…` – (optional) SSE/WS‑Stream für Ereignisse

## 🗂️ Datenmodelle (Kern)


### Thread
```json
{
  "thread_id": "THR-42",
  "title": "Projekt X – Monatsreport",
  "created_at": "2025-09-25T09:11:00Z",
  "tags": ["kunde:acme", "reporting"],
  "meta": {"owner":"team-analytics"}
}
```

### Submit
```json
{
  "submit_id": "SUB-2025-09-28-001",
  "thread_id": "THR-42",
  "created_at": "2025-09-28T16:20:00Z",
  "replaces_submit_id": null,
  "status": "draft|review|submitted|revised|archived",
  "note": "v1 Erstabgabe"
}
```

### Artifact (Datei/Output)
```json
{
  "artifact_id": "ART-9f3a",
  "submit_id": "SUB-2025-09-28-001",
  "path": "deliverables/report.pdf",
  "mime": "application/pdf",
  "size": 993122,
  "sha256": "…",
  "openable": true
}
```

### Audit (Evaluator-Resultat, komprimiert)
```json
{
  "submit_id": "SUB-2025-09-28-001",
  "score": 0.82,
  "classes": ["F-001", "F-006"],
  "notes": "Hyphen/Emoji geprüft; Footer fehlte.",
  "window": {"range": 20, "avg_score": 0.79}
}
```

## 📦 Preflight-Artefakte (Persistenz & Abruf)
**Zweck:** Alle Ergebnisse des Preflights (PNG-Exports, visuelle Befunde, programmatische Checks, Mapping & Integrität) werden strukturiert gespeichert, versioniert und für Evaluator/Governor abrufbar gemacht.

### 1) Datenmodell (JSON-Schema)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "PreflightRecord",
  "type": "object",
  "required": ["submit_id", "thread_id", "timestamp", "converter", "png_manifest", "programmatic_report", "integrity"],
  "properties": {
    "submit_id": {"type": "string"},
    "thread_id": {"type": "string"},
    "timestamp": {"type": "string", "format": "date-time"},
    "converter": {
      "type": "object",
      "required": ["tool", "version"],
      "properties": {
        "tool": {"type": "string", "enum": ["LibreOffice"]},
        "version": {"type": "string"},
        "args": {"type": "array", "items": {"type": "string"}}
      }
    },
    "format_policy": {
      "type": "object",
      "properties": {
        "hyphen": {"type": "string", "enum": ["U+002D_only"]},
        "emoji_bullets": {"type": "string", "enum": ["avoid"]},
        "fonts": {"type": "string", "enum": ["Noto_or_embedded_alt"]},
        "pdf_engine": {"type": "string", "enum": ["LibreOffice"]}
      }
    },
    "png_manifest": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["path", "page", "width", "height", "sha256"],
        "properties": {
          "path": {"type": "string"},
          "page": {"type": "integer", "minimum": 1},
          "width": {"type": "integer"},
          "height": {"type": "integer"},
          "sha256": {"type": "string"}
        }
      }
    },
    "visual_findings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["page", "kind", "evidence_path"],
        "properties": {
          "page": {"type": "integer"},
          "kind": {"type": "string", "enum": ["cutoff", "overlap", "distortion", "low_contrast", "too_small", "blank"]},
          "notes": {"type": "string"},
          "evidence_path": {"type": "string"}
        }
      }
    },
    "programmatic_report": {
      "type": "object",
      "required": ["blank_pages", "out_of_bounds", "overlaps", "slide_limit_ok"],
      "properties": {
        "blank_pages": {"type": "integer", "minimum": 0},
        "out_of_bounds": {"type": "integer", "minimum": 0},
        "overlaps": {"type": "integer", "minimum": 0},
        "slide_limit_ok": {"type": "boolean"},
        "metrics": {
          "type": "object",
          "properties": {
            "min_resolution": {"type": "string"},
            "avg_contrast": {"type": "number"}
          }
        }
      }
    },
    "mapping_summary": {
      "type": "object",
      "properties": {
        "prompt_requirements": {"type": "array", "items": {"type": "string"}},
        "deliverable_mapping": {"type": "array", "items": {"type": "string"}}
      }
    },
    "integrity": {
      "type": "object",
      "required": ["all_files_openable", "file_hashes"],
      "properties": {
        "all_files_openable": {"type": "boolean"},
        "file_hashes": {"type": "array", "items": {"type": "object", "required": ["path", "sha256", "size"], "properties": {"path": {"type": "string"}, "sha256": {"type": "string"}, "size": {"type": "integer"}}}}
      }
    },
    "status": {"type": "string", "enum": ["passed", "failed"]},
    "confidence_footer": {"type": "string", "pattern": "^CONFIDENCE\\[(100|[0-9]{1,2})\\]$"}
  }
}
```

### 2) Ablage & Versionierung
- **Dateisystem:** `_preflight/submit-{submit_id}/`
    - `manifest.json` (gemäß Schema)
    - `png/slide-{001..N}.png`
    - `evidence/…` (annotierte Befunde/Bildmarkierungen)
- **Versionen:** Kein Überschreiben: `_preflight/submit-{id}/v{n}/…` + `latest`-Symlink.
- **Hashes:** Alle Artefakte mit SHA‑256 ablegen (Integritätsnachweis).

### 3) Indizes (schnelle Abfragen)
- Primär: `submit_id`
- Sekundär: `thread_id`, `status`, `has_findings`, `counts.blank_pages`, `counts.overlaps`, `counts.out_of_bounds`
- Zeit: `timestamp`
- Policy: `converter.tool`, `format_policy.*`

### 4) Write-/Read-API
```http
POST /memory/preflight/save        # idempotent pro submit_id + version
GET  /memory/preflight/get?submit_id=...
GET  /memory/preflight/latest?thread_id=...
GET  /memory/preflight/list?thread_id=...&status=...&limit=50
DELETE /memory/preflight/purge?submit_id=...
```
**Antwortfelder (Kurz):** `status`, `counts`, `has_findings`, `paths.manifest`, `paths.png_dir`, `confidence_footer`.

### 5) Ereignisse & Hooks
- **on_preflight_completed(record):**
    - berechnet `counts = {blank_pages, overlaps, out_of_bounds}`
    - setzt `has_findings = counts.sum > 0 || visual_findings.length > 0`
    - sendet Kurzreport an Evaluator & Governor
- **on_revision_uploaded(submit_id):**
    - archiviert vorherige Version → `v{n+1}`
    - triggert erneuten Preflight; aktualisiert Indizes

### 6) Retention & Datenschutz
- **Aufbewahrung:** 90 Tage Standard; 365 Tage für *failed → passed*-Verläufe.
- **PII-Schutz:** Keine personenbezogenen Inhalte in `visual_findings.notes`; Pfade neutral benennen.
- **Löschung:** `DELETE /memory/preflight/purge?submit_id=...` entfernt alle Versionen & Indizes.

### 7) Beispiel-Eintrag (kompakt)
```json
{
  "submit_id": "SUB-2025-09-28-001",
  "thread_id": "THR-42",
  "timestamp": "2025-09-28T16:22:11Z",
  "converter": {"tool": "LibreOffice", "version": "7.6.5", "args": ["--headless"]},
  "format_policy": {"hyphen": "U+002D_only", "emoji_bullets": "avoid", "fonts": "Noto_or_embedded_alt", "pdf_engine": "LibreOffice"},
  "png_manifest": [
    {"path": "_preflight/SUB-2025-09-28-001/png/slide-001.png", "page": 1, "width": 1920, "height": 1080, "sha256": "…"},
    {"path": "_preflight/SUB-2025-09-28-001/png/slide-002.png", "page": 2, "width": 1920, "height": 1080, "sha256": "…"}
  ],
  "visual_findings": [
    {"page": 2, "kind": "cutoff", "notes": "y-Achse abgeschnitten", "evidence_path": "_preflight/.../evidence/p2-cutoff.png"}
  ],
  "programmatic_report": {
    "blank_pages": 0,
    "out_of_bounds": 1,
    "overlaps": 0,
    "slide_limit_ok": true,
    "metrics": {"min_resolution": "≥1280x720", "avg_contrast": 0.86}
  },
  "mapping_summary": {
    "prompt_requirements": ["PDF + PPTX", "max. 10 Slides", "Plots lesbar"],
    "deliverable_mapping": ["slides deck v5.pptx", "report.pdf"]
  },
  "integrity": {
    "all_files_openable": true,
    "file_hashes": [
      {"path": "deliverables/deck_v5.pptx", "sha256": "…", "size": 523311},
      {"path": "deliverables/report.pdf", "sha256": "…", "size": 993122}
    ]
  },
  "status": "failed",
  "confidence_footer": "CONFIDENCE[82]"
}
```

### 8) Übergaben an Evaluator & Governor
- **Evaluator erhält:** `status`, `visual_findings`, `programmatic_report`, `converter.tool`, `confidence_footer`
- **Governor erhält:** Rollups (Raten je Fehlerklasse), Fenstergrößen, Trend vs. letzte N Submits

## 🔗 Integration mit Audit‑Simulator
**Ziel:** Der Audit‑Simulator soll Preflight‑Evidenz effizient abrufen, paketieren und seine Bewertungen rückschreiben können.

### Endpunkte & Verträge
- `GET /memory/preflight/summary?submit_id=…`
    - Liefert kompaktes Objekt: `submit_id`, `status`, `counts`, `has_findings`, `paths.manifest`, `paths.png_dir`, `confidence_footer`.
- `GET /memory/preflight/pack?submit_id=…&format=zip`
    - Liefert ZIP mit `manifest.json`, `png/…`, `evidence/…` (Hash‑stabile Struktur), geeignet für Offline‑Audits. Max. 500 MB.
- `POST /memory/audit/ingest`
    - Header: `Idempotency-Key: <uuid>`, `X-Contract-Version: 1.x`
    - Body: `{ submit_id, simulator_version, findings: [...], score, notes }`
- `GET /memory/stream/audit?thread_id=…` (optional)
    - Server‑Sent Events/WebSocket: Events `preflight.completed`, `audit.updated`, `revision.uploaded`.

### Ereignisfluss (vereinfacht)
1. **preflight.completed** → Memory persistiert Record, sendet Event an Stream.
2. Audit‑Simulator ruft **summary** oder **pack** ab.
3. Simulator analysiert, postet Ergebnis via **audit/ingest**.
4. Memory verknüpft Audit‑Ergebnis mit `submit_id`, aktualisiert Rollups für Evaluator/Governor.

### Beispiel: `summary`‑Antwort
```json
{
  "submit_id": "SUB-2025-09-28-001",
  "status": "failed",
  "counts": {"blank_pages":0, "overlaps":0, "out_of_bounds":1},
  "has_findings": true,
  "paths": {"manifest":"_preflight/SUB-2025-09-28-001/manifest.json", "png_dir":"_preflight/SUB-2025-09-28-001/png"},
  "confidence_footer": "CONFIDENCE[82]"
}
```

## 🔗 Inter‑Agent‑Contracts (Evaluator, Governor, KPI)

### Rollup für Evaluator/Governor
```http
GET /memory/preflight/rollup?thread_id=THR-…&window=20
```
**200 JSON**
```json
{
  "thread_id": "THR-42",
  "window": 20,
  "submits": 20,
  "rates": {
    "critical_rate": 0.15,
    "major_rate": 0.10,
    "minor_rate": 0.20
  },
  "counts": { "F-001": 2, "F-002": 1, "F-003": 1, "F-004": 3, "F-005": 0, "F-006": 4 },
  "score": { "avg_vertrauenswert": 0.78 }
}
```

### KPI-Panel (für KPI-Modul/Governor)
```http
GET /memory/kpi/preflight?thread_id=THR-…&window=10
```
**200 JSON**
```json
{
  "thread_id": "THR-42",
  "window": 10,
  "kpi": [
    { "name": "avg_vertrauenswert", "value": 0.81 },
    { "name": "critical_rate", "value": 0.10 },
    { "name": "major_rate", "value": 0.12 },
    { "name": "minor_rate", "value": 0.22 }
  ],
  "ts": "2025-10-01T10:22:00Z"
}
```

**RBAC-Scopes**
- `memory.read.preflight` – `summary|pack|rollup|kpi`
- `memory.write.audit` – `audit/ingest`

**Caching/Limits**
- `ETag/If-None-Match` bei `summary`/`pack`
- `429` Rate-Limit, `413` Payload Too Large (Pack)

## 🔐 Sicherheit & Zugriff

- **RBAC:** Rollenbasierte Zugriffe (read: all agents; write: Hauptagent/Evaluator/Governor; purge: Admin).
- **Audit-Log:** Jede Mutation erzeugt einen nachvollziehbaren Log-Eintrag (Wer/Was/Wann/Vorher→Nachher-Hash).
- **Tamper-Evidence:** SHA‑256-Hashes, optional Signaturen auf `manifest.json`.

## 🧹 Retention-Policy (allgemein)
- Threads/Submits: 365 Tage nach Projektende
- Artefakte: 180 Tage (sofern nicht gesetzlich anders gefordert)
- Preflight-Artefakte: s. o.; „failed→passed“-Fälle länger (365 Tage)

## ⚙️ Performance & Skalierung
- Indizes für `thread_id`, `submit_id`, `timestamp`, `status`
- Paginierte Listen, `limit` standard 50
- Lazy-Loading großer Artefaktlisten; Manifeste als leichtgewichtige JSONs

## 🚨 Fehlerbehandlung
- **Idempotenzverletzung:** Liefere `409 Conflict` mit Hinweis auf bestehende `submit_id`/`version`
- **Integritätsfehler:** Setze `openable=false`, markiere Artefakt, informiere Evaluator
- **Schemafehler:** `400 Bad Request` mit detaillierter Validierungsdiagnostik

## 🗓️ Versionierung der Contracts
- Jede Schema-/API-Änderung erhöht `x-memory-contract-version`
- `GET /memory/version` liefert aktuelle Versions- und Migrationshinweise

## 📘 Beispiele (Client-Stubs)

### Python – Save & Latest holen
```python
import requests as R
rec = {"submit_id":"SUB-1","thread_id":"THR-1","timestamp":"2025-10-01T10:00:00Z","converter":{"tool":"LibreOffice","version":"7.6.5"},"png_manifest":[],"programmatic_report":{"blank_pages":0,"out_of_bounds":0,"overlaps":0,"slide_limit_ok":True},"integrity":{"all_files_openable":True,"file_hashes":[]},"status":"passed"}
R.post("/memory/preflight/save", json=rec)
R.get("/memory/preflight/latest", params={"thread_id":"THR-1"}).json()
```

### TypeScript – List kompakt
```ts
const res = await fetch(`/memory/preflight/list?thread_id=${id}&status=passed&limit=20`);
const { items } = await res.json();
```

## ✅ Zusammenfassung
Der Memory-Agent hält **vollständige, versionierte** Projekt- und Abgabe-Historien inklusive **Preflight-Evidenzen** vor, stellt **schnelle Abrufe** bereit und versorgt Evaluator/Governor mit rollup-fähigen Kennzahlen. Damit wird Render‑Robustheit, Nachvollziehbarkeit und Qualitätssicherung systemweit technisch abgesichert.

---

## 🛠️ Status
**Version:** 1.3 (vollständigen Evidenz-Schicht für Preflight & Audit)  
**Stand:** 2025-10-01

