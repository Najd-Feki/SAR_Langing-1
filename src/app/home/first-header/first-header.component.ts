import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../theme.service';
import { FontSizeService } from '../../font-size.service';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-first-header',
  standalone: true, 
  providers: [DatePipe],
  templateUrl: './first-header.component.html',
  styleUrl: './first-header.component.scss'
})
export class FirstHeaderComponent {
  todayDate: any = '';
  nowTime: any = '';

    constructor(private datePipe: DatePipe, @Inject(PLATFORM_ID) private platformId: Object , private fontSizeService: FontSizeService , public  translate: TranslateService , public themeService: ThemeService) {

      const currentDate = new Date();
    
      // Format the date (e.g., '03-Sep-2024')
      this.todayDate = this.datePipe.transform(currentDate, 'dd-MMM-yyyy');
      
      // Format the time (e.g., '02:30 PM')
      this.nowTime = this.datePipe.transform(currentDate, 'hh:mm a');
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