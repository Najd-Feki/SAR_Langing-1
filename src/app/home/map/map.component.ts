import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
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
        console.log('Leaflet loaded:', L); 
        this.initializeMap(L.default); 
      } catch (error) {
        console.error('Leaflet failed to load:', error);
      }
    }
  }

  private initializeMap(L: any): void {
    if (!L || !L.map) {
      console.error('Leaflet is not loaded correctly');
      return;
    }

    if (!document.getElementById('mapcontainer')) {
      console.error('Map container element not found');
      return;
    }

    this.map = L.map('mapcontainer', {
      scrollWheelZoom: false  
    }).setView([24.707663653688467, 46.74609863762993], 12);

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

    const getlang = localStorage.getItem('language') || 'en';
    var title = '';
    if(getlang === 'ar') {
      title = 'الرياض';
    } else {
      title = 'Riyadh';
    }
    const marker = L.marker([24.707663653688467, 46.74609863762993], { icon: defaultIcon }).addTo(this.map)
      .bindPopup(title);

    setTimeout(() => {
      marker.openPopup();
      this.map.panTo([24.707663653688467, 46.74609863762993]);
    }, 500);
  }
}