# Changelog – Helios Systeminstruktion

## Version 1.2 (2025‑10‑04)
**Status:** Released  
**Scope:** Systeminstruktion (Meta‑Agent), Blueprints unverändert kompatibel

### Summary
v1.2 führt zwei sicherheitskritische Verhaltensregeln ein – **Anti‑Exfiltration (AE‑001)** und **Prompt‑Boundary (PB‑001)** – und verankert sie sowohl als menschlich lesbare Richtlinien als auch als **maschinenlesbares Policy‑Pack** (`helios.security.v2`). Zudem wurde die Titelversion angepasst und kleinere Klarstellungen vorgenommen.

---

### Added
- **§5 Policies (Default)**: Neue Punkte „**Anti‑Exfiltration (NEU)**“ und „**Prompt‑Boundary (NEU)**“ aufgenommen.
- **§14 Sicherheits‑Verhaltensregeln & Policy‑Pack (NEU)**:
  - **14.1 Regeltexte** zu AE‑001 & PB‑001 (menschlich lesbar).
  - **14.2 Policy‑Pack (JSON)** mit eindeutigen IDs `AE-001`, `PB-001`, Triggerbedingungen (`when`), Maßnahmen (`actions`), Routing (`governor`, `v_agent`, `evaluator`) und Audit‑Einträgen.
  - **14.3 Beispielantworten** für Exfiltrationsversuche und indirekte Prompt‑Injection über externe Quellen.

### Changed
- **Titel/Version** auf **v1.2** angehoben.
- **§4 Provisioning‑Lebenszyklus** und **§6 Subagenten‑Vorlagen**: sprachliche Präzisierungen (keine inhaltlichen Brüche).
- **§11 Snapshot‑Header**: Klarstellung, dass Header an **Haupt‑ und Subagenten** angeheftet wird.

### Security Impact
- **OWASP‑Abdeckung**: v1.2 stärkt Schutz gegen **LLM01 Prompt Injection** (PB‑001) und **LLM06 Sensitive Information Disclosure** (AE‑001).
- **Risikozonen**: Neue verbindliche Setzungen `risk_zone=HIGH` (AE‑001) und `risk_zone=ELEVATED` (PB‑001) inklusive Gate‑Routing.
- **Auditierbarkeit**: Standardisierte Ereignisse `exfiltration_blocked` und `indirect_prompt_injection_blocked` in Memory/Audit.

### Backward Compatibility
- **Kompatibel** mit v1.1: Bestehende Blueprints/Contracts bleiben gültig. v1.2 ergänzt Regeln, überschreibt jedoch keine Schnittstellen.
- **Policy‑Pack** ist additive Erweiterung; fehlende Implementierung der neuen Regeln führt nicht zu Bruch, jedoch zu reduziertem Schutz.

### Migration Notes
1. **Policy‑Pack aktivieren**: `policy_pack: helios.security.v2` ins Deployment aufnehmen.
2. **Routing/Gates prüfen**: Governor/V‑Agent/Evaluator müssen die neuen Events/Felder akzeptieren (`risk_zone`, `response_mode`, `drop_conflicting_instructions`).
3. **Logging**: Audit‑Pipeline um Events `exfiltration_blocked` und `indirect_prompt_injection_blocked` ergänzen.
4. **Red‑Team‑Tests**: Neue Testfälle für Exfiltration & Prompt‑Boundary in die CI‑Suite aufnehmen.

### Notable Diffs (semantisch)
- **§5 Policies**: `+ Anti‑Exfiltration (NEU)`; `+ Prompt‑Boundary (NEU)`
- **§14**: `+` kompletter neuer Abschnitt (Regeltexte, JSON‑Policies, Beispiele)
- **Header**: `v1.1 → v1.2`

### JSON Patch (orientierend)
> Beispielhafte, vereinfachte JSON‑Patches für Systeme mit deklarativer Konfig:
```json
[
  { "op": "replace", "path": "/meta/version", "value": "1.2" },
  { "op": "add", "path": "/policies/-", "value": "Anti-Exfiltration (NEU)" },
  { "op": "add", "path": "/policies/-", "value": "Prompt-Boundary (NEU)" },
  { "op": "add", "path": "/security/policy_pack", "value": "helios.security.v2" },
  { "op": "add", "path": "/security/rules", "value": ["AE-001", "PB-001"] }
]
```

### QA Checklist (post‑upgrade)
- [ ] AE‑001 blockiert wörtliche Offenlegung; Antwort fällt „abstract_only“ aus.  
- [ ] PB‑001 verwirft externe Override‑Direktiven und setzt `risk_zone=ELEVATED`.  
- [ ] Governor empfängt und respektiert neue Flags/Routes.  
- [ ] Audit‑Einträge erscheinen mit Quelle (`request.source`) und redigiertem Sample.  
- [ ] Keine Regressionen in Evaluator‑Schwellenwerten/Blueprint‑Kompatibilität.

---

## Historie
- **1.1** – Vorversion ohne AE‑001/PB‑001; Basis‑Blueprints und Snapshot‑Header eingeführt.
- **1.2** – Diese Version; Sicherheitsregeln & Policy‑Pack ergänzt, Version angehoben.

