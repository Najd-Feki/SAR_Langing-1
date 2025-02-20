import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit {
  slides = [
    {
      title: 'HERO.TITLE_1',
      description: 'HERO.DESCRIPTION_1',
      image:
        'https://cdn.builder.io/api/v1/image/assets/c43da3a161eb4f318c4f96480fdf0876/e70a28aa7cf59a768a4272272210d77664d9afafe8c12e4a166219a579f73f60',
    },
    {
      title: 'HERO.TITLE_2',
      description: 'HERO.DESCRIPTION_2',
      image:
        'https://cdn.builder.io/api/v1/image/assets/c43da3a161eb4f318c4f96480fdf0876/e70a28aa7cf59a768a4272272210d77664d9afafe8c12e4a166219a579f73f60',
    },
    {
      title: 'HERO.TITLE_3',
      description: 'HERO.DESCRIPTION_3',
      image: 'green',
    },
    {
      title: 'HERO.TITLE_4',
      description: 'HERO.DESCRIPTION_4',
      image: 'grey',
    },
  ];

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  private swiperInstance!: Swiper;

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.onLangChange.subscribe(() => {
      this.reInitSwiper();
    });
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  private initSwiper() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const container = this.swiperContainer?.nativeElement;
        if (!container || !container.querySelector('.swiper-slide')) {
          console.warn('Swiper: No slides found, skipping initialization.');
          return;
        }

        this.swiperInstance = new Swiper(container, {
          modules: [Pagination, Autoplay],
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          on: {
            slideChange: () => {
              this.updateBulletColors();
            },
          },
        });

        this.updateBulletColors();
      }, 1000);
    }
  }

  private reInitSwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
    this.cdr.detectChanges();
    this.initSwiper();
  }

  updateBulletColors() {
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    if (!bullets || !this.swiperInstance) return;

    bullets.forEach((bullet, index) => {
      if (index === this.swiperInstance.realIndex) {
        (bullet as HTMLElement).style.backgroundColor = '#1B8354';
        (bullet as HTMLElement).style.width = '16px';
        (bullet as HTMLElement).style.height = '16px';
      } else {
        (bullet as HTMLElement).style.backgroundColor = 'rgb(255, 255, 255)';
        (bullet as HTMLElement).style.opacity = '100';
        (bullet as HTMLElement).style.width = '16px';
        (bullet as HTMLElement).style.height = '16px';
      }
    });
  }
}
