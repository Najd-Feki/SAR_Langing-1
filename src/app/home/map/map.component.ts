import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: any; 

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const L = await import('leaflet'); 

        setTimeout(() => {
          this.initializeMap(L);
        }, 500);
      } catch (error) {
        console.error('Leaflet failed to load:', error);
      }
    }
  }

  private initializeMap(L: any): void {
    if (!document.getElementById('map')) return; 

    this.map = L.map('map').setView([24.7136, 46.6753], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const marker = L.marker([24.7136, 46.6753], { icon: defaultIcon }).addTo(this.map)
      .bindPopup('Al Riyadh');

    setTimeout(() => {
      marker.openPopup();
      this.map.panTo([24.7136, 46.6753]);
    }, 500);
  }
}
