import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-news',
  templateUrl: './articles-news.component.html',
  imports: [CommonModule, TranslateModule],
  styleUrls: ['./articles-news.component.scss']
})
export class ArticlesNewsComponent implements OnInit {
  @ViewChild('articleContainer', { static: false }) articleContainer!: ElementRef;
  constructor(private router: Router, private renderer: Renderer2 ,   @Inject(PLATFORM_ID) private platformId: Object
) {}
currentLang = 'en';

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.currentLang = localStorage.getItem('language') || 'en';
    window.addEventListener('storage', this.onLanguageChange);
  } else {
    this.currentLang = 'en';
  }

  this.updateDirection(this.currentLang);
}
ngOnDestroy() {
  if (isPlatformBrowser(this.platformId)) {
    window.removeEventListener('storage', this.onLanguageChange);
  }
}
private updateDirection(lang: string) {
  if (isPlatformBrowser(this.platformId)) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.renderer.setAttribute(this.renderer.selectRootElement('html', true), 'dir', dir);
    this.renderer.setAttribute(this.renderer.selectRootElement('html', true), 'lang', lang);
  }
}


  private onLanguageChange = (event: StorageEvent) => {
    if (event.key === 'language') {
      this.currentLang = event.newValue || 'en';
      this.updateDirection(this.currentLang);
    }
  };

  articles = [
    {
      Id: 1,
      title: 'تطورات جديدة في مجال الذكاء الاصطناعي',
      description: 'شهد مجال الذكاء الاصطناعي مؤخراً تطورات غير مسبوقة، حيث ظهرت تقنيات جديدة تسهم في تحسين العديد من الصناعات بما في ذلك الرعاية الصحية والتعليم.',
      title_en: 'New Developments in Artificial Intelligence',
      description_en: 'The field of artificial intelligence has recently seen unprecedented developments, with new technologies emerging that contribute to improving many industries, including healthcare and education.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg',
    },
    {
      Id: 2,
      title: 'مؤتمر عالمي حول الاستدامة في البناء',
      description: 'انطلقت فعاليات المؤتمر الدولي حول الاستدامة في البناء، حيث ناقش المتحدثون كيفية تحسين تقنيات البناء وتقليل التأثير البيئي للمشاريع العمرانية.',
      title_en: 'Global Conference on Sustainability in Construction',
      description_en: 'The international conference on sustainability in construction has begun, where speakers discussed ways to improve building techniques and reduce the environmental impact of construction projects.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg',
    },
    {
      Id: 3,
      title: 'ابتكار في مجال الرعاية الصحية: العلاج بالخلايا الجذعية',
      description: 'تستمر الأبحاث في مجال الخلايا الجذعية، حيث أظهرت التجارب الأولية قدرة هذه الخلايا على علاج العديد من الأمراض المستعصية مثل السرطان وأمراض القلب.',
      title_en: 'Innovation in Healthcare: Stem Cell Therapy',
      description_en: 'Research in the field of stem cells continues to advance, showing promising results in treating various incurable diseases such as cancer and heart disease.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg',
    },
    {
      Id: 4,
      title: 'التحول الرقمي في التعليم: الثورة القادمة',
      description: 'بدأت العديد من المدارس والجامعات في تبني تقنيات التحول الرقمي لتعزيز التعليم عن بعد وتحقيق تجربة تعليمية أكثر تفاعلية ومتاحة للجميع.',
      title_en: 'Digital Transformation in Education: The Next Revolution',
      description_en: 'Many schools and universities have begun adopting digital transformation technologies to enhance remote learning and provide a more interactive and accessible educational experience.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg',
    },
    {
      Id: 5,
      title: 'أحدث الابتكارات في مجال السيارات الكهربائية',
      description: 'تشهد صناعة السيارات الكهربائية تطوراً كبيراً مع تقديم سيارات جديدة تتمتع بقدرات عالية على السفر لمسافات طويلة وتقنيات مبتكرة في الشحن والتشغيل.',
      title_en: 'Latest Innovations in Electric Vehicles',
      description_en: 'The electric vehicle industry is witnessing significant progress with new cars offering high capabilities for long-distance travel and innovative technologies in charging and operation.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg',
    },
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

  readMore(id: number) {
    // this.router.navigate([`/details`]);
    this.router.navigate(['/details'], { queryParams: { id: id } });
    
  }

  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
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
