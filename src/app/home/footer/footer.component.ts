import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  footerLogo: string = '/assets/icons/footer_en.svg'; 

  constructor(private translate: TranslateService) {
    this.updateFooterLogo(); 
    this.translate.onLangChange.subscribe(() => {
      this.updateFooterLogo();
    });
  }

  updateFooterLogo() {
    const lang = this.translate.currentLang || 'en'; 
    this.footerLogo = lang === 'ar' ? 'assets/icons/footer_ar.svg' : 'assets/icons/footer_en.svg';
  }
}
