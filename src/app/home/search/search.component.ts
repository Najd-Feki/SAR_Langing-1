import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent  {
  @Input() isSearchOpen: boolean = false;
  @Output() closeEvent = new EventEmitter<void>();


  closeSearch() {
    this.closeEvent.emit();
  }
}
