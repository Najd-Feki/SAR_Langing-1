import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-articles-news',
  templateUrl: './articles-news.component.html',
  imports: [CommonModule, TranslateModule],
  styleUrls: ['./articles-news.component.scss']
})
export class ArticlesNewsComponent {
  @ViewChild('articleContainer', { static: false }) articleContainer!: ElementRef;
  articles = [
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' },
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' },
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' },
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' },
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' },
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' },
    { title: 'ARTICLES.TITLE', description: 'ARTICLES.DESCRIPTION', image: 'assets/images/news-image.png' }

  ];
  
  currentSlide = 0;

  nextSlide() {
    if (this.currentSlide < this.articles.length - 1) {
      this.currentSlide++;
      this.scrollToSlide();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.scrollToSlide();
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.scrollToSlide();
  }

  private scrollToSlide() {
    const container = this.articleContainer.nativeElement;
    const cardWidth = container.children[0].offsetWidth + 20; 
    container.scrollTo({ left: cardWidth * this.currentSlide, behavior: 'smooth' });
  }
  isPrevActive(): boolean {
    return this.currentSlide > 0;
  }

  isNextActive(): boolean {
    return this.currentSlide < this.articles.length - 1;
  }
}
