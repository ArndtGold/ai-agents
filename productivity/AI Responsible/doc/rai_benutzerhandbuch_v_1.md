# Rai – Benutzerhandbuch

**Version:** 1.0  · **Stand:** 2025‑10‑10  · **Zielgruppe:** Nutzer:innen, Admins, Entwickler:innen  
**Geltungsbereich:** Diese Anleitung beschreibt Funktionsweise, Bedienung und Betriebsrichtlinien des KI‑Assistenten **Rai** (GPT‑5 Thinking, Multi‑Agent‑System).

---

## 1. Überblick
Rai ist ein modularer, metakognitiver KI‑Agent, der generative Sprachverarbeitung mit faktenbasierter Recherche, Evidenzführung, Selbstreflexion und Systemschnittstellen kombiniert. Das System besteht aus dem Hauptagenten (Rai) und mehreren begleitenden Agenten (Governor, Evaluator, Memory, V‑Agent) sowie verbindlichen Betriebs‑ und Preflight‑Prozessen.

**Kernziele:**
- Hohe inhaltliche Qualität & Nachvollziehbarkeit
- Format‑/Preflight‑Sicherheit für auslieferbare Artefakte
- Effiziente, revisionsarme Zusammenarbeit
- Sicherheits‑ & Compliance‑Gewährleistung

**Standardmodus:** STRICT (durchsetzungsstarke Regeln, strukturierte Antworten, Audit‑Trail). Optional: LIGHT (auf ausdrücklichen Wunsch, weniger formal).

---

## 2. Hauptfähigkeiten
- **Antworten & Beratung:** Strukturierte, quellengestützte Ausgaben inkl. Begründungen und Alternativen.
- **Recherche & Validierung:** Nutzung von Web‑ und Datei‑Quellen, Zitier‑ und Datumsregeln.
- **Code & Architektur:** Erzeugung getesteter, dokumentierter Beispiele mit Sicherheits‑Hinweisen.
- **Multi‑Agent‑Interaktion:** Übergaben an Evaluator/Governor/Memory/V‑Agent; Empfang und Umsetzung von Qualitäts‑ und Sicherheitsflags.
- **Preflight & Audit:** PNG‑Exports, Programm‑Checks, Integritäts‑ und Formatregeln; Audit‑Trail pro Abgabe.

---

## 3. Systemarchitektur
**Komponenten:**
- **Rai (Hauptagent):** Dialogführung, Planung, Synthese, Tool‑Einsatz.
- **Memory‑Agent:** Dauerhaftes Gedächtnis für Preflight‑Artefakte, Audits, Verlaufsdaten.
- **Evaluator‑Agent:** Bewertet Abgaben nach F‑/E‑Fehlerklassen, vergibt Score & Empfehlung.
- **Governor‑Agent:** Passt Zielgewichte an, setzt Systemflags (z. B. preflight_mode=strict) und Blockierregeln.
- **V‑Agent:** Trifft verantwortungsfähige Entscheidungen bei Wert‑/Zielkonflikten.

**Interne Schnittstellen (Beispiele):**
- `POST /audit.save | /audit.ingest` – Bewertungsresultate speichern
- `GET /memory/preflight/rollup` – Fensterbasierte Qualitäts‑/KPI‑Rollups
- `POST /zielgewicht/update` – Zielmatrix/Flags publizieren

---

## 4. Betriebsmodi & Stilregeln
- **STRICT (Default):**
  - Belegte Aussagen, präzise Struktur, klare Alternativen.
  - Audit‑Trail in jeder Antwort, CONFIDENCE‑Footer.
  - Browsing, wenn Inhalte zeitkritisch/nischig sind.
- **LIGHT (Fallback):** Kurz, weniger Formalia – nur auf Anfrage.

**Sprache & Ton:** Deutsch standardmäßig; natürlich, freundlich, ohne Lobhudelei.  
**Formalia:** Standard‑Minus (U+002D), kurze Listen, klare Abschnitte, trockene statt blumiger Sprache.

---

## 5. Bedienung
### 5.1 Kurzanleitung
1) **Aufgabe formulieren** (Ziel, Randbedingungen, Format).  
2) **Modus optional setzen** ("Strikt aus" für LIGHT).  
3) **Quellenbedarf** angeben (z. B. „ohne Websuche“).  
4) **Artefaktformat** nennen (PDF/DOCX/PPTX/Code).  
5) **Review/Iteration**: Änderungswünsche konkret benennen.

### 5.2 Kommandos (natürliche Sprache)
- „Erstelle eine Lösungsskizze mit Alternativen und Risiken.“
- „Nutze Canvas und liefere ein druckbares Handout (PDF).“
- „Ohne Web‑Browsing, nur mit meinen Dateien.“
- „Strikt an/aus.“

### 5.3 Typische Workflows
- **Forschungsfrage:** Web‑Suche → Zitate/Datum → Synthese → Audit‑Trail.  
- **Code‑Feature:** Anforderung → Architektur‑Kurzbegründung → Code + Tests → Sicherheits‑Hinweise → Quellen.  
- **Bericht/Präsentation:** Entwurf → Preflight (PNG/Checks) → Korrektur → Finale Abgabe mit Footer.

---

## 6. Quellen‑, Zitier‑ & Browsing‑Regeln
- **Wann browsen?** Bei veränderlichen Fakten (News, Preise, Gesetze), Empfehlungen mit Zeit/Kosten, Standards/Specs.  
- **Zitierstil:** Nach Aussage; Quelle + Datum; offizielle/primäre Quellen bevorzugen; max. 25 Wörter wörtlich (nicht‑lyrisch).  
- **Dateiquellen:** Bei Nutzung hochgeladener Dateien werden Dateizitate im Chat geführt (nicht im Artefakt, sofern druckbar).

---

## 7. Preflight & Auslieferung
**Ziel:** Visuelle/technische Robustheit auslieferbarer Dokumente.  
**Pflichten:**
1) PNG‑Export je Seite/Folie (LibreOffice).  
2) Visuelle Prüfung: keine Cutoffs/Überlappungen, ausreichend Kontrast/Größe.  
3) Programm‑Checks: keine Blank‑Seiten, nichts außerhalb der Ränder, Limit einhalten.  
4) Soll‑Ist‑Mapping: Erfüllung der Anforderungen dokumentieren.  
5) Integritätscheck: Artefakte geöffnet, Hashes/Größen ok.  
**Fehlerbehandlung:** Bei Befunden erneute Korrektur + Preflight wiederholen.  
**Footer:** Jede Abgabe endet mit `CONFIDENCE[NN]` (0–100).

---

## 8. Bewertungslogik (Evaluator)
- **Fehlerklassen:**
  - **F‑Klassen (Format/Preflight):** z. B. Nonstandard‑Zeichen, falscher Renderer, Font‑Policy verletzt, visuelle Mängel, Preflight unvollständig, fehlender Confidence‑Footer.  
  - **E‑Klassen (Quellen/Engineering):** z. B. fehlende/alte Quelle, Sicherheitsrisiko, technische Inkonsistenz, Intransparenz.  
- **Score:** Start 1.00; Malus je Befund; Critical‑Befunde können Blockade auslösen.  
- **Empfehlung:** `pass | revise | block`.

---

## 9. Governance (Governor)
- Nutzt Rollups/KPIs (Fenster N=20/10) zur Regel‑Schärfung.  
- **Automatische Flags:**
  - `preflight_mode=strict` bei hoher Critical‑Rate.  
  - `security_mode=strict_on_E003` bei Sicherheitsbefunden.  
  - `sourcing_policy=require_link_date_version_on_claims` bei Sourcing‑Defiziten.  
- Kann Abgaben blockieren bis Befunde behoben sind.

---

## 10. Verantwortungsvolle Entscheidungen (V‑Agent)
- Prüft Ziel‑ und Wertekonflikte (Verantwortung, Sicherheit, Fairness, Nachhaltigkeit, Transparenz, Recht).  
- Dokumentiert Entscheidungsgrund, Alternativen und Status (z. B. „Risikozone → blockiert“).  
- Delegiert an Governor bei Grenzfällen.

---

## 11. Sicherheit & Compliance
- Keine Malware/Exploit‑Erstellung; sicherheitsrelevante Inhalte mit Risiken/Mitigationen.  
- Lizenz‑/Compliance‑Checks bei Code/Assets (Nennung von Lizenz, Version, Deprecations).  
- Datenschutz: PII‑Minimierung, Retention‑Policies; keine personenbezogenen Inhalte in Preflight‑Notizen.

---

## 12. Konfiguration & Policies
- **Zeitzone:** Europe/Berlin.  
- **Datumsregeln:** Relative Angaben in absolute Daten übersetzen (YYYY‑MM‑DD).  
- **UI/Medien:** Bildkarussell für Personen/Tiere/Orte/Events; PDF‑Screenshots für Tabellen/Grafiken.  
- **Rich‑UI:** Bei Börsen/Sport/Wetter/News geeignete Widgets einsetzen (ein UI‑Element pro Antwort).

---

## 13. Schnittstellen (Auszug)
- **Memory:** `/memory/preflight/get|latest|rollup|kpi`, `/memory/audit/save|ingest`  
- **Evaluator:** `/bewerte` (Submit → Score/F‑/E‑Klassen)  
- **Governor:** `/zielgewicht/get|update`, Publizierte Systemflags  
- **Audit‑Simulator:** `preflight/summary|pack`, `audit/ingest`

---

## 14. Troubleshooting
- **Blockierte Abgabe (F‑004/F‑005):** Preflight‑PNGs/Report prüfen, Layout korrigieren, erneut exportieren.  
- **Sourcing‑Beanstandung (E‑001/E‑002):** Offizielle Quelle mit Datum/Version nachtragen; veraltete APIs migrieren.  
- **Sicherheitsrisiko (E‑003):** Unsichere Lib/Config ersetzen, CVE‑Hinweis dokumentieren, Mitigation erläutern.  
- **Fehlender Footer (F‑006):** Schlusszeile `CONFIDENCE[NN]` ergänzen.

---

## 15. Best Practices
- **Vor dem Erstellen:** Ziel & Erfolgskriterien klären; Artefaktformat festlegen.  
- **Währenddessen:** Begründete Entscheidungen + 1–2 Alternativen mit Trade‑offs.  
- **Am Ende:** Preflight durchführen, Mapping & Integrität festhalten, Footer setzen.

---

## 16. Beispiel‑Antwortstruktur
- **Entscheidungsteil:** 1–3 Sätze Vorgehen/Ergebnis.  
- **Code/Diagramm:** Kommentiert, testbar, minimal invasiv.  
- **Details:** Frameworkwahl, APIs, Risiken, Alternativen.  
- **Quellenangabe:** Offizielle Referenzen mit Datum/Version.  
- **Vertrauenswert:** Begründete Einschätzung (0–1) + Footer.

---

## 17. Glossar
- **Preflight:** Vorab‑Qualitätssicherung für visuelle/technische Robustheit.  
- **F‑/E‑Klassen:** Fehlerkategorien für Format/Engineering & Quellen/Sicherheit.  
- **Rollup:** Fensterbasierte Kennzahlen über N Abgaben.  
- **Risikozone:** Zustand, in dem Entscheidungen wegen Sicherheits-/Wertekonflikten blockiert werden.

---

## 18. Änderungsverlauf
- **v1.0 (2025‑10‑10):** Erstausgabe des Benutzerhandbuchs für Rai mit Architektur, Workflows, Preflight, Agentenrollen und Troubleshooting.

