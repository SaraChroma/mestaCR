# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa postavená na [Leafletu](https://leafletjs.com/).
Body měst se načítají ze souboru GeoJSON.

## Struktura

| Soubor          | Účel                                              |
|-----------------|---------------------------------------------------|
| `index.html`    | Stránka, načítá Leaflet, styly a skript           |
| `map.js`        | Inicializace mapy, načtení GeoJSONu, popupy       |
| `styl.css`      | Vzhled stránky a popupů                           |
| `body.geojson`  | Data – body měst                                  |
| `README.md`     | Tento návod                                       |

## Spuštění

Skript používá `fetch()`, který z `file://` nefunguje. Je nutné spustit lokální server:

```bash
# Python
python -m http.server 8000

# nebo Node.js
npx serve
```

Pak otevřete <http://localhost:8000>.

## Formát dat (`body.geojson`)

Každé město je jeden `Feature` typu `Point` s atributy:

| Atribut   | Popis                |
|-----------|----------------------|
| `id`      | Jedinečné číslo      |
| `nazev`   | Název města          |
| `popisek` | Krátký popis         |

**Pozor:** v GeoJSONu je pořadí souřadnic `[délka (lon), šířka (lat)]`.

### Přidání nového města

Přidejte další objekt do pole `features`:

```json
{
  "type": "Feature",
  "properties": { "id": 3, "nazev": "Brno", "popisek": "Druhé největší město ČR." },
  "geometry": { "type": "Point", "coordinates": [16.6068, 49.1951] }
}
```

Mapa se po obnovení stránky sama přiblíží tak, aby byly vidět všechny body.

## Použité technologie

- Leaflet 1.9.4
- Podkladové dlaždice © přispěvatelé OpenStreetMap
