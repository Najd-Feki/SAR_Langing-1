import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-articles-news',
  templateUrl: './articles-news.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  styleUrls: ['./articles-news.component.scss']
})
export class ArticlesNewsComponent {
  articles = [
    {
      title: 'ARTICLES.TITLE',
      description: 'ARTICLES.DESCRIPTION',
      image: 'assets/images/news-image.png'
    },
    {
      title: 'ARTICLES.TITLE',
      description: 'ARTICLES.DESCRIPTION',
      image: 'assets/images/news-image.png'
    },
    {
      title: 'ARTICLES.TITLE',
      description: 'ARTICLES.DESCRIPTION',
      image: 'assets/images/news-image.png'
    }
  ];
}
