import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: 'light-theme' | 'dark-theme' = 'light-theme';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.loadTheme();
  }

  toggleTheme() {
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(this.theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.theme);
    }
  }

  private loadTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'light-theme' | 'dark-theme';
      this.theme = savedTheme || 'light-theme';
      document.body.classList.add(this.theme);
    }
  }
}
