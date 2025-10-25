# Rai – Architektur als Regel- und Evidenznetz (mit/ohne LLM) & Docker-Betrieb (mit Platzhalter-Kennzeichnung)

## 1. Überblick
Rai ist ein modularer Hauptagent, der durch Evaluator, Memory, Governor, KPI, Audit-Simulator und V‑Agent zu einer reflexiven, auditierbaren Entität wird. Das System kann ohne generatives LLM rein regel- und datengetrieben laufen; ein LLM ist optional als Plugin.

> ⚠️ **Hinweis:** Alle `ghcr.io/rai-system/...` Images in den Compose-Beispielen sind **Platzhalter**. Du musst diese Images selbst bauen oder durch eigene Repositories ersetzen.

## 2. Architektur: Regel- und Evidenznetz
- Kernidee: Entscheidungen basieren auf Evidenz, Scores und Policies, nicht zwingend auf Sprache. 
- Datenfluss: Artefakte/Events → Preflight/Audit → Scores/Klassen → Zielgewichte/Policies → Aktionen/Revisionen.
- Contracts: JSON-APIs zwischen Diensten; klare Rollen/Mandate.

### 2.1 Komponenten
- Rai-Core: orchestriert Workflows, konsumiert Zielgewichte, triggert Evaluierungen.
- Evaluator: klassifiziert Findings in F- (Formatting/Preflight) und E‑Klassen (Quellen/Engineering), berechnet Score.
- Memory: persistiert Threads, Submits, Preflight-Artefakte, Audits, Rollups; Quelle der Wahrheit.
- Governor: setzt Zielgewichte und Systemflags anhand von Rollups und Audit-Feedback.
- KPI: berechnet Fenstermetriken und liefert kompakte Panels.
- Audit-Simulator: Zweitmeinung auf Preflight-Packs, spiegelt/ergänzt Evaluator.
- V‑Agent: verantwortungsfähige Entscheidungsinstanz für ethische Zielkonflikte.

### 2.2 Standard-Contracts (Kurz)
- Evaluator: POST /bewerte → Score + Klassen; POST /audit/save
- Memory: GET/POST /memory/* (preflight.get|save, audit.save|ingest, rollup, kpi)
- Governor: GET/POST /zielgewicht; GET /flags
- Audit-Sim: POST /memory/audit/ingest (idempotent), GET /memory/preflight/pack

## 3. Betrieb ohne LLM (deterministisch)
- Entfernt den Sprachlayer; alle Entscheidungen sind regelbasiert.
- Typische Einsätze: Compliance-Monitoring, Audit-Automatisierung, Governance-Simulation.
- Vorteile: reproduzierbar, offline-fähig, geringere Risiken/Kosten.

## 4. Betrieb mit optionalem LLM (Plugin-Modus)
- Rai-Core kann eine LLM-Backend-URL erhalten, bleibt aber funktionsfähig, wenn kein LLM verfügbar ist.
- Einsatzfälle: natürliche Sprache, Code-Reviews, erklärende Berichte; LLM bleibt austauschbar.

## 5. Verzeichnisstruktur (empfohlen)
```
rai-entity/
├─ docker-compose.yml
├─ config/
│  ├─ rai/
│  │  ├─ Rai Assistant.md
│  │  └─ Rai_systemintegration.md
│  ├─ agents/
│  │  ├─ evaluator_agent_systeminstruktion.md
│  │  ├─ governor_agent_systemanweisung.md
│  │  ├─ memory_agent_systeminstruktion.md
│  │  ├─ audit_simulator_agent.md
│  │  ├─ v_agent_systeminstruktion.md
│  │  └─ kpi_matrix_agentensystem.md
│  └─ global/
│     └─ environment.yml (optional)
└─ data/
   ├─ memory/
   ├─ audits/
   └─ logs/
```

## 6. Docker-Compose – Komplettsystem (LLM optional)
```yaml
version: "3.9"

services:
  rai-core:
    image: ghcr.io/[PLACEHOLDER]/rai-core:latest  # ⚠️ Platzhalter – eigenes Image bereitstellen
    container_name: rai-core
    restart: unless-stopped
    volumes:
      - ./config/rai:/opt/rai/config:ro
    environment:
      - MODE=STRICT
      - SYSTEM_INSTRUKTION_PATH=/opt/rai/config/Rai Assistant.md
      - SYSTEM_PATCH_PATH=/opt/rai/config/Rai_systemintegration.md
      - GOVERNOR_URL=http://governor:8080
      - EVALUATOR_URL=http://evaluator:8081
      - MEMORY_URL=http://memory:8082
      - V_AGENT_URL=http://v-agent:8084
      - AUDIT_SIM_URL=http://audit-sim:8085
      # Optionales LLM-Plugin (auskommentieren, wenn nicht genutzt)
      # - LLM_BACKEND=http://ollama:11434
    ports:
      - "8088:8088"
    depends_on:
      - governor
      - evaluator
      - memory
      - v-agent
      - audit-sim
    networks: [rai-net]

  evaluator:
    image: ghcr.io/[PLACEHOLDER]/evaluator-agent:latest  # ⚠️ Platzhalter
    container_name: evaluator
    restart: unless-stopped
    volumes:
      - ./config/agents/evaluator_agent_systeminstruktion.md:/opt/evaluator/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/evaluator/system.md
      - MEMORY_URL=http://memory:8082
      - AUDIT_SIM_URL=http://audit-sim:8085
    ports: ["8081:8081"]
    depends_on: [memory]
    networks: [rai-net]

  memory:
    image: ghcr.io/[PLACEHOLDER]/memory-agent:latest  # ⚠️ Platzhalter
    container_name: memory
    restart: unless-stopped
    volumes:
      - ./config/agents/memory_agent_systeminstruktion.md:/opt/memory/system.md:ro
      - ./data/memory:/var/lib/memory
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/memory/system.md
      - STORAGE_PATH=/var/lib/memory
      - RETENTION_DAYS=90
    ports: ["8082:8082"]
    networks: [rai-net]

  governor:
    image: ghcr.io/[PLACEHOLDER]/governor-agent:latest  # ⚠️ Platzhalter
    container_name: governor
    restart: unless-stopped
    volumes:
      - ./config/agents/governor_agent_systemanweisung.md:/opt/governor/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/governor/system.md
      - MEMORY_URL=http://memory:8082
      - KPI_URL=http://kpi:8083
    ports: ["8080:8080"]
    depends_on: [memory, kpi]
    networks: [rai-net]

  kpi:
    image: ghcr.io/[PLACEHOLDER]/kpi-agent:latest  # ⚠️ Platzhalter
    container_name: kpi
    restart: unless-stopped
    environment:
      - MEMORY_URL=http://memory:8082
    ports: ["8083:8083"]
    depends_on: [memory]
    networks: [rai-net]

  v-agent:
    image: ghcr.io/[PLACEHOLDER]/v-agent:latest  # ⚠️ Platzhalter
    container_name: v-agent
    restart: unless-stopped
    volumes:
      - ./config/agents/v_agent_systeminstruktion.md:/opt/vagent/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/vagent/system.md
      - GOVERNOR_URL=http://governor:8080
      - MEMORY_URL=http://memory:8082
    ports: ["8084:8084"]
    networks: [rai-net]

  audit-sim:
    image: ghcr.io/[PLACEHOLDER]/audit-simulator:latest  # ⚠️ Platzhalter
    container_name: audit-sim
    restart: unless-stopped
    volumes:
      - ./config/agents/audit_simulator_agent.md:/opt/audit-sim/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/audit-sim/system.md
      - MEMORY_URL=http://memory:8082
    ports: ["8085:8085"]
    depends_on: [memory]
    networks: [rai-net]

  # Optionales lokales LLM (nur wenn benötigt)
  # ollama:
  #   image: ollama/ollama:latest
  #   container_name: ollama
  #   restart: unless-stopped
  #   volumes:
  #     - ./data/ollama:/root/.ollama
  #   ports: ["11434:11434"]
  #   networks: [rai-net]

networks:
  rai-net:
    driver: bridge
```

## 7. Docker-Compose – Minimal, vollständig LLM-frei
> ⚠️ **Hinweis:** Auch hier sind alle Images Platzhalter (`ghcr.io/[PLACEHOLDER]/...`). Ersetze sie durch eigene Build-Tags oder lokale Builds.

```yaml
version: "3.9"

services:
  evaluator:
    image: ghcr.io/[PLACEHOLDER]/evaluator-agent:latest
    restart: unless-stopped
    volumes:
      - ./config/agents/evaluator_agent_systeminstruktion.md:/opt/evaluator/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/evaluator/system.md
      - MEMORY_URL=http://memory:8082
    ports: ["8081:8081"]
    depends_on: [memory]
    networks: [rai-net]

  memory:
    image: ghcr.io/[PLACEHOLDER]/memory-agent:latest
    restart: unless-stopped
    volumes:
      - ./config/agents/memory_agent_systeminstruktion.md:/opt/memory/system.md:ro
      - ./data/memory:/var/lib/memory
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/memory/system.md
      - STORAGE_PATH=/var/lib/memory
      - RETENTION_DAYS=90
    ports: ["8082:8082"]
    networks: [rai-net]

  governor:
    image: ghcr.io/[PLACEHOLDER]/governor-agent:latest
    restart: unless-stopped
    volumes:
      - ./config/agents/governor_agent_systemanweisung.md:/opt/governor/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/governor/system.md
      - MEMORY_URL=http://memory:8082
      - KPI_URL=http://kpi:8083
    ports: ["8080:8080"]
    depends_on: [memory, kpi]
    networks: [rai-net]

  kpi:
    image: ghcr.io/[PLACEHOLDER]/kpi-agent:latest
    restart: unless-stopped
    environment:
      - MEMORY_URL=http://memory:8082
    ports: ["8083:8083"]
    depends_on: [memory]
    networks: [rai-net]

  audit-sim:
    image: ghcr.io/[PLACEHOLDER]/audit-simulator:latest
    restart: unless-stopped
    volumes:
      - ./config/agents/audit_simulator_agent.md:/opt/audit-sim/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/audit-sim/system.md
      - MEMORY_URL=http://memory:8082
    ports: ["8085:8085"]
    depends_on: [memory]
    networks: [rai-net]

  v-agent:
    image: ghcr.io/[PLACEHOLDER]/v-agent:latest
    restart: unless-stopped
    volumes:
      - ./config/agents/v_agent_systeminstruktion.md:/opt/vagent/system.md:ro
    environment:
      - SYSTEM_INSTRUKTION_PATH=/opt/vagent/system.md
      - GOVERNOR_URL=http://governor:8080
      - MEMORY_URL=http://memory:8082
    ports: ["8084:8084"]
    networks: [rai-net]

networks:
  rai-net:
    driver: bridge
```

