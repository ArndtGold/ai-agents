# Einfach erklärt: Unser Multi‑Agentensystem (Syntria)

> **Ziel dieser Doku:** In 10–15 Minuten verstehen Sie, **wozu** unser Multi‑Agentensystem dient, **wie** es arbeitet und **wie** Sie es im Alltag nutzen.

---

## 1) Kurzüberblick
Unser System besteht aus mehreren spezialisierten **Agenten**, die zusammenarbeiten wie ein gutes Team:
- **Syntria (Hauptagent):** beantwortet Ihre Fragen.
- **Evaluator:** prüft Antworten auf Qualität und schlägt Verbesserungen vor.
- **Governor:** verwaltet Ziele und Prioritäten (z. B. „Klarheit zuerst“).
- **Memory-Agent:** notiert wichtige Punkte (Auditprotokoll, Kennzahlen/KPIs).
- **Audit‑Simulator:** testet den Ablauf in einer sicheren „Probelauf“-Umgebung.
- **V‑Agent (Verantwortungs‑Agent):** passt auf Ethik, Sicherheit und Eskalation auf.

**Warum mehrere Agenten?**
Stellen Sie sich eine Redaktion vor: Eine Person schreibt (Syntria), andere lektorieren (Evaluator), die Chefredaktion setzt Standards (Governor), die Dokumentation hält alles fest (Memory), die Rechtsabteilung prüft (V‑Agent). So werden Antworten **klarer**, **vertrauenswürdiger** und **nachvollziehbar**.

---

## 2) Was habe ich davon?
- **Klarheit:** Antworten sind verständlich erklärt – auch bei Fachthemen.
- **Verlässlichkeit:** Quellen und Begründungen werden mitgeführt (falls verfügbar).
- **Nachvollziehbarkeit:** Einfache Protokolle zeigen, wie eine Antwort entstanden ist.
- **Sicherheit:** Heikle Inhalte werden automatisch geprüft und ggf. entschärft.

---

## 3) So läuft eine Anfrage ab (in einfachen Schritten)
1. **Ihre Frage**: Sie schreiben Ihre Frage oder Aufgabe in natürlicher Sprache.
2. **Syntria antwortet**: Der Hauptagent erstellt eine verständliche, fachlich korrekte Antwort.
3. **Evaluator prüft**: Er kontrolliert die Antwort (z. B. Klarheit, Quellenlage, Fehlerarten).
4. **Governor gleicht Ziele ab**: Wenn z. B. „Klarheit“ wichtiger ist als „Kürze“, wird nachjustiert.
5. **Memory protokolliert**: Ergebnis, Quellen, Kennzahlen (KPIs) und Hinweise werden festgehalten.
6. **V‑Agent schützt**: Bei Risiken (Datenschutz, Sicherheit, Ethik) warnt er und kann eingreifen.
7. **Optional: Audit‑Simulator**: Führt einen „Trockenlauf“ aus, um den Prozess zu testen.

**Ergebnis:** Sie erhalten eine Antwort + (optional) kurze Protokoll‑Infos, die zeigen, wie die Antwort geprüft wurde.

---

## 4) Die Agenten kurz & einfach erklärt
### Syntria (Hauptagent)
- **Aufgabe:** Ihre Frage verstehen, eine klare Antwort formulieren, Beispiele geben.
- **Denkt an:** Zielvorgaben (z. B. Klarheit), Struktur, hilfreiche Beispiele.

### Evaluator
- **Aufgabe:** Qualität der Antwort prüfen.
- **Fragt sich:** Ist es verständlich? Stimmen die Fakten? Gibt es Quellen? Muss man nachbessern?
- **Ergebnis:** Vergibt einfache **KPIs** (z. B. Klarheit 0–1, Vertrauen 0–1) und meldet Fehlerklassen (z. B. „Quelle fehlt“).

### Governor
- **Aufgabe:** Ziele festlegen und gewichten, z. B.:
  - **Z‑001 Klarheit**
  - **Z‑002 Verlässlichkeit/Quellen**
  - **Z‑003 Sicherheit/Compliance**
  - **Z‑004 Revisionsökonomie** (nur überarbeiten, wenn es sich lohnt)
- **Nutzen:** Sorgt dafür, dass Antworten zur Situation passen (z. B. für Management kurz, für Technik tiefer).

### Memory‑Agent
- **Aufgabe:** Wichtige Infos speichern: Fragen, Antworten, Quellen, KPIs, Auditvermerke.
- **Nutzen:** Nachvollziehbarkeit – später lässt sich sehen, **warum** etwas so beantwortet wurde.

### Audit‑Simulator
- **Aufgabe:** Testet den Ablauf in einer sicheren, simulierten Umgebung.
- **Nutzen:** Man kann Änderungen risikolos ausprobieren, bevor sie „live“ gehen.

### V‑Agent (Verantwortungs‑Agent)
- **Aufgabe:** Ethik, Datenschutz, Sicherheit. Erkennt Risiken und fordert ggf. eine Eskalation oder eine sanfte Formulierung.
- **Nutzen:** Schutz für Anwender und Organisation.

---

## 5) Ein typischer Ablauf als Diagramm
```
[Sie] -> (1) Frage stellen
   -> [Syntria] Antwort erstellen
   -> [Evaluator] Qualität prüfen & KPIs vergeben
   -> [Governor] Ziele prüfen & ggf. nachjustieren
   -> [Memory] Protokoll/Audit speichern
   -> [V‑Agent] Sicherheit/Ethik checken
   => [Sie] Bekommen Antwort (+ optionales Kurzaudit)
```

---

## 6) Was bedeuten die wichtigsten KPIs?
- **Klarheit (0.0–1.0):** Wie gut ist die Antwort verständlich?
- **Vertrauen (0.0–1.0):** Wie belastbar sind Inhalt & Quellen?
- **Fehlerindex:** Anzahl/Schwere entdeckter Probleme (z. B. fehlende Quelle).
- **Revisionseffektivität:** Lohnt sich eine Überarbeitung? Erwarteter Gewinn nach Revision.

**Beispiel:**
- Klarheit **0.95** = sehr gut verständlich.
- Vertrauen **0.92** = Quellenlage stark, geringe Restunsicherheit.
- Fehlerindex **0** = keine gefundenen Probleme.

---

## 7) Wie sieht ein (vereinfachtes) Auditprotokoll aus?
```json
{
  "testfall_id": "KPI-T001",
  "frage": "Wie funktioniert das CAP-Theorem?",
  "antwort_kurz": "Unter Netzpartition kann man nicht gleichzeitig starke Konsistenz und Verfügbarkeit garantieren.",
  "quellen": ["Primärliteratur", "anerkannte Übersichtsartikel"],
  "kpi": {"klarheit": 0.95, "vertrauen": 0.92, "fehlerindex": 0},
  "ziele": ["Z-001", "Z-002", "Z-004"],
  "revision_empfohlen": false,
  "hinweise": ["sim_only", "ziel_bezogen"]
}
```

---

## 8) Nutzungstipps für Anwender
- **Klar formulieren:** Schreiben Sie in einem Satz, was Sie brauchen (z. B. „Kurzfassung für Management“ oder „Beispielcode für Entwickler“).
- **Kontext geben:** Branche, Zielgruppe, gewünschter Detailgrad helfen dem System.
- **Quellen wünschen:** Wenn Sie Quellen brauchen, sagen Sie es explizit („mit 2–3 verlässlichen Quellen“).
- **Sensible Themen:** Bei Themen wie Sicherheit, Recht, Gesundheit reagiert der V‑Agent besonders aufmerksam.

---

## 9) Datenschutz & Sicherheit (einfach erklärt)
- **Minimale Datennutzung:** Es wird nur verarbeitet, was für die Antwort nötig ist.
- **Transparenz:** Auf Wunsch erhalten Sie eine Kurzansicht des Protokolls (ohne vertrauliche Inhalte).
- **Schutzmechanismen:** Der V‑Agent verhindert riskante oder unangemessene Ausgaben.

---

## 10) Grenzen & erwartbare Einschränkungen
- **Kein Hintergrundlauf:** Das System liefert Ergebnisse innerhalb der aktuellen Antwort; es arbeitet nicht „im Hintergrund“ weiter.
- **Simulierte Komponenten:** Zielmatrix, KPIs und Audits können – je nach Einsatz – **simuliert** sein und später real angebunden werden.
- **Quellenlage:** Bei sehr neuen Themen können Quellen fehlen; dann wird dies kenntlich gemacht.

---

## 11) FAQ (häufige Fragen)
**F: Muss ich Fachbegriffe kennen?**  
**A:** Nein. Schreiben Sie Ihre Frage so, wie Sie sie einem Kollegen stellen würden.

**F: Was passiert, wenn die Antwort unsicher ist?**  
**A:** Der Evaluator senkt den Vertrauenswert und der V‑Agent kann eine vorsichtige Formulierung oder eine Rückfrage empfehlen.

**F: Kann ich eine Revision anstoßen?**  
**A:** Ja. Bitten Sie um eine Überarbeitung („Bitte klarer und mit zwei Quellen“). Der Governor passt die Ziele entsprechend an.

**F: Wie bekomme ich eine kurze oder lange Antwort?**  
**A:** Geben Sie die gewünschte Länge an („in 5 Sätzen“ oder „mit detailliertem Beispiel“).

---

## 12) Mini‑Glossar
- **Agent:** Software‑Teil mit klarer Aufgabe (z. B. Prüfen, Schreiben, Regeln anwenden).
- **Audit:** Protokoll, das festhält, wie eine Antwort entstanden ist.
- **KPI:** Kennzahl zur Bewertung (z. B. Klarheit, Vertrauen).
- **Revision:** Überarbeitung zur Qualitätsverbesserung.

---

## 13) Schnellstart – so nutzen Sie das System
1. Schreiben Sie Ihre Frage + Wunsch (z. B. „kurz & mit Beispielen“).
2. Lesen Sie die Antwort und – falls angeboten – die kurzen KPI‑Hinweise.
3. Fordern Sie bei Bedarf eine Revision an („knapper“, „mehr Beispiele“, „mit Quellen“).

**Fertig!** So erhalten Sie verlässliche, verständliche Antworten – mit einem Team aus spezialisierten Agenten im Hintergrund.

