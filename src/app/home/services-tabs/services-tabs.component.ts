import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services-tabs',
  imports: [CommonModule ,TranslateModule],
  templateUrl: './services-tabs.component.html',
  styleUrls: ['./services-tabs.component.scss'],
})
export class ServicesTabsComponent implements OnInit {

  selectedTab = 0;
  selectedTitle = 'SERVICES_1.TITLE';
  selectedDes = 'SERVICES_1.DESCRIPTION';
  isArabicLanguage: boolean = false;

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('language');
      if (savedLang != 'en') {
        this.isArabicLanguage = true;
      }
    }
    this.translate.onLangChange.subscribe((event) => {
      this.isArabicLanguage = event.lang != 'en';  
    });
  }

  serviceTabs = [
    {
      title: 'SERVICES_1.TITLE',
      description: 'SERVICES_1.DESCRIPTION',
      linksName: ['SERVICES_1.TAG_1'] ,
      linksURL: [''] 
    },
    {
      title: 'SERVICES_2.TITLE',
      description: 'SERVICES_2.DESCRIPTION',
      linksName: ['SERVICES_2.TAG_1'] ,
      linksURL: [''] 
    }
  ];

  ngOnInit(): void {

  }

  serviceTabClick(index: number) {
    // this.router.navigate(['/details']);
    const url = this.serviceTabs[index].linksURL?.[0];
    console.log("===> URL:");
    console.log(url);
    window.open(url, '_blank');
  }

  selectTab(index: number) {
    console.log("===> index:");
    console.log(index);
    this.selectedTitle = this.serviceTabs[index].title;
    this.selectedDes = this.serviceTabs[index].description;
    this.selectedTab = index;
  }
}
