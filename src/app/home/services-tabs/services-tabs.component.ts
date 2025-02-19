import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services-tabs',
  imports: [CommonModule ,TranslateModule],
  templateUrl: './services-tabs.component.html',
  styleUrls: ['./services-tabs.component.scss'],
})
export class ServicesTabsComponent {
    constructor(
      public translate: TranslateService,
      private router: Router
    ) {}
  selectedTab = 0;

  serviceTabs = [
    {
      title: 'SERVICES.TITLE',
      description: 'SERVICES.DESCRIPTION',
      links: ['Services', 'Services', 'Services', 'Services'],
    },
    {
      title: 'SERVICES.TITLE',
      description:  'SERVICES.DESCRIPTION',
      links: ['Service A', 'Service B', 'Service C'],
    },
    {
      title: 'SERVICES.TITLE',
      description:  'SERVICES.DESCRIPTION',
      links: ['Option 1', 'Option 2', 'Option 3'],
    },
    {
      title: 'SERVICES.TITLE',
      description:  'SERVICES.DESCRIPTION',
      links: ['Feature X', 'Feature Y'],
    },
  ];
  goToDetails() {
    this.router.navigate(['/details']);
  }
  selectTab(index: number) {
    this.selectedTab = index;
  }
}
