import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-partner',
  standalone: true,
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
  imports: [CommonModule, TranslateModule]
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

  lastModified: string;

  constructor(private translate: TranslateService) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    const formattedTime = currentDate.toLocaleTimeString('en-GB');

    this.lastModified = this.translate.instant('PARTNER.LAST_MODIFIED', {
      date: formattedDate,
      time: formattedTime
    });
  }

  scrollLeft(container: HTMLElement) {
    container.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement) {
    container.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
