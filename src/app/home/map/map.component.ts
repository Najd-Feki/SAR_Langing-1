import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        const map = L.map('map').setView([24.7136, 46.6753], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const defaultIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        const marker = L.marker([24.7136, 46.6753], { icon: defaultIcon }).addTo(map)
          .bindPopup('Al Riyadh');

        // Ensure popup is properly positioned
        setTimeout(() => {
          marker.openPopup();
          map.panTo([24.7136, 46.6753]);  // Center map on marker after opening popup
        }, 500);
      });
    }
  }
}
