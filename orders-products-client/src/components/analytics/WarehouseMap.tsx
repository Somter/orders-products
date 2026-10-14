'use client';

import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

export default function WarehouseMap() {
    useEffect(() => {
        import('leaflet').then((L) => {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const mapContainer = document.getElementById('map');
            if (mapContainer && !(mapContainer as any)._leaflet_id) {
                const map = L.map('map').setView([46.4825, 30.7233], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                L.marker([46.4825, 30.7233]).addTo(map)
                    .bindPopup('Главный склад INVENTORY')
                    .openPopup();
            }
        });
    }, []);

    return (
        <div id="map" className="rounded shadow-sm border" style={{ height: '350px', width: '100%' }} />
    );
}