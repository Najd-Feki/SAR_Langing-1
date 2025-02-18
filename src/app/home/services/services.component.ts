import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef;
  private swiperInstance!: Swiper;

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  tagColors: string[] = ['#ECFDF3', '#B2DDFF', '#F9FAFB'];
  Colors: string[] = ['#085D3A', '#1849A9', '#1F2A37'];
  services = [
    {
      title: 'SERVICES.CARD_TITLE_1',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_2',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_3',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_4',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_5',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_6',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_7',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_8',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
    {
      title: 'SERVICES.CARD_TITLE_9',
      content: 'SERVICES.CARD_CONTENT',
      tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'],
      primaryAction: 'SERVICES.PRIMARY_ACTION',
      secondaryAction: 'SERVICES.SECONDARY_ACTION',
    },
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const container = this.carouselContainer?.nativeElement;
        if (!container || !container.querySelector('.swiper-slide')) {
          console.warn('Swiper: No slides found, skipping initialization.');
          return;
        }

        this.swiperInstance = new Swiper(container, {
          modules: [Pagination, Navigation, Autoplay],
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          slidesPerView: 4,
          spaceBetween: 16,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
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
        console.log('Swiper initialized!', this.swiperInstance);
        this.updateBulletColors();
      }, 300);
    }
  }

  updateBulletColors() {
    const bullets = document.querySelectorAll('.swiper-pagination');
    if (!bullets || !this.swiperInstance) return;

    bullets.forEach((bullet, index) => {
      if (index === this.swiperInstance.realIndex) {
        (bullet as HTMLElement).style.backgroundColor = '#1B8354';
        (bullet as HTMLElement).style.width = '16px';
        (bullet as HTMLElement).style.height = '16px';
      } else {
        (bullet as HTMLElement).style.backgroundColor = 'rgb(255, 255, 255)';
        (bullet as HTMLElement).style.width = '16px';
        (bullet as HTMLElement).style.height = '16px'; }
    });
  }
}
