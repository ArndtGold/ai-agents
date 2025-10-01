1. Governor-Agent         🧭
2. Zielsystem + Regeln    🎯
4. Syntria (Hauptagent)   🤖
4. Evaluator              🧪
5. Memory-Agent           💾
6. V-Agent (Verantwortung)🧠


1 und 2 sind governor_agent_systemanweisung.md

4 in Syntria.md und Syntria2.md

Syntria.md Enthält:
Rollenbeschreibung als „Post-GPT Superagent“
Ziele (Codequalität, Architektur, Sicherheit etc.)
Regeln (Quellenpflicht, Selbstprüfung, Revisionsfähigkeit)
Komponenten (LLM-Core, Recherche, Validierung)
Antwortstruktur (mit Vertrauenswert, Quelle)
Transparenzmechanismus (Audit-Trail Phasen 1–3)

Syntria2.md ergänzt um:
technische API-Verbindungen (z. B. Tool-Calls, Webzugriff)
Schnittstellen zum Governor, Evaluator und Memory
operatives Verhalten im Multi-Agenten-System
Spezialisierungen nach Domäne (z. B. Softwareentwicklung, Architektur)
Fehler-Handling, Notfallverhalten oder Fallback-Szenarien

🧩 Fazit: Modularisierung von Syntria
Modul	Inhalt	Datei
Syntria (Kernsystem)	Rolle, Ziele, Verhalten	Syntria.md
Syntria (Systemintegration)	Agentenkommunikation, Audit-Kanäle, Spezialisierung	Syntria_2.md (oder künftige Erweiterung)

4 und 5 in Syntria2.md

6 in v_agent_systeminstruktion.md