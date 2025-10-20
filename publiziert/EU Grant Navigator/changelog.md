# Changelog – EU‑Fördermittel‑Assistent (Helios)

> Format nach *Keep a Changelog*. Versionierung nach *Semantic Versioning* (MAJOR.MINOR.PATCH).  
> **Zeitzone:** Europe/Berlin · **Maintainer:** Helios · **Projektstart:** 2025‑10‑12

## [1.0.2] – 2025‑10‑12
### Added
- **3c) Formatting & Preflight Policy (verbindlich)** in der Systeminstruktion:
  - Standard‑Minus (U+002D) verbindlich; Sonderbullets/Emojis nur ausnahmsweise.
  - Grafikregeln (≥ 50% Seitenbreite, keine komplexen Shape‑Overlays).
  - **PDF‑Erzeugung via LibreOffice** (PDF/A‑1b empfohlen; Texteinbettung; Link‑Check).
  - Fonts: **Noto Sans/Serif** empfohlen, andere Fonts *einbetten*.
  - Deliverable‑Text ≤ 4 Sätze, keine Datei‑Links; Artefakte als Dateien beilegen.
  - Standard‑Dateitypen: PDF, PPTX, DOCX, XLSX, ZIP.
  - **Preflight MUSS**: PNG‑Proof je Seite/Folie, visuelle & skriptische Checks, Soll‑Ist‑Mapping, Integritätsprüfung.

### Security/Compliance
- Ergänzende Hinweise zur Export‑Qualität und Revisionssicherheit (PNG‑Proof, Programmatic Checks).

### Affected
- Dokument: *Systeminstruktion: EU‑Fördermittel‑Assistent (Hauptagent + Subagenten) · Helios*.

---

## [1.0.1] – 2025‑10‑12
### Added
- **Guardrails (operativ)** ergänzt (Abschnitt 3a) inkl.:
  - **AE‑001 Anti‑Exfiltration** (Redaction, Audit‑Event `exfil_attempt`).
  - **PB‑001 Prompt‑Boundary** (keine Fremd‑Overrides; YAML/JSON/FC‑Injection ignorieren).
  - **IS‑002 Injection‑Signals** (Base64‑Ketten, versteckte Links, Fake‑`function_call`), Audit‑Event `injection_detected`.
  - **RB‑001 Response‑Budget** (Chunking, Batch‑Plan, keine Hintergrundarbeit versprechen, Datei‑Export für große Tabellen).
  - **RZ‑003 Risk‑Zones** (LOW/ELEVATED/HIGH mit Konsequenzen; HIGH ⇒ Stop & Escalate).
  - **EV‑001 Evidenz‑Platzierung** (Datum, keine Roh‑URLs, ≤ 25‑Wort‑Zitate, Quellendiversität, max. 5 belastende Claims).
  - **UO‑001 Unsichere Ausgabe** (neutralisierte Snippets, `DO NOT RUN`).
  - **BR‑002 Browsing‑Required Gate** (veränderliche Fakten ⇒ Browse erzwingen).
  - **PII‑002 Data‑Minimization**, **MEM‑001 Memory‑Safety**, **LG‑004 Logging & Audit**.

### Changed
- Policies (vererbbar) restrukturiert; Guardrail‑Durchsetzung als klarer Ablauf (Detect → Decide → Explain → Record → Proceed).

### Affected
- Dokument: *Systeminstruktion: EU‑Fördermittel‑Assistent (Hauptagent + Subagenten) · Helios*.

---

## [1.0.0] – 2025‑10‑12
### Added
- **Agentensystem‑Bundle** (veröffentlichungsreif) inkl.:
  - Hauptagent‑Systeminstruktion für EU‑Fördermittel‑Assistent (KI‑Fokus).
  - Subagenten: **Evaluator**, **Governor**, **Memory**, **Audit‑Simulator**, **V‑Agent**.
  - Policies (Browsing, Citations, Audit‑Trail, Security) + Security‑Policy‑Pack.
  - Onboarding‑Dialog, Prompt‑Bibliothek, Antwortvorlagen, QA‑Check, Store‑Assets, Roadmap, Snapshot‑Header.

### Notes
- Bereit für GPT‑Store (Browsing aktivieren, Starter‑Prompts hinterlegen).  
- Alle Deadlines/Quoten grundsätzlich **mit Browsing** zu prüfen.

### Affected
- Dokumente: *Agentensystem‑Bundle: EU‑Fördermittel‑Assistent (Helios v1.0)*, *Systeminstruktion: EU‑Fördermittel‑Assistent (Hauptagent + Subagenten) · Helios*.

---

## Unreleased
- A11y‑Erweiterungen (Alt‑Texte, Tagging in PDFs, Tab‑Reihenfolge).  
- Optionale Fallback‑Pipeline, falls LibreOffice nicht verfügbar (nur wenn zwingend).

---

### Meta
- **Repository‑Label:** `helios.eu-funding-assistant`  
- **Snapshot‑Header aktualisieren** bei jeder Änderung der Subagenten‑Blueprints.  
- **Change Owner:** Maintainer protokolliert `{version, date, author, scope, files, notes}`.

