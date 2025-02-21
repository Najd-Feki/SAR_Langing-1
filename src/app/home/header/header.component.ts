import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { CommonModule, isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../theme.service';
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
    { key: 'ITEM', subItems: [{ key: 'SUBMENU_1' }, { key: 'SUBMENU_2' }] },
    { key: 'ITEM', subItems: [{ key: 'SUBMENU_3' }, { key: 'SUBMENU_4' }] },
    { key: 'ITEM', subItems: [{ key: 'SUBMENU_5' }, { key: 'SUBMENU_6' }] },
    { key: 'ITEM', subItems: [{ key: 'SUBMENU_7' }, { key: 'SUBMENU_8' }] },

  ];
    languages = [
    { code: 'ar', label:'عربي' },
    { code: 'en', label: 'English'   },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private fontSizeService: FontSizeService , public  translate: TranslateService , public themeService: ThemeService) {
    this.isBrowser = isPlatformBrowser(this.platformId); 

  
    if (this.isBrowser) {
      this.translate.setDefaultLang('en');
      const savedLang = localStorage.getItem('language') || 'en';
  
      this.translate.use(savedLang);
    }
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
  handleSubItemClick(subItem: any) {
    console.log('Sub-item clicked:', subItem);
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  
    if (this.isSearchOpen) {
      this.closeMenu();
    }
  }
  
  closeMenu() {
    if (this.isBrowser) {
      const menu = document.querySelector('.menu-items') as HTMLElement;
      const actions = document.querySelector('.actions') as HTMLElement;
  
      if (menu) {
        menu.classList.remove('active');
      }
  
      if (actions) {
        actions.classList.remove('active');
      }
    }
  }
  
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Closes the search interface by setting `isSearchOpen` to false.
 * This method is typically called when the search needs to be dismissed,

/******  188bc189-5560-4cef-85af-85545c598ae1  *******/  closeSearch() {
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
      const menu = document.querySelector('.menu-items') as HTMLElement;
      const actions = document.querySelector('.actions') as HTMLElement;
  
      console.log("Menu element:", menu);
      console.log("Actions element:", actions);
  
      if (menu ) {
        const isMenuActive = menu.classList.contains('active');
        if (isMenuActive ) {
          menu.classList.remove('active');
        } else {
          menu.classList.add('active');
          actions.classList.add('active');
        }
  if(actions) {
    const isActionsActive = actions.classList.contains('active');  
    if ( isActionsActive)
    {
      actions.classList.remove('active');

    }else {
      actions.classList.add('active');
    }

  }
      } else {
        console.error("Menu or Actions not found in DOM!");
      }
    }
  }

  
  menuStates: Record<number, boolean> = {};

toggleMenuItem(index: number): void {
  this.menuStates[index] = !this.menuStates[index];
}

}
