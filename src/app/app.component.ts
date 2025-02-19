import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FirstHeaderComponent } from './home/first-header/first-header.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , HeaderComponent,FirstHeaderComponent, FooterComponent],
  
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {
    if (isPlatformBrowser(this.platformId)) { 
      const savedLang = localStorage.getItem('language') || 'en';
      this.setLanguage(savedLang);
    }
  }

  setLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.setItem('language', lang);
    }

    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    this.translate.use(lang);
  }
}
