// Inicializace mapy – střed ČR
const mapa = L.map('mapa').setView([49.8, 15.5], 7);

// Podkladová mapa (OpenStreetMap)
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(mapa);

// Ochrana proti vložení HTML z dat
function esc(text) {
  const el = document.createElement('div');
  el.textContent = text ?? '';
  return el.innerHTML;
}

// Načtení GeoJSONu
fetch('body.geojson')
  .then(odpoved => {
    if (!odpoved.ok) throw new Error('HTTP ' + odpoved.status);
    return odpoved.json();
  })
  .then(data => {
    const vrstva = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindPopup(
          `<div class="popup">
             <h2>${esc(p.nazev)}</h2>
             <p>${esc(p.popisek)}</p>
             <p class="id">ID: ${esc(String(p.id))}</p>
           </div>`
        );
        layer.bindTooltip(esc(p.nazev));
      }
    }).addTo(mapa);

    // Přiblížení na všechny body
    mapa.fitBounds(vrstva.getBounds(), { padding: [60, 60] });
  })
  .catch(chyba => {
    console.error('Nepodařilo se načíst body.geojson:', chyba);
    alert('Nepodařilo se načíst body.geojson. Spusťte projekt přes lokální server (viz README).');
  });
