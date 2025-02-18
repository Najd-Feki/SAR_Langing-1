import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
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
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;
  private swiperInstance!: Swiper;
  
  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  tagColors: string[] = ['#ECFDF3', '#B2DDFF', '#F9FAFB'];
  Colors: string[] = ['#085D3A', '#1849A9', '#1F2A37'];
  services = [
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' },
    { title: 'SERVICES.CARD_TITLE', content: 'SERVICES.CARD_CONTENT', tags: ['SERVICES.TAG_1', 'SERVICES.TAG_2', 'SERVICES.TAG_3'], primaryAction: 'SERVICES.PRIMARY_ACTION', secondaryAction: 'SERVICES.SECONDARY_ACTION' }

  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const container = this.carouselContainer?.nativeElement;
        
        if (!container) {
          console.warn('Swiper: No container found, skipping initialization.');
          return;
        }
  
        console.log('Swiper container found:', container);
  
        const slides = container.querySelectorAll('.swiper-slide');
        if (!slides.length) {
          console.warn('Swiper: No slides found, skipping initialization.');
          return;
        }
  
        console.log(`Swiper slides found: ${slides.length}`);
  
        // Ensure navigation buttons exist
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
  
        if (!nextButton || !prevButton) {
          console.error('Swiper navigation buttons not found!');
          return;
        }
  
        console.log('Swiper navigation buttons found:', { nextButton, prevButton });
  
        // Initialize Swiper
        this.swiperInstance = new Swiper(container, {
          modules: [Pagination, Navigation, Autoplay],
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          slidesPerView: 3,
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
            init: () => {
              console.log('Swiper initialized successfully.');
            },
            slideChange: () => {
              console.log(`Swiper slide changed: ${this.swiperInstance.realIndex}`);
              this.updateBulletColors();
            },
          },
        });
  
        this.updateBulletColors();
      }, 300);
    }
  }
  

  updateBulletColors() {
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    if (!bullets || !this.swiperInstance) return;

    bullets.forEach((bullet, index) => {
      if (index === this.swiperInstance.realIndex) {
        (bullet as HTMLElement).style.backgroundColor = '#1B8354';
      } else {
        (bullet as HTMLElement).style.backgroundColor = 'rgb(255, 255, 255)';
      }
    });
  }
}
