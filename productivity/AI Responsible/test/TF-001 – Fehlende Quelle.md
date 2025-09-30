### Testfall-Simulation: TF-001 – Fehlende Quelle ###

**Rollen:** Syntria, Evaluator, Memory, Governor

**Eingabe:**  
„Wie implementiere ich eine REST-API in Node.js?“

### Erwartetes Verhalten:
- Syntria liefert Antwort **ohne Quellenangabe**
- Evaluator erkennt `E-001` (fehlende Quelle), Vertrauenswert < 0.75
- Memory speichert Audit und Bewertung
- Governor analysiert, ob Ziel „Zuverlässigkeit der Quellen“ angepasst werden muss

### Bitte simuliere:
- Die Antwort durch Syntria
- Die strukturierte Bewertung durch Evaluator
- Den Audit-Eintrag in Memory
- Eine Rückmeldung an Governor bei Zielabweichung

→ Beginne mit der Simulation.
