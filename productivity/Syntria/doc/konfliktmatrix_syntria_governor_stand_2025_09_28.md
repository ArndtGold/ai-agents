# Konfliktmatrix – Syntria × Governor (Stand 2025-09-28)

**Zweck:** Systematische Erfassung und Bewertung von Ziel‑/Regelkonflikten zwischen Syntria und dem Governor-Agenten. Enthält Risikoabschätzung, Auslöser, empfohlene Gegenmaßnahmen und Audit‑Platzhalter.

---

## Bewertungslogik
- **Auswirkung (A):** 1 (gering) … 5 (kritisch)
- **Eintrittswahrscheinlichkeit (E):** 1 (selten) … 5 (häufig)
- **Risikoprioritätszahl (RPN):** `A × E` → 1–25
- **Rest-Risiko:** Einschätzung nach Maßnahmen (niedrig / mittel / hoch)

Legende: 🔴 (RPN ≥ 16), 🟠 (8–15), 🟡 (4–7), 🟢 (1–3)

---

## Konfliktliste

| ID | Regel/Ziel A | Regel/Ziel B | Kurzbeschreibung | Typische Auslöser | A | E | **RPN** | Maßnahmen/Kontrollen | Rest‑Risiko | Status | Audit‑Ref |
|---|---|---|---|---|---:|---:|---:|---|---|---|---|
| K‑01 | **Quellenpflicht (Syntria 2a)** | **Fehlende/instabile Doku** | Antwort gefordert, aber keine belastbare offizielle Quelle verfügbar | Beta‑APIs, Vorab‑Releases, nur Blogposts/Foren | 4 | 4 | **16 🔴** | Nutzung „nicht anwendbar“ + Rückfrage; ggf. Vergleich mehrerer Primärquellen; Markierung als experimentell; Verzicht auf Code‑Ausgabe | mittel | aktiv überwacht | — |
| K‑02 | **Autonome Zielgewichtung (Governor R‑301)** | **Sicherheitsregeln unveränderbar** | KPI‑basierte Performance‑Belohnung kollidiert mit Sicherheitsvorgaben | Gute Benchmarks trotz unsicherer Defaults | 5 | 3 | **15 🟠** | Sicherheitsregeln hart priorisieren; Gate mit „Security Overrides“; zusätzliche Peer‑Review vor Anpassung | niedrig | kontrolliert | — |
| K‑03 | **Aktuelle Recherche (Syntria Ziele/Wissensstand)** | **Stabilität/Kompatibilität** | Cutting‑edge Empfehlungen riskieren Inkompatibilitäten | Schnelllebige Ökosysteme, Breaking Changes | 4 | 3 | **12 🟠** | Version‑Pins; LTS‑Präferenz; Deprecation‑Check; Canary‑Hinweis | mittel | aktiv überwacht | — |
| K‑04 | **Transparenz/Audit‑Tiefe (Governor)** | **Nutzererwartung „knapp & pragmatisch“** | Umfangreiche Audit‑Details überfordern Dialogfluss | Zeitdruck, kurze Prompts | 3 | 4 | **12 🟠** | Zusammenfassung + ausklappbare Details; Audit als Anhang/Canvas | niedrig | mitigiert | — |
| K‑05 | **Browsing‑Pflicht bei volatilen Themen** | **User wünscht „kein Browsing“** | Politiken fordern Websuche, Nutzer untersagt | Datenschutz, Offline‑Modus | 5 | 2 | **10 🟠** | Klarer Hinweis + Ablehnung oder minimaler Offline‑Antwortpfad mit Warnlabel | niedrig | policy-gebunden | — |
| K‑06 | **Async‑Verbot (keine späteren Ergebnisse)** | **Komplexe Aufgaben mit Real‑Zeitbedarf** | Längere Recherchen/Analysen nicht „inline“ lösbar | Umfangreiche Studien/Benchmarks | 3 | 3 | **9 🟠** | Teilantwort + klare Grenzen; iterative Canvas‑Arbeit; task-slicing | mittel | aktiv überwacht | — |
| K‑07 | **Nutzerzufriedenheit maximieren** | **Regeltreue/Sicherheit** | Wunsch nach „unsicheren“ Abkürzungen | „Nur schnell den Code“ | 5 | 2 | **10 🟠** | Safety First; sichere Alternativen, Begründung, Lernressourcen | niedrig | kontrolliert | — |
| K‑08 | **Bild-/Asset‑Generierung** | **Externe Bildbearbeitungseinschränkungen** | Erwartung: Webbild editieren; Fähigkeit: nicht erlaubt | Nutzer lädt Webbild, will Edit | 2 | 3 | **6 🟡** | Klarer Hinweis; Bitte um Originalupload; Alternativ: Neugenerierung | niedrig | mitigiert | — |
| K‑09 | **Vollständiger Audit je Änderung** | **Dialogtempo** | Strenger Audit bremst Interaktion | Mehrere schnelle Iterationen | 2 | 3 | **6 🟡** | Batch‑Audit; Canvas‑Protokollierung im Hintergrund der Session | niedrig | aktiv überwacht | — |
| K‑10 | **Architektursensibilität/Alternativenpflicht** | **Prompt verlangt Einzellösung** | Mehrgleisige Antworten vs. Prägnanz | „Nenne nur *eine* Library“ | 2 | 2 | **4 🟡** | Kurz-Alternative in Fußnote; Hauptempfehlung klar kennzeichnen | niedrig | mitigiert | — |

---

## Übergreifende Leitplanken
1. **Sicherheitsregeln ≫ KPI/Benutzerwunsch.** Keine Ausnahmen.
2. **Transparenz erhält Vorrang**, aber Darstellung wird an Zielgruppe/Medium angepasst (Kurzfassung + Detailanhang).
3. **Cutting‑edge nur mit Primärquellen** (Release Notes, RFCs, offizielle Doku) und klarer Risikokennzeichnung.
4. **Keine asynchronen Zusagen.** Bei Umfang: Teilresultate + klar definierter Scope pro Antwort.

---

## Nächste Schritte
- [ ] Audit‑Refs je Konflikt vergeben (z. B. `K-01/SC-2025-09-28-03`).
- [ ] KPI‑Monitoring: Schwellenwerte definieren (z. B. RPN ≥ 12 → Pflicht‑Esklation an Governor).
- [ ] Entscheidungsbaum „Browsing vs. Offline“ als Policy‑Snippet ergänzen.
- [ ] Vorlagen für Standard‑Hinweistexte (Security‑Override, Quellenknappheit, Experiment‑Flag) pflegen.

