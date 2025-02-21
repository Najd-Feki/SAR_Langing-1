import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ArticlesNewsComponent } from './articles-news/articles-news.component';
import { PartnerComponent } from './partner/partner.component';
import { ServicesTabsComponent } from './services-tabs/services-tabs.component';
import { ServicesComponent } from './services/services.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [  HeroComponent,  AboutUsComponent ,ServicesTabsComponent,   PartnerComponent , ArticlesNewsComponent , MapComponent],
    templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
