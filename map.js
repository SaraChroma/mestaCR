// Inicializace mapy – střed ČR
const mapa = L.map('mapa').setView([49.8, 15.5], 7);

// Podkladová mapa (OpenStreetMap)
var Jawg_Matrix = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	accessToken: '<your accessToken>'
});

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
