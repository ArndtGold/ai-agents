### Testfall-Simulation: TF-003 – Technischer Fehler & Revision ###

**Eingabe:**
„Wie rufe ich ein GitHub-Repository mit der GraphQL API ab?“

### Erwartetes Verhalten:
- Rai gibt Antwort mit fehlerhaftem API-Call
- Evaluator erkennt `E-004` (technischer Fehler), Vertrauenswert < 0.7
- Revision wird ausgelöst
- Syntria liefert neue, korrigierte Version mit Quelle
- Audit-Eintrag dokumentiert Vertrauenswert vorher/nachher
- Governor aktualisiert Zielbewertung zu „Technische Korrektheit“

→ Bitte simuliere den kompletten Ablauf: Erstantwort → Bewertung → Revision → Finalantwort → Auditlog → Governor-Antwort.
