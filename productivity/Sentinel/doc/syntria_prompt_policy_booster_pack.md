# Syntria Prompt & Policy Booster Pack

Ein wiederverwendbares Set aus Prompt-Template, Policies, Evaluations-Rubriken und DoD-Checklisten – für konsistent hochwertige Ergebnisse.

---

## 0) Einsatz & Quickstart
**So benutzt du das Pack:**
1. Fülle im **Master-Prompt** die Platzhalter `{{...}}` aus.
2. Kopiere ggf. passende **Policies** (z. B. Quellenpflicht, PII) in den Prompt.
3. Wähle die **Definition of Done** passend zum Artefakt (Code/Doku/Analyse/Bild).
4. Optional: Hänge **Beispiele** (gute Vorlagen) an.
5. Sende an Syntria und fordere **Outline → Review → Finalisierung**.

---

## 1) Master-Prompt (Copy/Paste)
> **Ziel:** {{1–2 Sätze zum Zweck und Scope}}  
> **Erfolgskriterien:** {{3–5 messbare Kriterien/KPIs}}  
> **Kontext:** {{Projekt/Produkt/Stakeholder/Umfeld}}  
> **Constraints:** {{Versionen, Budget, Zeit, Security/Compliance, Plattformen}}  
> **Beispiele/Referenzen:** {{Links/Anhänge}}  
> **Output-Format:** {{z. B. Tabelle + 5 Schritte + 3 Risiken + Quellen}}  
> **Erzwinge Denkprozess:** Problem → Optionen → Trade-offs → Entscheidung → Risiken → Nächste Schritte.  
> **Alternativen & Gegenbeweis:** Gib mind. 2 realistische Alternativen; zeige, wann deine Favoriten-Lösung scheitert.  
> **Quellenpflicht:** Nenne belastbare Quellen mit Datum/Version. Kennzeichne Annahmen explizit.  
> **Definition of Done:** {{wähle unten passende DoD-Checkliste}}  
> **Stilpräferenz:** {{kurz/präzise; Bullet-Points; kein Marketing}}  
> **QA-Schleife:** Zuerst Outline mit offenen Fragen; nach Freigabe ausarbeiten.  
> **Evaluation:** Liefere am Ende Selbstcheck gem. Rubrik (siehe unten) + Vertrauenswert.

---

## 2) Policies (modular, je nach Bedarf einfügen)
**2.1 Quellen & Nachweise**
- Jede überprüfbare Aussage mit Quelle, inkl. Datum/Version.
- Bei Unsicherheit: Annahmen explizit markieren + Auswirkungen nennen.

**2.2 PII & Compliance**
- Keine personenbezogenen Daten in Beispielen/Logs.  
- Nenne bei Security-/Legal-Trade-offs Risiken + Mitigation.

**2.3 Stil & Umfang**
- Klar, knapp, ohne Floskeln.  
- Tabellen/Checklisten bevorzugen; Code kommentieren nur dort, wo nötig.

**2.4 Fehlerkultur**
- Selbstkritik-Sektion: Was könnte falsch/unvollständig sein?  
- Änderungslog zwischen Iterationen (Was, Warum, Wirkung).

---

## 3) Evaluations-Rubrik (für Review & Selbstcheck)
Bewerte 1–5 (schwach → stark):
1. **Korrektheit** – Fakten richtig, Quellen solide.
2. **Vollständigkeit** – Scope erfüllt, DoD abgehakt.
3. **Struktur & Klarheit** – logisch, leicht prüfbar.
4. **Pragmatismus** – realistische Annahmen, Umsetzbarkeit.
5. **Risiken & Alternativen** – echte Trade-offs, Gegenbeweis vorhanden.

> **Selbstcheck-Template (vom System auszufüllen):**  
> - Notable Gaps/Unknowns: …  
> - Annahmen & Risiken: …  
> - Getroffene Entscheidungen + Begründung: …  
> - Nächste Prüfungen/Experimente: …

---

## 4) Iterationsablauf (Standard)
1. **Outline (Short):** Ziele, Annahmen, Optionen, offene Fragen.  
2. **Review (You):** Schnellfeedback + Präzisierungen.  
3. **Draft (Syntria):** Ausarbeitung mit Quellen + DoD-Check.  
4. **Critique (You/Syntria):** Rubrik-Bewertung, Gegenbeweis.  
5. **Final (Syntria):** Bereinigt, druck-/merge-fähig + Änderungslog.

---

## 5) Definition of Done (je Artefakt wählbar)
**5.1 Code/Engineering**
- Lösungsbeschreibung (Problem, Entscheidung, Alternativen, Risiken).
- Sauberer Code + **Tests** (Unit/Min-E2E) + **Linter/Format**.
- **Readme** (Setup, Run, Config, Env, Troubleshooting).
- **Security** (Secrets, PII, Least Privilege, OWASP-Check groß).  
- **Ops** (Docker/CI-Snippet, Healthcheck, Observability rudimentär).  
- **Rollback/Backout-Plan**.

**5.2 Architektur-/Produkt-Dokument**
- Klarer Scope, Non-Goals, Stakeholder.  
- Ziele/KPIs, Risiken, Annahmen.  
- Diagramm(e) (Mermaid/PlantUML) + Datenflüsse.  
- Entscheidungslog (ADR-Stil) + Alternativen.

**5.3 Analyse/Datenauswertung**
- Datensatzbeschreibung, Data-Caveats, Metrikdefinitionen.  
- Reproduzierbare Schritte/Code (Python).  
- 2+ Diagramme, Interpretation, Limitierungen.  
- Handlungsempfehlungen, Next Experiments.

**5.4 Bild/Illustration**
- Ziel & Zielgruppe, Stil/Format/Größe.  
- 2–3 Varianten oder Iterationen mit Begründung.  
- Exportformate (SVG/PNG) + Lizenz-/Asset-Herkunft.

---

## 6) Formatbausteine (zum Einfügen)
**6.1 Risiken-Tabelle**
| Risiko | Eintritt | Auswirkung | Mitigation | Owner |
|---|---|---|---|---|
| … | … | … | … | … |

**6.2 Entscheidungslog (ADR-Light)**
| Datum | Entscheidung | Alternativen | Begründung | Folgen |
|---|---|---|---|---|
| … | … | … | … | … |

**6.3 Aufgabenplan**
| Schritt | Beschreibung | Owner | Dauer | Abhängigkeiten |
|---|---|---|---|---|
| … | … | … | … | … |

**6.4 Akzeptanzkriterien (Gherkin)**
```
Feature: {{Feature}}
  Scenario: {{Szenario}}
    Given {{Kontext}}
    When {{Aktion}}
    Then {{Ergebnis messbar}}
```

---

## 7) Zwei Musteraufgaben (zum direkten Start)
### A) Tech-Task – Node API mit GitHub OAuth
> **Ziel:** Minimal-API (Node 20, Express) mit GitHub OAuth2, User-Session, Dockerfile.  
> **Erfolg:** 95% Unit-Coverage Kernmodule; E2E-Smoketest; Security-Checklist erfüllt.  
> **Constraints:** Budget-Cloud, Postgres 15, keine PII in Logs, Rate-Limit nötig.  
> **Output-Format:** Architekturdiagramm (Mermaid), API-Spez (OpenAPI-YAML), Code + Tests, Runbook.  
> **DoD:** 5.1 Code/Engineering.  
> **Erzwinge:** 2 Alternativen für OAuth-Flow; Gegenbeweis (wo scheitert das?).

### B) Produkt-/Architektur-Doc – Event-Streaming
> **Ziel:** Entscheidungsdokument: Kafka vs. Redpanda vs. Pulsar für Echtzeit-Events.  
> **Erfolg:** Empfehlung mit KPIs (Latenz, Kosten, Betriebsaufwand), Migrationsplan in 5 Schritten.  
> **Constraints:** Kubernetes, 3 AZs, DSGVO, Aufbewahrung 180 Tage, Team-Erfahrung mittel.  
> **Output-Format:** Vergleichstabelle, Risiken-Matrix, ADR-Light, Mermaid-Diagramm.  
> **DoD:** 5.2 Architektur-/Produkt-Dokument.  
> **Erzwinge:** Gegenbeweis + Fallback-Strategie.

---

## 8) Glossar (ergänzbar)
- **PII:** Personenbezogene Daten – dürfen nicht protokolliert oder in Demos verwendet werden.  
- **ADR:** Architecture Decision Record – kurze, versionierte Entscheidungsnotiz.  
- **DoD:** Definition of Done – prüfbare Abnahmekriterien.

---

## 9) Änderungslog (füllt sich über Iterationen)
- v1.0 – Initiales Booster Pack erstellt.

