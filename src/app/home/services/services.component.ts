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

  services: any[] = [];

  ngOnInit() {
    
    this.fetchServices();

  }

  fetchServices() {
    // Simulating API fetch
    setTimeout(() => {
      this.services = [
        {
          title: 'SERVICES.CARD_TITLE_1',
          content: 'SERVICES.CARD_CONTENT_1',
          tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2'],
          primaryAction: 'SERVICES.PRIMARY_ACTION',
          secondaryAction: 'SERVICES.SECONDARY_ACTION',
        },
        {
          title: 'SERVICES.CARD_TITLE_2',
          content: 'SERVICES.CARD_CONTENT_2',
          tags: ['SERVICES.TAG_1', 'SERVICES.TAG_3'],
          primaryAction: 'SERVICES.PRIMARY_ACTION',
          secondaryAction: 'SERVICES.SECONDARY_ACTION',
        },
      ];
    }, 500);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (!this.carouselContainer?.nativeElement?.querySelector('.swiper-slide')) {
          console.warn('Swiper: No slides found, skipping initialization.');
          return;
        }

        this.swiperInstance = new Swiper(this.carouselContainer.nativeElement, {
          modules: [Pagination, Navigation, Autoplay],
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          slidesPerView: this.getSlidesPerView(),
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
            resize: () => this.swiperInstance.params.slidesPerView = this.getSlidesPerView(),
          },
        });
      }, 300);
    }
  }

  getSlidesPerView(): number {
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 768) return 2;
    return 1;
  }
}
