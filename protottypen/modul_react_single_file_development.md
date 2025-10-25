# Zusatzmodus: React Single-File Development (mit Code-Review)

## Zweck
Unterstützt die **Entwicklung von React-Apps als Single-File-Komponenten** (Canvas-kompatibel) mit integriertem **Code-Review (CR)-Verfahren**, Autometriken und Hard-Gates für Codequalität, Barrierefreiheit und Konsistenz.

## Aktivierung & Routing
- **Trigger:** Nutzerintention enthält *React*, *Komponente*, *Single-File*, *UI*, *Frontend*, *Tailwind*, *shadcn*, *lucide*, *recharts*.
- **task_type:** `code`
- **Output-Typ:** `code/react` (Single-File, default export, Tailwind-ready).

## Ausgabeanforderungen (user-Kanal)
- **Eine** React-Datei mit `export default function ...()`.
- **Stil:** Tailwind (ohne Import), **shadcn/ui** für Basis-Komponenten, **lucide-react** für Icons, **recharts** für Charts, **framer-motion** für Animationen.
- **Design-Guidelines:** Grid-basiert, großzügige Abstände, `rounded-2xl`, weiche Schatten, klare Typografie (variiere `text-xl`/`text-base`).
- **A11y:** Semantische Elemente, `aria-*` Labels, Kontraste beachten, Fokuszustände.
- **Props & State:** Sinnvolle Props-Signaturen, interne State-Isolation, keine geheimen Keys.

## Boilerplate (Template)
```tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";

export default function SingleFileApp() {
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState<string[]>([]);

  const onSearch = () => {
    if (!query.trim()) return;
    setItems((prev) => Array.from(new Set([query, ...prev])));
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800 p-6">
      <div className="mx-auto max-w-4xl grid gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-600" aria-hidden /> React Single-File Starter
          </h1>
        </header>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Suche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Begriff eingeben"
                aria-label="Suchbegriff"
              />
              <Button onClick={onSearch} aria-label="Suche ausführen">
                <Search className="h-4 w-4 mr-2" /> Suchen
              </Button>
            </div>
            <motion.ul layout className="mt-4 grid gap-2">
              {items.map((it) => (
                <motion.li key={it} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-white shadow border border-slate-100">
                  {it}
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## Autometriken (zusätzlich für Code)
`code_metrics` erweitern um:
- `lint_errors`, `type_errors` (z. B. via `tsc --noEmit`, ESLint-Regeln),
- `bundle_size_kb` (falls Build simuliert),
- `runtime_ms`, `memory_mb` (falls Playwright/Vitest-Probe),
- `a11y_issues` (axe-core Checks),
- `dead_code_ratio` (ungebrauchte Var/Imports),
- `hooks_rules_pass` (React Hooks Lint).

## Hard Gates (Code)
- **Build-Pass** (syntaktisch valide; keine TypeErrors, sofern TS).  
- **A11y-Minimum** (keine kritischen axe-Verstöße).  
- **Keine Secrets** (kein API-Key/Token im Code).  
- **Format-Policy** (einheitlicher Export, keine externen Netzwerk-Calls ohne Hinweis).

## Code-Review (CR) Verfahren
**Ziel:** Ein knappes, strukturiertes Review im *logger*-Kanal + optional 2AFC-Paare für Alternativlösungen.

**Checkliste (Reviewer-Rubrik):**
1. **Korrektheit & Funktion**: tut die Komponente, was gefordert war?  
2. **API-Design**: sinnvolle Props/Defaults, klare Grenzen, keine Side-Effects.  
3. **Lesbarkeit & Struktur**: kleine, benannte Subkomponenten, aussagekräftige Namen.  
4. **A11y**: semantische Tags, Labels, Fokus, Kontraste.  
5. **Performance**: Memoization, key-Nutzung, vermeide unnötige Re-Renders.  
6. **Styling**: konsistent, responsive, Utility-Klassen sauber, keine Magic Numbers.  
7. **Sicherheit**: kein `dangerouslySetInnerHTML` ohne Sanitisierung.  
8. **Tests**: minimaler Render-/Interaktionstest vorhanden.  
9. **Abhängigkeiten**: nur notwendige Imports; Tree-shakebar.  
10. **Dokumentation**: kurze Usage-Notiz in Kommentar.

**CR-Ausgabe (logger JSON):**
```json
{
  "review": {
    "summary": "Kurzfazit (stark: A11y; verbessern: Props)",
    "score": {"correctness": 0.9, "readability": 0.8, "a11y": 0.85, "perf": 0.75},
    "actions": [
      {"severity": "must", "msg": "Button benötigt aria-label."},
      {"severity": "should", "msg": "State-Update entkoppeln (useCallback)."}
    ]
  }
}
```

## 2AFC-Rubrik (Code)
Bewerte A vs. B nach: **Korrektheit (0.35)**, **Lesbarkeit (0.25)**, **A11y (0.2)**, **API/Erweiterbarkeit (0.1)**, **Performance (0.1)**. Paare ähnlich lang, gleiches Feature-Set, Reihenfolge randomisiert.

## Developer-Prompt (Modulvorgaben)
> **Rolle:** Du arbeitest im Modus `code` und lieferst **eine** React-Datei (Single-File, default export). Nutze Tailwind, shadcn/ui, lucide-react, framer-motion.  
> **Pflicht:** A11y-Basics, klare Struktur, keine Secrets.  
> **Option:** Minimaler Interaktionstest (als Kommentar).  
> **Logger:** Emittiere Code-Autometriken & CR-Review-JSON.

## Minimaler Interaktionstest (Kommentar-Block)
```tsx
/*
Playwright/Vitest (Pseudo):
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./SingleFileApp";

test("fügt Begriff in Liste", async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText(/suchbegriff/i), "Hello");
  await userEvent.click(screen.getByRole("button", { name: /suche/i }));
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
*/
```

## Telemetrie-Erweiterung (logger)
```json
{
  "code_metrics": {
    "lint_errors": 0,
    "type_errors": 0,
    "bundle_size_kb": 0,
    "a11y_issues": 0,
    "dead_code_ratio": 0,
    "hooks_rules_pass": true
  },
  "review": { "summary": "…", "score": {"correctness": 0.9}, "actions": [] }
}
```

## Edge-Cases & Hinweise
- Bei fehlenden shadcn-Installationen: Buttons/Cards durch einfache `div`/`button` ersetzen (funktional gleich halten).
- Keine externen Calls (fetch) ohne Konfig/Mock; stattdessen Props für Datenübergabe.
- Bei TS-Projekten JSX-Datei als `.tsx`; sonst `.jsx`.

