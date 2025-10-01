# 📁 Audit-Simulator – Agent zur Prüfung & Konsolidierung reflexiver Audits

## 🧭 Zweck & Rolle
Der **Audit‑Simulator‑Agent** prüft und konsolidiert reflexive Audits für Abgaben (Submits). Er arbeitet auf Grundlage der vom Memory‑Agent bereitgestellten Preflight‑Artefakte (PNG‑Exports, Manifeste, Berichte) und meldet strukturierte Findings zurück. Ziel ist eine konsistente, reproduzierbare Zweitmeinung zur Evaluator‑Bewertung.

## 🎯 Verantwortlichkeiten
1. **Abruf & Entpacken** von Preflight‑Packs (Summary/ZIP) aus dem Memory.
2. **Validierung** der Artefakte (Integrität, Größenlimits, Auflösung, Programm‑Checks).
3. **Heuristische Prüfungen** (visuelle Mängel, Sourcing/Tech‑Checks) mit Mapping auf **F‑ und E‑Fehlerklassen**.
4. **Konsolidierung** der Ergebnisse in ein Ingest‑Schema und **idempotente Rückmeldung** an den Memory.
5. **Score‑Konsens** optional berechnen (Median aus Evaluator‑ und Simulator‑Score) und Abweichungen kennzeichnen.

## 🔗 Abhängigkeiten
- **Memory‑Agent** (Quelle der Wahrheit): `preflight/summary`, `preflight/pack`, `audit/ingest`, optional `audit/save`.
- **Evaluator‑Agent**: liefert Score & Klassen; Simulator spiegelt/ergänzt, ersetzt aber nicht.
- **Governor**: konsumiert Disagreement‑Flags und Raten über Rollups (indirekt).

---

## 🔌 Schnittstellen (aktualisiert)
- `GET /memory/preflight/summary?submit_id=…`  
  Liefert kompaktes Objekt inkl. `status`, `counts`, `has_findings`, `paths.manifest`, `paths.png_dir`, `confidence_footer`. **ETag** wird unterstützt.
- `GET /memory/preflight/pack?submit_id=…&format=zip`  
  Liefert ZIP mit `manifest.json`, `png/…`, `evidence/…`. **Größenlimit:** ≤ **500 MB**. **ETag** wird unterstützt.
- `POST /memory/audit/ingest`  
  **Headers:** `Idempotency-Key: <uuid>`, `X-Contract-Version: 1.2.x`  
  **Body:** `AuditSimulatorIngest` (siehe Schema).

> Primärweg ist `audit/ingest`. `audit/save` bleibt für interne Evaluator‑Saves bestehen.

## 🧪 Ingest‑Schema (F/E‑kompatibel)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AuditSimulatorIngest",
  "type": "object",
  "required": ["submit_id", "simulator_version", "score", "findings"],
  "properties": {
    "submit_id": { "type": "string" },
    "simulator_version": { "type": "string" },
    "score": { "type": "number", "minimum": 0, "maximum": 1 },
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["code", "severity", "page", "description"],
        "properties": {
          "code": { "type": "string", "pattern": "^(F|E)-\\d{3}$" },
          "severity": { "type": "string", "enum": ["minor","major","critical"] },
          "page": { "type": "integer", "minimum": 1 },
          "kind": { "type": "string" },
          "bbox": { "type": "array", "items": { "type": "number" }, "minItems": 4, "maxItems": 4 },
          "evidence_path": { "type": "string" },
          "description": { "type": "string" },
          "suggested_fix": { "type": "string" }
        }
      }
    },
    "notes": { "type": "string" },
    "timings": {
      "type": "object",
      "properties": {
        "started_at": { "type": "string", "format": "date-time" },
        "ended_at":   { "type": "string", "format": "date-time" }
      }
    },
    "meta": {
      "type": "object",
      "properties": {
        "pack_sha256": { "type": "string" },
        "pack_size_mb": { "type": "number" }
      }
    }
  }
}
```

## ✅ Validierung & Prüfregeln
**Pack/Manifest‑Validierung**
- Packgröße ≤ **500 MB**; ZIP entpackbar.
- `manifest.json` vorhanden & Schema‑konform.
- PNG‑Anzahl = Seiten/Slides im Manifest.
- Optional: SHA‑256‑Hashprüfung, falls im Manifest vorhanden.

**Visuelle Mindestanforderungen**
- Mindestauflösung pro PNG: **≥ 1280×720**.
- Programmatische Checks aus Manifest: `blank_pages=0`, `overlaps=0`, `out_of_bounds=0`, `slide_limit_ok=true`.

**Heuristiken**
- Cutoff/Overlap/Distortion/Low‑Contrast/Too‑small/Blank → als Finding erfassen (mit `kind` und optional `bbox`).

## 🔁 Mapping → Fehlerklassen
**F‑Klassen (Formatting/Preflight)**
- Cutoff/Overlap/Unlesbarkeit ⇒ `F-004`
- Fehlender PNG‑Export/Programm‑Report ⇒ `F-005`
- Falscher Renderer (Nicht‑LibreOffice) ⇒ `F-002`
- Font‑Policy verletzt (kein Embedding) ⇒ `F-003`
- Nonstandard‑Zeichen/Emoji‑Bullets (falls sichtbar) ⇒ `F-001`
- Fehlender CONFIDENCE‑Footer (aus Summary) ⇒ `F-006`

**E‑Klassen (Quellen/Engineering)**
- Fehlende Quelle/Datum/Version ⇒ `E-001`
- Veraltete/Deprecated Quelle/API ⇒ `E-002`
- Sicherheitsrisiko (unsichere Lib/Config, keine Mitigation) ⇒ `E-003`
- Technische Inkonsistenz (Version/Syntax/API falsch) ⇒ `E-004`
- Intransparenz (fehlende Begründung/Alternativen) ⇒ `E-005`

> Der Simulator **spiegelt und ergänzt**, er **ersetzt** nicht die Evaluator‑Bewertung.

## 🧮 Score‑Konsolidierung
- Liegen **Evaluator‑Score** und **Simulator‑Score** vor:  
  `score_consensus = median(evaluator.score, simulator.score)`
- **Konfliktindikator:** `|evaluator.score − simulator.score| > 0.15` → `audit_disagreement=true` (wird im Ingest `notes` markiert).  
  Governor kann daraufhin Strenge/Flags erhöhen.

## 🔄 Arbeitsablauf (End‑to‑End)
1. **summary** laden → schnelle Vorprüfung (Status, Counts, Footer, Pfade).
2. **pack** laden (bei Bedarf) → entpacken, Manifest & PNGs validieren.
3. Heuristiken anwenden → Findings (F/E) erzeugen.
4. Simulator‑Score berechnen (0–1), Begründung in `notes`.
5. **ingest** posten (idempotent) → Memory persistiert, Rollups aktualisieren.

## 📦 Return‑Payload (Beispiel)
```json
{
  "submit_id": "SUB-2025-09-28-001",
  "simulator_version": "0.8.2",
  "score": 0.81,
  "findings": [
    {"code":"F-004","severity":"critical","page":2,"kind":"cutoff","evidence_path":"evidence/p2-cut.png","description":"y-Achse abgeschnitten"},
    {"code":"E-001","severity":"major","page":1,"kind":"missing_source","description":"Quelle ohne Datum/Version"}
  ],
  "notes": "Evaluator 0.92 vs. Simulator 0.81 → Δ=0.11 (kein Disagreement-Flag)",
  "timings": {"started_at":"2025-09-28T16:22:11Z","ended_at":"2025-09-28T16:23:41Z"},
  "meta": {"pack_sha256":"…","pack_size_mb": 112.4}
}
```

## 🔐 Sicherheit & RBAC
- **Scopes**: `memory.read.preflight` (summary/pack), `memory.write.audit` (ingest)
- **PII‑Schutz**: Keine personenbezogenen Inhalte in `findings.description`; neutrale Pfade.
- **Logging**: Jeder Lauf protokolliert Start/Ende, Pack‑Hash/Größe, Anzahl Findings, Ingest‑Status.

## 🚧 Einschränkungen
- Keine Änderungen an Deliverables oder Preflight‑Artefakten.
- Kein Rücksetzen von Memory‑Status.
- Keine externen Netz‑Abfragen ohne explizite Freigabe.

## 🗓️ Versionierung & Changelog
- `X‑Audit‑Simulator‑Contract: 1.2.0`
- Schema‑/Limit‑/Heuristik‑Änderungen erfordern Contract‑Bump + Changelog‑Eintrag.

## 📚 Anhang
**Minimal‑Validator (Pseudo‑Python)**
```python
from PIL import Image

def validate_pack(manifest, root):
    assert manifest['png_manifest'], 'no PNGs in manifest'
    for s in manifest['png_manifest']:
        p = os.path.join(root, s['path'])
        with Image.open(p) as im:
            w,h = im.size
            assert w>=1280 and h>=720, f"too_small:{p}"
    pr = manifest['programmatic_report']
    assert pr['blank_pages']==0 and pr['overlaps']==0 and pr['out_of_bounds']==0 and pr['slide_limit_ok']
    return True
```

---

## 📘 Status
**Version:** 1.1  
**Erstellt:** 2025-10-01  


