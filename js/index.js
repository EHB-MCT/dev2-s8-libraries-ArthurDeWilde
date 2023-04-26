"use strict";

// de leaflet library is reeds geimporteerd, en beschikbaar als "L"
// dit via de script en css tag in de index.html, en de "map" div die werd toegevoegd.


const app = {
    map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {
        // initialise de kaart
        app.map = L.map('map').setView([50.8438883, 4.3586523], 13);

        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(app.map);

        // gebruik de functie "loadMarkers" om de markers toe te voegen
        app.loadMarkers();
    },
    loadMarkers() {

        // fetch de data van opendata.brussels.be
        fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
            .then((response) => {
                return response.json();
            }).then((data) => {
                for (let i = 0; i < data.records.length; i++) {
                    const marker = new L.marker([data.records[i].geometry.coordinates[1], data.records[i].geometry.coordinates[0]]).addTo(app.map);
                    marker.bindPopup(data.records[i].fields.adrvoisnl).openPopup();

                    //console.log(data.records[i].geometry.coordinates);
                    console.log(data);
                }

            });
        // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
        app.addMarker();
    },
    addMarker(lat, lon) {
        // voeg een marker toe op latitude, longitude
        const marker = L.marker([50.842239, 4.3202331]).addTo(app.map);
        marker.bindPopup("<b>Erasmus Hogeschool Brussel</b><br>Niet voor iedereen, wel voor jou!").openPopup();
    }
};

app.init();