import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { CommonModule, isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../theme.service';
import { Router } from '@angular/router';
import { FontSizeService } from '../../font-size.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, NgIf,  TranslateModule , CommonModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent {
  isBrowser: boolean; 
  isLangDropdownOpen = false;
  isSearchOpen: boolean = false;
  selectedLangLabel = 'عربي'; 
  menuItems = [
    // this is for the elements of the menu items , it can be changed to be dynamic
    { key: 'item1' },
    { key: 'item1' },
    { key: 'item1' },
    { key: 'item1' },
    { key: 'item1' },
    { key: 'item1' },
    { key: 'item1' }
  ];
    languages = [
    { code: 'ar', label:'عربي' },
    { code: 'en', label: 'English'   },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router , private fontSizeService: FontSizeService , public  translate: TranslateService , public themeService: ThemeService) {
    this.isBrowser = isPlatformBrowser(this.platformId); 

  
    if (this.isBrowser) {
      this.translate.setDefaultLang('en');
      const savedLang = localStorage.getItem('language') || 'en';
  
      this.translate.use(savedLang);
    }
  }
  goToDetails() {
    console.log("true")
    this.router.navigate(['/details']);
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  toggleLanguageDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }
  changeLanguage(lang: string) {
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
    this.setLanguage(lang);
    this.translate.use(lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    this.isLangDropdownOpen = false;
  }
  private setLanguage(lang: string) {
    this.selectedLangLabel = lang === 'ar' ? 'English' : 'عربي';
  }

  increaseFontSize() {
    this.fontSizeService.increaseFontSize();
  }

  decreaseFontSize() {
    this.fontSizeService.decreaseFontSize();
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  closeSearch() {
    this.isSearchOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchBox = document.getElementById('searchBar');
    if (this.isSearchOpen && searchBox && !searchBox.contains(event.target as Node)) {
      this.closeSearch();
    }
  }
  toggleMenu() {
    if (this.isBrowser) {
      const menu = document.querySelector('.menu-items');
      if (menu) {
        menu.classList.toggle('active');
      }
    }
  }
}
