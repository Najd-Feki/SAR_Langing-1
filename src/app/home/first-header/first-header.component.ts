import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../theme.service';
import { FontSizeService } from '../../font-size.service';

@Component({
  selector: 'app-first-header',
  imports: [],
  templateUrl: './first-header.component.html',
  styleUrl: './first-header.component.scss'
})
export class FirstHeaderComponent {
    constructor(@Inject(PLATFORM_ID) private platformId: Object , private fontSizeService: FontSizeService , public  translate: TranslateService , public themeService: ThemeService) {

  }
    
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  increaseFontSize() {
    this.fontSizeService.increaseFontSize();
  }
  
  decreaseFontSize() {
    this.fontSizeService.decreaseFontSize();
  }
} 