import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module'; 
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeComponent,
    DatePipe,

  ],
  exports: [HeaderComponent , FooterComponent]

})
export class HomeModule { }
