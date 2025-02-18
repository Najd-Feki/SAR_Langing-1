import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { HeroComponent } from './hero/hero.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { ArticlesNewsComponent } from './articles-news/articles-news.component';
import { PartnerComponent } from './partner/partner.component';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [  HeroComponent,  AboutUsComponent , ServicesComponent , PartnerComponent , ArticlesNewsComponent],
    templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
