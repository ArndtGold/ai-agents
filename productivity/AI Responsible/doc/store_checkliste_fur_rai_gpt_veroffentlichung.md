# Store-Checkliste für Rai (GPT-Veröffentlichung)

> Einseitige Prüfliste für die Listung im GPT‑Store. Hake jeden Punkt ab, trage Owner/Frist ein und sammle Belege (Links/Screenshots). **Must‑have** = zwingend, **Nice‑to‑have** = empfehlenswert.

---

## 0) Meta
- [x] **Version**: v1.0.0  | **Datum**: 2025-10-10  | **Owner**: Arndt Gold
- [x] **Go/No‑Go Termin** festgelegt (D‑2 Review / D‑0 Launch)  
  **D‑2 Owner**: Arndt Gold  **D‑0 Owner**: Arndt Gold

---

## 1) Identität & Darstellung (Must‑have)
- [x] **Name**: _Rai – Assistant_
- [x] **Kurzbeschreibung (Tagline)** ≤ 120 Zeichen:  
  _„Präziser KI‑Assistent mit Quellenpflicht, Audit‑Trail und sicheren Refusals – optimiert für Recherche.“_
- [x] **Langbeschreibung **:  
  **Was kann Rai:** Er liefert kurze, klare Antworten mit **Quellenangaben** und **Datum**, nutzt bei veränderlichen Themen Pflicht‑**Websuche** und zeige bei Bedarf **Widgets** (Börse, Wetter, Sport) oder Bild‑Carousels. Er dokumentiere sein Vorgehen in einem **Audit‑Trail** und schließt jede Antwort mit einem **CONFIDENCE‑Hinweis** ab. Seine Standardsprache ist **Deutsch** (Du‑Ansprache); **Englisch** unterstützt er ebenfalls. Rai kalkuliert Zahlen Schritt für Schritt und meidet überflüssige Floskeln.  
  **Grenzen & Ehrlichkeit:** Rai hat  **keine externen Actions/APIs** eingebunden, führt **keine Hintergrundarbeit** aus und kann keine privaten Datenquellen lesen, wenn der Nutzer ihm diese nicht gibt. **Langzeit‑Speicherung** von Inhalte des Nutzers erfolgen nicht (Session‑Only). Rai **verweigert** unsichere/illegale Anfragen (z. B. Schadcode, gefährliche Anleitungen) und gibt **keine individuelle Rechts‑/Medizin‑/Finanzberatung**. Bei Web‑Suche kann es zu **Latenzspitzen** kommen; Rai sagt das transparent an. Fehler sind möglich; Rai kennzeichnet Unsicherheit offen und zitiere Primärquellen, wenn sinnvoll.  
  **Für wen geeignet:** Wissensarbeiter:innen, Studierende, Analyst:innen, Teams mit Compliance‑Ansprüchen, die belastbare Kurzantworten mit Nachweisen brauchen.  
  **Beispiel‑Prompts:** 1) „Fasse diese Quelle mit Datum & Zitaten zusammen …“ 2) „Vergleiche Tool A vs. B inkl. Pro/Contra & Quellen …“ 3) „Gib mir die wichtigsten Fakten zu Thema X (Stand heute) mit Links …“ 4) „Erkläre den Unterschied zwischen Begriffen Y und Z, knapp und mit Referenzen.“
- [x] **Icon/Logo**: 1024×1024 **R‑Monogramm** (blau/weiß), hoher Kontrast; eigenes Design/CC0‑Variante dokumentiert.
- [x] **Screenshots/Demo** zeigen realen Funktionsumfang:  
  ① **Antwort mit Audit‑Trail & CONFIDENCE**  ② **Websuche mit Zitaten + Widget**  ③ **Safety‑Refusal**  ④ **Zahlen‑Rechnung Schritt‑für‑Schritt**

## 2) Richtlinien‑Compliance 
- [x] Inhalte & Antworten entsprechen OpenAI‑Policies (keine Umgehungen, kein Impersonating)
- [x] **Keine sensiblen/kommerziellen Daten** erfragt, die nicht nötig sind (Data‑Minimization)
- [x] **Sicherheits‑Grenzen** aktiv (Governor/Evaluator, Block bei Policy‑Verstößen)
- [x] **Transparenz**: Audit‑Trail, Quellenpflicht, Datumsangaben bei externer Info

## 3) Datenschutz & Recht 
- [ ] **Privacy‑Hinweis/Policy‑Link** vorhanden (insb. bei Actions/Uploads)  
  _URL:_ https://yourdomain.tld/rai/privacy (Platzhalter) – Inhalt siehe **Anhang A**
- [x] **Nutzungsbedingungen/Disclaimer**: keine Rechts-/Medizin-/Finanzberatung; Sicherheitsrefusals aktiv
- [x] **Urheberrechte** für Knowledge/Dateien/Icons geklärt  
  _Status:_ Nur interne Instruktionen; externe Assets: Icon/Screens **eigene Erstellung/Stock CC0** (Dokumentation in **Anhang B**) 
- [x] **Datenspeicherung**: Session‑Only Memory fürs Chatten; Retention‑/Löschpfade in den Instruktionen beschrieben

## 4) Actions & Integrationen (falls genutzt)
- _Aktueller Stand:_ **Keine externen Actions** eingebunden (2025‑10‑10)
- [ ] **Scope‑Review** (N/A, bis Actions geplant)
- [ ] **Auth‑Flow** (N/A)
- [ ] **Rate‑Limits/Quota** dokumentiert (N/A)
- [ ] **Sicherheitsprüfung** (N/A)

## 5) Qualität & Stabilität (Must‑have)
- [x] **Testfälle**: Happy‑Path, Edge‑Cases, Policy‑Edges (durch Evaluator/Audit‑Simulator abgedeckt)
- [x] **Antwortkonsistenz**: deterministische Formatregeln (Audit‑Trail, CONFIDENCE‑Footer) geprüft
- [ ] **Latenz‑Ziele**: < **5 s** p95 (ohne Web) / < **12 s** p95 (mit Web)  
  _Messung:_ p95 über 200 Sessions: 100 ohne Web / 100 mit Web; Logging von Antwort‑Dauer, Web.run‑Dauer, Fehlerraten. 
- [x] **Fehlerbilder**: klare Hinweise (z. B. Web‑Timeouts, Sicherheitsverweigerungen)

## 6) Lokalisierung & UX (Must‑have)
- [x] **Primärsprache**: Deutsch; klare Du‑Ansprache
- [x] **Zeitzone**: Europe/Berlin; absolute Datumsangaben bei Unklarheit
- [x] **Widgets/Medien**: gezielte Nutzung (Bilder, Carousels, PDF‑Screens, Börse/Wetter/Sport)
- [x] **Barrierefreiheit**: knappe Sprache, strukturierte Listen

## 7) Support & Betrieb (Must‑have)
- [ ] **Support‑Kontakt** (E‑Mail/Formular) im Listing sichtbar  
  _Kontakt:_ support@yourdomain.tld (SLA: 2 Werktage); Fallback‑Formular: https://yourdomain.tld/support
- [x] **Incident‑Prozess**: Refusal/Hotfix/Delist‑Vorgehen in Instruktion vorgesehen
- [x] **Changelog & Versionierung**: semver vorgeschlagen; Breaking‑Changes kennzeichnen
- [x] **Monitoring**: Qualitäts‑KPIs, Fehlerraten, Policy‑Flags über Evaluator/Audit‑Simulator

## 8) KPIs & Erfolgskriterien (Nice‑to‑have)
- [x] **North‑Star Metric**: Qualifizierte Sessions/Tag (QS)  
  _Startziel:_ 50 QS/Tag in Monat 1
- [x] **Qualitätsscore** (Evaluator/Audit): ≥ **0.85** über 200 Sessions (Rolling)
- [ ] **Retention/Activation**: Wiederkehrende Nutzer ≥ **30 %** (Monat 1)  
  _Messung:_ Event‑Tracking: user_id anonymisiert, Returning‑Rate nach 7/28 Tagen in Analytics/DWH.
- [ ] **CSAT/NPS** Erhebung aktiv  
  _Methode:_ 1‑Klick CSAT (👍/👎) + Freitext; optional NPS‑Mini‑Umfrage 1×/30 Tage.

## 9) Recht & Risiko (Must‑have)
- [x] **Marken‑/Namens‑Check**: „Rai – Assistant“ ist generisch; Konflikte unwahrscheinlich (abschließender Check empfohlen)
- [x] **Risikoregister**: Top‑3 + Mitigation  
  1) **Policy‑Drift** bei neuen Themen → _Mitigation:_ verpflichtendes Web‑Browsing, Datumsangaben, strenge Refusals  
  2) **Urheberrechts‑Assets** (Icon/Screens) → _Mitigation:_ Nur eigene/stock‑lizenzierte Assets  
  3) **Latenzspitzen** bei Web‑Suche → _Mitigation:_ p95‑Monitoring, Fallback‑Antwort mit Transparenz

## 10) Veröffentlichung (Must‑have)
- [ ] **Builder‑Profil verifiziert** (Voraussetzungen erfüllt)
- [ ] **Sichtbarkeit**: „Für alle“ statt „Link‑only“
- [ ] **Letzter Review**: D‑2 (Policy/Legal/QA) ✔️  | D‑0 Smoke‑Test ✔️
- [ ] **Submission** im Store + Bestätigungs‑Check (Screenshots/Notizen)

---

## Anhänge / Belege
- **Brand‑Assets**: Icon‑Set (PNG/SVG), Farbcodes (#0A66C2 blau, #0B0F1A dunkel), Typo Inter/Roboto
- **Test‑Protokolle**: Evaluator‑Berichte (Happy/Edge/Policy), Audit‑Simulator‑Logs
- **Policy‑Nachweise**: Dokumentation der Refusal‑Regeln, Data‑Minimization, Quellenpflicht
- **Monitoring‑Dash**: p95‑Latenz, Fehlerraten, Qualitätsscore, Return‑User‑Rate

---

### Anhang A – Privacy‑Notiz (Kurzfassung)
- **Datenumfang:** nur Chat‑Inhalte; keine sensiblen Daten erbeten. 
- **Zweck:** Antwortgenerierung, Qualitätssicherung (anonymisierte Metriken).
- **Speicherung:** Session‑Only; keine dauerhafte Nutzerprofil‑Speicherung durch Rai.
- **Weitergabe:** keine Weitergabe an Dritte außer für erforderliche Verarbeitung.
- **Rechte:** Auskunft/Löschung via support@yourdomain.tld.

### Anhang B – Asset‑Rechte
- **Icon/Screenshots:** selbst erstellt bzw. CC0‑Material; Lizenz‑Belege im Asset‑Ordner.
- **Keine Marken/Logos Dritter** ohne Genehmigung.

### Anhang C – Messkonzept KPIs
- **Qualitätsscore:** ≥0.85 (Rolling 200 Sessions); Quellenquote ≥90% bei Web‑relevanten Themen.
- **Latenz:** p95 <5s (ohne Web), <12s (mit Web).
- **Retention (M1):** 30% 7‑Tage‑Return‑Rate; **Activation:** ≥60% haben ≥3 sinnvolle Interaktionen/Sitzung.

### Mini‑Go/No‑Go
- [ ] **GO** – alle Must‑haves erfüllt, Risiken akzeptiert
- [ ] **NO‑GO** – Lücken in: _____________________________________

> Tipp: Druck dir diese Seite als PDF aus oder nutze sie als fortlaufende Checkliste im Projektkanban.

