# Kreditkalkulations-Beispiele

## Einfaches Beispiel (für Laien)
Berechne den RoRAC für folgendes Geschäft:


|   Kreditbetrag (€) |   Laufzeit (Jahre) |   Zinssatz (%) |   Monatliche Rate (€) |
|--------------------|--------------------|----------------|-----------------------|
|              10000 |                  5 |            3.5 |                181.92 |

- Gewinn vor Risiko: 120.000 €
- Risikokosten: PD = 1,5 %, LGD = 40 %, EAD = 2.000.000 €
- Risikogewichtetes Kapital = 12 % × EAD
- Bitte zeige die Zwischenschritte (EL, risikoadj. Gewinn, RWA, Kapitalanforderung, RoRAC).

---

## Komplexes Beispiel (für Experten)
Berechne den RoRAC für folgende Szenarien:

| Szenario      | EAD (€)   | PD (%) | LGD (%) | Zinsertrag (€) | Opex (€) | RWA (% von EAD) |
|---------------|----------|--------|---------|----------------|----------|-----------------|
| Basis         | 2.000.000| 1.0    | 40      | 150000         | 20000    | 50              |
| Optimistisch  | 2.000.000| 0.8    | 35      | 160000         | 18000    | 50              |
| Pessimistisch | 2.000.000| 2.0    | 50      | 140000         | 25000    | 55              |
| Stress        | 2.000.000| 5.0    | 60      | 130000         | 30000    | 60              |

Berechne:
1. Erwarteter Verlust (EL = EAD × PD × LGD) pro Szenario
2. Risikoadjustierter Gewinn = Zinsertrag – Opex – EL
3. RWA = EAD × RWA%
4. Kapitalanforderung (10 % von RWA)
5. RoRAC (%) = Risikoadj. Gewinn ÷ RWA

Stelle die Ergebnisse als Tabelle dar und gib eine kurze Analyse.