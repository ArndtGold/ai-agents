# Evidentia – Changelog v1.1
**Release-Datum:** 2025‑10‑04  
**Gültig für:** Systeminstruktion *Evidentia v1.1 (merged)*  
**SemVer:** 1.1.0  

---

## 🔼 Zusammenfassung
v1.1 hebt Evidentia von einer reinen Beleg‑/Antwort‑Instruktion zu einem **replizierbaren, auditierbaren Recherche‑Prozess** an: strengere Aktualitätsgrenzen, Quellendiversität, „Beweis vor Behauptung“, Konfliktkasten, Vertrauens‑Rubrik (100 Punkte), erweiterte Enthaltungs‑Trigger (T1–T7), sichtbarer Modusschalter und Output‑Schablone mit optionalem JSON‑Export.

---

## ✨ Added
- **Aktualitätsgrenzen differenziert**: News/Policy/Personalien ≤30 Tage (≤7 bei „aktuell“); Wissenschaft ≤36 Monate oder aktuelle Leitlinie/Metaanalyse.
- **Quellendiversität (Pflicht)**: Mind. 2 **unabhängige** Domänen je Kernaussage.
- **Permalinks/DOI/Archivlink**: Vorgabe zur Link‑Persistenz.
- **Beweisanker‑Prinzip**: Quelle(n)+Datum **vor** der Aussage.
- **Konfliktkasten (optional)**: Konfliktlage, Grund der Abweichung, Konsequenz.
- **Vertrauens‑Rubrik (100 Punkte)**: Quellentyp, Konsistenz, Aktualität, Primärnähe, Reproduzierbarkeit.
- **Enthaltungs‑Trigger T7**: Evidenzqualität (Meinungsstücke → Enthaltung).
- **Standard‑Rückfragen (1 max.)**: Jurisdiktion/Zeitraum; Definition Zielmaß.
- **Modusschalter sichtbar**: `Modus: Laie` oder `Modus: Fach` in der ersten Zeile.
- **Output‑Schablone** inkl. optionalem **JSON‑Export (`answer_json`)**.
- **Tabellen‑Mikronorm**: Erste Spalte Kriterium, letzte Spalte Quelle/Datum.

---

## 🔧 Changed
- **Transparenz** präzisiert: Publikations-/Update‑Datum nennen **und** voranstellen; Primärbelege priorisieren.
- **Widerspruchsauflösung** konkretisiert: situative Priorisierung (Meta > Einzel; jüngere amtliche Zeitreihe > ältere Studie; Primärdaten > Schätzungen) + Kurzbegründungspflicht.
- **Governance & Safety (Kurz)** ergänzt: Zielkonflikte mappen, Fairness‑Nebenbedingungen, Safeguards nennen, keine asynchrone Arbeit/Zeitschätzungen.

---

## 🧹 Removed
- Diffuse Aktualitätsvorgabe ohne Frist.  
- Implizite Quellenhierarchie ohne Diversitäts‑/Persistenzanforderung.

---

## 🩹 Fixed
- **Uneinheitliche Platzierung** von Quellenhinweisen → vereinheitlicht durch Beweisanker‑Prinzip.
- **Unklare Enthaltungsgründe** → T‑Trigger katalogisiert (T1–T7) und mit Standard‑Rückfragen verknüpft.

---

## 🧭 Migration Notes (für Nutzer:innen & Redakteur:innen)
1) **Antwortstruktur**: Beginne jede Kernaussage mit *(Quelle, Datum)*, danach die Aussage.  
2) **Aktualität prüfen**: Vor Abgabe Frist gegen §1 abgleichen; ggf. Enthaltung mit Kurzbegründung.  
3) **Zwei Domänen**: Mindestens Amt/Fach + Qualitätspresse; PM‑Echo nicht doppelt zählen.  
4) **Konflikte**: Bei abweichenden Quellen den Konfliktkasten einfügen (1–3 Zeilen).  
5) **Vertrauen**: Punkte bewerten, Prozent nennen; Rechenweg nur auf Wunsch ausgeben.  
6) **JSON‑Export**: Bei Reports `answer_json` miterzeugen (optional).

---

## 📌 Diff‑artige Snippets (kopierbar)
**Beweisanker – Template**  
`(Quelle A, YYYY‑MM‑DD; Quelle B, YYYY‑MM‑DD) Aussage …`

**Konfliktkasten – Template**  
- **Konfliktlage:** A sagt …; B sagt …  
- **Grund (Vermutung):** …  
- **Konsequenz:** …

**Vertrauens‑Rubrik – Punkteblatt (Kurz)**  
`{quellentyp:25, konsistenz:20, aktualität:20, primärnähe:25, reproduzierbarkeit:10} → vertrauen:%`

---

## 📅 Roadmap‑Hinweise (optional)
- v1.1.1: Beispiel‑Antworten mit ausgefüllter Rubrik + JSON‑Block.  
- v1.2.0: Automatisierte Quellendiversitäts‑Checks & DOI‑Resolver‑Fallback.

---

**Ende – Changelog v1.1**

