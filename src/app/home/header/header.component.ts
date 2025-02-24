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
    { id: 1, key: 'eServices', subItems: [
      { key: 'Services_1', url: '' },
        { key: 'Employment Services', url: '' }
      ] 
    },
    // { id: 2, key: 'lang', subItems: [] },
  ];
    languages = [
    { code: 'ar', label:'عربي' },
    { code: 'en', label: 'English'   },
  ];

  // { key: 'ITEM', subItems: [{ key: 'SUBMENU_3' }, { key: 'SUBMENU_4' }] },
  // { key: 'ITEM', subItems: [{ key: 'SUBMENU_5' }, { key: 'SUBMENU_6' }] },
  // { key: 'ITEM', subItems: [{ key: 'SUBMENU_7' }, { key: 'SUBMENU_8' }] },

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private fontSizeService: FontSizeService , public  translate: TranslateService , public themeService: ThemeService) {
    this.isBrowser = isPlatformBrowser(this.platformId); 

    this.changeMenuItemKey('lang', this.selectedLangLabel);
    if (this.isBrowser) {
      this.translate.setDefaultLang('en');
      const savedLang = localStorage.getItem('language') || 'en';
  
      this.translate.use(savedLang);
    }
  }

  changeMenuItemKey(oldKey: string, newKey: string) {
    const item = this.menuItems.find(i => i.key === oldKey);
    if (item) {
      item.key = newKey;
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
    window.location.reload();
  }

  changeLang() {
    const getlang = localStorage.getItem('language') || 'en';
    if(getlang == 'ar') {
      this.changeLanguage('en');
    } else {
      this.changeLanguage('ar');
    }
  }

  handletemClick(item: any) {
    if (item.id === 2) {
      this.changeLang();
    }

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
    window.open(subItem.url, '_blank');
    const menu = document.querySelector('.menu-items') as HTMLElement;

    menu.classList.remove('active');

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
      const menu = document.querySelector('.menu-items') as HTMLElement;
      const actions = document.querySelector('.actions') as HTMLElement;
  
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
