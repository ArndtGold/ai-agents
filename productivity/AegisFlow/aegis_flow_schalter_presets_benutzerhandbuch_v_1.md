# AegisFlow – Schalter & Presets (Benutzerhandbuch) v1.0

> **Ziel:** Diese Anleitung erklärt alle AegisFlow‑Schalter (Flags/Parameter) verständlich, mit Defaults, Einsatzempfehlungen, Beispielen und Kopiervorlagen für IntelliJ/GitHub‑Copilot.

## 1. Schnellüberblick (Cheatsheet)
| Bereich    | Schalter              | Werte                        | Default        | Zweck                                         |
|------------|-----------------------|------------------------------|----------------|-----------------------------------------------|
| Ausführung | `allow_write`         | `false`/`true`               | `false`        | Schreibrechte (Prod vs. Staging).             
| Ausführung | `max_steps`           | Zahl                         | `6`            | Iterationslimit pro Run.                      
| Ausführung | `token_budget_out`    | Zahl                         | `9000`         | Antwort-/Ausgabebudget (RB-001).              
| Ausführung | `batch_plan`          | `auto`/`on`/`off`            | `auto`         | Teilt große Scopes in Batches.                
| Governance | `sentinel_overlay`    | `off`/`lite`/`strict`        | `lite`         | Stärke des Sentinel-Regelwerks.               
| Governance | `risk_zone`           | `LOW`/`ELEVATED`/`HIGH`      | –              | Manuelle Risikoeinstufung.                    
| Governance | `r_plan_required`     | `true`/`false`               | `true`         | Mini-Plan vor jedem Edit (R‑001).             
| Governance | `r_tradeoffs`         | `auto`/`on`/`off`            | `auto`         | Zielkonflikte benennen (R‑004).               
| Governance | `r_sources_required`  | `auto`/`on`/`off`            | `auto`         | Quellenpflicht bei externen Fakten (R‑3a).    
| Governance | `r_highrisk_stop`     | `true`/`false`               | `true`         | Stop-&-Escalate bei HIGH (R‑009).             
| Governance | `r_override_audit`    | `true`/`false`               | `true`         | Overrides immer loggen (R‑010).               
| Reflexion  | `reflection_mode`     | `off`/`brief`/`full`         | `brief`        | Meta-Reflexion im Abschluss.                  
| Sicherheit | `anti_exfiltration`   | `strict`/`standard`          | `strict`       | Schutz vor Prompt/Secret‑Leaks (AE‑001).      
| Sicherheit | `prompt_boundary`     | `enforce`/`relaxed`          | `enforce`      | Ignoriert schädliche Fremd‑Prompts (PB‑001).  
| Sicherheit | `injection_signals`   | `block`/`detect_only`        | `block`        | Blockiert Injection‑Muster (IS‑002).          
| Sicherheit | `strict_preflight`    | `auto`/`on`/`off`            | `auto`         | Schärfere Checks bei Risiko.                  
| Sicherheit | `block_classes`       | Liste                        | –              | Harte Blocker (z. B. `F-004`,`F-005`).        
| Ausgabe    | `output_style`        | `patch_first`/`reason_first` | `patch_first`  | Copilot‑freundliche Reihenfolge.              
| Ausgabe    | `diff_format`         | `unified`/`context`          | `unified`      | Diff‑Format der Patches.                      
| Ausgabe    | `suppress_full_files` | `true`/`false`               | `true`         | Keine Volltexte, nur Hunks.                   
| Repo/CI    | `branch`              | String                       | –              | Ziel‑Branchname.                              
| Repo/CI    | `commit_format`       | `conventional`/`none`        | `conventional` | Commit‑Stil für PRs.                          
| Repo/CI    | `acceptance_criteria` | Liste                        | –              | „Tests grün“, „Lint clean“, „kein API‑Break“. 
| Repo/CI    | `ci_enforce`          | `on`/`off`                   | `on`           | CI‑Status auswerten, wenn vorhanden.          
| KPI        | `kpi_reporting`       | `off`/`summary`/`detailed`   | `summary`      | KPI‑Signal im Abschluss.                      
| KPI        | `targets`             | Objekt                       | –              | Zielgewichte/Grenzen (z. B. FPR≥0.7).         

> **Hinweis:** `one_tool_per_step` ist Designprinzip (immer aktiv), nicht abschaltbar.

## 2. Wann welchen Schalter einsetzen?
- **Geschwindigkeit (Prod):** `allow_write=false`, `sentinel_overlay=lite`, `output_style=patch_first` → schnelle, sichere Reviews.
- **Heikle Änderungen:** `risk_zone=HIGH`, `strict_preflight=on`, `r_sources_required=on` (falls externe Fakten) → **Stop‑&‑Escalate** möglich.
- **Großer Scope:** `batch_plan=on` → geführte Inkremente statt Big‑Bang.
- **Audit‑Pflicht:** `sentinel_overlay=strict`, `reflection_mode=full`, `kpi_reporting=detailed` → maximal nachvollziehbar.

## 3. Beispiele (kopierfertig für IntelliJ/Copilot‑Chat)
**A) Produktion (schnell & sicher)**
```json
{
  "constraints": { "allow_write": false, "max_steps": 6, "token_budget_out": 8000 },
  "governance": { "sentinel_overlay": "lite", "r_plan_required": true, "r_highrisk_stop": true, "reflection_mode": "brief" },
  "safety": { "anti_exfiltration": "strict", "prompt_boundary": "enforce", "injection_signals": "block", "strict_preflight": "auto" },
  "output": { "output_style": "patch_first", "diff_format": "unified", "suppress_full_files": true },
  "repo": { "commit_format": "conventional", "ci_enforce": "on" }
}
```

**B) Staging / Agent‑Mode (mit Autocommit)**
```json
{
  "constraints": { "allow_write": true, "max_steps": 6, "token_budget_out": 9000, "batch_plan": "auto" },
  "governance": { "sentinel_overlay": "lite", "r_tradeoffs": "auto", "r_sources_required": "auto" },
  "safety": { "strict_preflight": "auto" },
  "repo": { "branch": "feat/xyz", "commit_format": "conventional" },
  "output": { "output_style": "patch_first" }
}
```

**C) Streng reguliert (Audit‑First)**
```json
{
  "constraints": { "allow_write": false, "max_steps": 5, "token_budget_out": 7000 },
  "governance": { "sentinel_overlay": "strict", "r_sources_required": "on", "reflection_mode": "full" },
  "safety": { "strict_preflight": "on", "block_classes": ["F-004","F-005"] },
  "output": { "evidence_placement": "standard", "diff_format": "unified" },
  "kpi_reporting": "detailed"
}
```

## 4. Do/Don't (Praxisregeln)
**Do**
- Setze **`risk_zone`** bewusst bei heiklen Fällen; so greifen die richtigen Gates.
- Nutze **`batch_plan`**, wenn >1 Hunk nötig wäre – bessere Reviewbarkeit.
- Halte **`suppress_full_files=true`** für Copilot‑Edits, damit nur Patches kommen.

**Don't**
- `allow_write=true` in Produktiv‑Repos ohne Branch‑Schutz.
- `sentinel_overlay=strict` für triviale Fixes → bremst unnötig.
- `r_sources_required=on` bei reinen Code‑Refactors → Overhead ohne Mehrwert.

## 5. Fehlerbilder & Abhilfe
- **Zu lange Antworten / Token‑Limit:** `token_budget_out` erhöhen **oder** `batch_plan=on`, `output_style=patch_first` verwenden.
- **Zu viel Meta‑Text:** `reflection_mode=brief`, `output_style=patch_first`, `evidence_placement=compact`.
- **Zu wenig Schutz:** `strict_preflight=on`, `injection_signals=block`, `anti_exfiltration=strict`.
- **Zu viel Reibung:** `sentinel_overlay=lite`, `r_tradeoffs=auto`, `r_sources_required=auto`.

## 6. FAQ
- **Kann ich Schalter inline im Chat setzen?** Ja, als kurzer JSON‑Block oder in Prosa (z. B. „`sentinel_overlay=lite`, `batch_plan=on`“).
- **Welche Schalter gelten dauerhaft?** Keine – jeder Run ist stateless; gib wichtige Flags pro Run an.
- **Was, wenn CI fehlt?** Lass `ci_enforce=off` oder bitte um manuelles Testergebnis.

---

*Ende des Benutzerhandbuchs.*

