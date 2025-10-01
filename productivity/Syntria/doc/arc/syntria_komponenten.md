= Syntria Komponentenarchitektur (v1.0)

== Zusammenfassung
Diese Dokumentation beschreibt die modularen Komponenten von Syntria sowohl auf Makro- als auch Mikroebene. Jede Komponente wird in ihrer Systemfunktion, internen Struktur, Interaktion und Governance-Anbindung beschrieben. Ziel ist die prüffähige, wartbare und transparente Darstellung des gesamten Syntria-Agentensystems.

== Komponentenübersicht – Makroebene
[cols="1,3"]
|===
|Komponente |Systemweite Funktion
|LLM-Kern | Sprachverarbeitung, Antwortgenerierung, semantische Kontextanalyse
|Rollenmanager | Zuweisung kognitiver Rollen (z. B. Architekt:in, Kritiker:in) je nach Promptinhalt
|Meta-Reflexion | Bewertung der Antwortqualität, Erkennung von Verbesserungspotenzial
|Recherche-Agent | API-/Repo-/Standard-Recherche, Zugriff auf externe Wissensquellen
|Faktenprüfer | Validierung von Sicherheit, Aktualität, Lizenzen, Versionen
|Gedächtnis | Kontextueller Langzeitspeicher für Argumente, Quellen, Entscheidungen
|KPI-Logger | Erfassung und Bewertung quantitativer Qualitätskennzahlen (Fehler, Revisionen, Zufriedenheit)
|Evaluator | Selbsttrainierendes Modul zur Fehlererkennung, Revisionsvorschlag, KPI-Auswertung
|===

== Komponentenübersicht – Mikroebene
=== 1. LLM-Kern
* **Subsysteme:**
  - Prompt-Parser
  - Antwortgenerator
  - Confidence-Berechner
* **Funktionen:** Sprachverstehen, Outputproduktion, Vertrauenswertgenerierung

=== 2. Rollenmanager
* **Subsysteme:**
  - Kontextklassifikator
  - Rollenzuweisungslogik
  - Übergangslogik
* **Funktionen:** Auswahl geeigneter Rollen; Konfliktbehandlung bei Rollenkollision

=== 3. Meta-Reflexion
* **Subsysteme:**
  - Klarheitsanalyse
  - Strukturvergleich
  - Revisionsauslöser
* **Funktionen:** Qualitative Bewertung von Textoutput; Rückmeldung an Revisionsmodul

=== 4. Recherche-Agent
* **Subsysteme:**
  - API-Proxy (GitHub, MDN, RFC, ISO)
  - Quellenvalidierung
  - Parser für technische Dokumente
* **Funktionen:** Externe Informationsgewinnung, semantischer Abgleich mit internen Quellen

=== 5. Faktenprüfer
* **Subsysteme:**
  - Lizenzprüfer
  - Sicherheitsprüfer (z. B. OWASP, CVE)
  - Aktualitätskontrolle (API/Version)
* **Funktionen:** Prüfung auf Risiken, Veralterung, Nutzungsbedingungen

=== 6. Gedächtnis
* **Subsysteme:**
  - Speicherindex
  - Kontext-Matcher
  - Versionierer
  - Memory Cleaner
  - Audit-Protokoll
* **Funktionen:** Persistente, versionierte und kontextualisierte Speicherung und Abfrage

=== 7. KPI-Logger
* **Subsysteme:**
  - Ereignislogger
  - Schwellenwerterkennung
  - Metrikbewertung
* **Funktionen:** Logging von E-, R-, S-Werten pro Antwort; Trigger für Optimierung

=== 8. Evaluator
* **Subsysteme:**
  - Segmentierer (Antwortteile)
  - Fehlerklassifikator (z. B. Missing Source, Klarheitsmangel)
  - Revisionsvorschlagserzeugung
  - KPI-Synchronisation
* **Funktionen:** Bewertung & Revision von Antworten, Fehlerstatistik, KPI-Auswertung

== Interaktionsmatrix
[cols="1,1,3"]
|===
|Quelle |Ziel |Zweck
|LLM-Kern | Rollenmanager | Kontextabhängige Rollenzuweisung
|Rollenmanager | Gedächtnis | Auswahl semantisch relevanter Speicherinhalte
|Recherche-Agent | Faktenprüfer | Validierung von externen Quellen
|Meta-Reflexion | Evaluator | Auslösung von Revisionsprozessen
|Evaluator | KPI-Logger | Protokollierung von Fehlern und Revisionsgründen
|KPI-Logger | Gedächtnis | Markierung veralteter oder fehlerhafter Inhalte
|===

== Governance-Integration
* **Hard Rules enforced:**
  - Keine Ausgabe ohne Quelle (außer dokumentiertem Override)
  - Sicherheitsrelevante Fehler → automatische Blockierung/Revision
* **Soft Rules überwacht:**
  - Meta-Score < 0.6 → Revisionspflicht
  - Revisionsquote > 30 % → Markierung zur Überarbeitung

== Anhang: Komponenten-ID Mapping (Dokumentationsreferenz)
[cols="1,1"]
|===
|Komponente |ID
|LLM-Kern | C-01
|Rollenmanager | C-02
|Meta-Reflexion | C-03
|Recherche-Agent | C-04
|Faktenprüfer | C-05
|Gedächtnis | C-06
|KPI-Logger | C-07
|Evaluator | C-08
|===

== Hinweis
Diese Dokumentation ersetzt keine Testspezifikation oder Metrikanalyse, sondern dient ausschließlich der strukturellen Systemübersicht für Architektur-, Compliance- und Governance-Zwecke.

