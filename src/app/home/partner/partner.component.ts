import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  imports:[CommonModule],
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent {
  partners = [
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' },
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' },
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' },
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' },
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' },
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' },
    { logo: 'assets/icons/platformLogo.svg', name: 'Platform Logo' }
  ];

  scrollLeft(container: HTMLElement) {
    container.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement) {
    container.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
