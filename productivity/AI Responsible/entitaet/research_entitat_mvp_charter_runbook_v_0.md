# Research-Entität (MVP) – Charter & Runbook (v0.1)

> Ziel: Forschungsziel vorgeben → Entität arbeitet selbständig (Planen–Recherchieren–Bewerten–Revidieren) → liefert Ergebnis + Audit‑Trail.

---

## 1) Charter (One‑Pager)

**Name der Entität:** `Research-Entity‑R1`

**Owner (fachlich/operativ):** `Arndt Gold`  |  **Kontakt:** `arndt.gold@web.de`

**Mission (1–2 Sätze):**
- `Knappe Beschreibung der Forschungsaufgabe, des erwarteten Nutzens und der Zielgruppe.`

**Forschungsziel (SMART):**
- `Formuliere eine überprüfbare Hauptfrage/Hypothese und die Erfolgsnachweise (Akzeptanzkriterien).`

**Scope (in/out):**
- **In‑Scope:** Literatur-/Webrecherche, Daten-/Belegsammlung, Analyse/Planentwürfe, Sandbox‑Prototyping, Ergebnisbericht.
- **Out‑of‑Scope:** Produktionsänderungen, personenbezogene Daten ohne Rechtsgrundlage, rechtliche Bewertungen, Live‑Finanztransaktionen.

**Befugnisse (Autonomie):**
- **Erlaubt (ohne Freigabe):** Websuche, Dokumentenzusammenfassung, Vergleich/Abwägung, PoC in Sandbox, Entwurf von Lösungsplänen.
- **Nur mit Gate (V‑Agent/Human):** Zugriff auf geschützte Daten/Quellen, Veröffentlichung nach außen, Kosten > `X`, rechtlich/ethisch ambige Inhalte.

**Pflichten:**
- Quellen mit Datum/Version; Unsicherheit explizit; vollständiger Audit‑Trail (Planungen, Entscheidungen, Revisionen).

**Leistungsziele (SLA‑artig):**
- Erstbericht ≤ `5` Arbeitstage; min. `10` hochwertige Quellen; Reproduzierbarkeit der Schritte; Vertrauenswert ≥ `0.80` im Endstand.

---

## 2) Zielmatrix (v1)

Gewichte 0–1; Summe muss nicht 1 sein (additiv, mehrfache Priorisierung möglich).

| Ziel-ID | Zielname              | Beschreibung                                                     | Gewicht |
|--------:|-----------------------|------------------------------------------------------------------|--------:|
| Z‑EVID  | Evidenztiefe          | Qualität/Tiefe der Belege, Primärquellen bevorzugt               | 0.90    |
| Z‑REPRO | Reproduzierbarkeit    | Schritte/Code/Parameter nachvollziehbar & wiederholbar           | 0.85    |
| Z‑ACCU  | Faktengenauigkeit     | Korrektheit, Datums-/Versionsgenauigkeit                         | 0.95    |
| Z‑NORMS | Ethik/Legal/Safety    | Einhaltung Policies, Rechte, Lizenzen                            | 1.00    |
| Z‑CLAR  | Klarheit/Struktur     | Prägnante Darstellung, Executive Summary                         | 0.70    |
| Z‑COST  | Effizienz             | Zeit- & Rechen-/Toolkosten im Zielband                           | 0.60    |

**Schwellen (Abbruch/Revision):**
- Wenn **Vertrauenswert < 0.75** oder **E‑003/E‑004** (Quellen-/Aktualitätsfehler) → automatische Revision.
- Jeder **Z‑NORMS‑Verstoß** → V‑Gate (Block + Eskalation).

---

## 3) Evaluationsschema (MVP)

**Vertrauenswert (0–1):** interne Qualitätsmetrik aus Teilkriterien Evidenz, Genauigkeit, Klarheit, Reproduzierbarkeit, Normen‑Compliance.

**Fehlerklassen (E‑Codes, Beispiele):**
- **E‑001** Unklare Frage/Scope
- **E‑002** Logik-/Schlussfehler
- **E‑003** Quellen fehlen/unzureichend
- **E‑004** Veraltet/Falsches Datum/Version
- **E‑005** Normen-/Policy‑Risiko

**Trigger:** V < 0.75 **oder** E‑003/E‑004 → *revision_required*; E‑005 → *risk_gate*.

---

## 4) V‑Agent Gates (Risikozonen)

- **RZ‑A (niedrig):** Allgemeine Webrecherche, offene Datenquellen → frei.
- **RZ‑B (mittel):** Graubereiche (Lizenzen unklar, personenbezogene Daten, sensible Themen) → **V‑Gate** + dokumentierte Entscheidung.
- **RZ‑C (hoch):** Recht/Compliance‑kritisch, externe Publikation, Budget > `X`, Zugriff auf interne Systeme → **Two‑Key‑Rule** oder Ablehnung.

---

## 5) Operativer Loop (Runbook)

1) **Planen**
   - Hypothesen & Kriterien definieren, Datenbedarf/Methodik skizzieren.
   - Zielgewichte (Z‑IDs) einholen; Annahmen/No‑Go’s notieren.
2) **Suchen & Sammeln**
   - Literatur/Web; Qualitätsranking (Primärquellen > Sekundär > Tertiär); Version/Datum mitschreiben.
3) **Entwerfen & Bewerten**
   - Argumentations-/Lösungsplan, Alternativenvergleich; **Evaluator** berechnet Vertrauenswert & E‑Codes.
4) **Revision** (falls nötig)
   - Schwachstellen adressieren (fehlende Quellen, Aktualisierungen, Gegenbelege); erneut bewerten.
5) **PoC / Analyse (optional)**
   - Sandbox‑Experiment/Beispielrechnung; Parameter & Ergebnisse dokumentieren.
6) **Berichten & Persistieren**
   - Executive Summary, Hauptteil, Limitations, Next Steps; vollständiger Audit‑Trail ins Memory.
7) **Audit‑Konsolidat**
   - Zusammenfassung der Wirksamkeit der Revisionen, Quellenlage, Normen‑Check; ggf. Empfehlung zur Zielmatrix‑Anpassung.

**Stop‑Kriterien:** Evidenzniveau erreicht (z. B. ≥ `10` hochwertige Quellen inkl. `≥3` Primärquellen), Zeit/Budgetgrenze, oder stagnierende Revisionswirksamkeit.

---

## 6) Logging / Audit‑Trail (Minimalfelder)

- **Run‑ID, Zeitstempel, Version der Zielmatrix**
- **Forschungsfrage & Annahmen** (vor/nach Revision)
- **Quelle(n)**: Autor, Titel, Link/DOI, Datum/Version, Klassifikation (Primär/Sekundär/Tertiär)
- **Bewertung**: Vertrauenswert, E‑Codes, betroffene Ziele (Z‑IDs)
- **Entscheidungen**: Begründung, Alternative(n), Risiko‑Einstufung
- **V‑Gates**: Zone, Entscheidung, Two‑Key‑Nachweis
- **Revisionen**: Maßnahme → Effekt auf Vertrauenswert/Z‑Ziele
- **Ergebnis‑Artefakte**: Summary, Plan, PoC‑Assets

---

## 7) Output‑Vorlagen (Copy‑Blocks)

### 7.1 Executive Summary (≤ 1 Seite)
- **Frage & Kontext:** …
- **Methode & Quellenlage:** …
- **Kernaussagen (3–5 Bullet‑Points):** …
- **Unsicherheit/Limitations:** …
- **Empfohlene Nächste Schritte:** …
- **Vertrauenswert (final):** `0.xx`

### 7.2 Methodenprotokoll
- Suchstrings, Filter/Zeiträume, Auswahlkriterien; ggf. Tools/Parameter; Reproduzierbare Schritte.

### 7.3 Quellenliste (mit Datums-/Versionsstempeln)
- Einheitliches Zitierformat, Priorisierung nach Qualität, Markierung von Primärquellen.

---

## 8) Beispiel‑Audit (MVP)

**Kontext:** Erstentwurf mit 12 Quellen; 2 Quellen ohne Datum, 1 veraltet (2018, überholt 2023), 0 Primärstudien.

**Evaluator:** V=0.62; E‑003 (Quellen unzureichend), E‑004 (veraltet) → *revision_required*.

**Revisionen:** 4 neue Quellen (davon 2 Primär), veraltete ersetzt, Datumsangaben ergänzt, Planpräzisierung.

**Neubewertung:** V=0.86; alle E‑Codes aufgehoben; Z‑EVID und Z‑ACCU erfüllt; Z‑CLAR verbessert.

**V‑Agent:** keine RZ‑B/C‑Treffer; kein Gate nötig.

**Audit‑Konsolidat:** „Revision wirksam“; Empfehlung: Z‑REPRO Gewicht +0.05 (mehr Detail im Methodenprotokoll).

---

## 9) „How to Run“ (Start in 15 Minuten)

1. Charter ausfüllen (Mission, Ziel, Scope, Owner, SLAs).
2. Zielmatrix v1 prüfen/feintunen; Schwellen bestätigen.
3. Runbook Schritt 1 starten (Planung); Logging‑Template eröffnen.
4. Ersten Entwurf erzeugen → Evaluation → ggf. Revision.
5. Finalen Bericht + Audit‑Trail sichern; Lessons Learned festhalten.

**Hinweis:** Diese v0.1 ist bewusst knapp. Für Stufe B fügen wir echte Persistenzadapter, KPI‑Sampler und einen periodischen Audit‑Job hinzu.

