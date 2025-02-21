import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
  SimpleChanges,
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
      type: 'img',
      description: 'HERO.DESCRIPTION_1',
      image:
        'https://cdn.builder.io/api/v1/image/assets/c43da3a161eb4f318c4f96480fdf0876/e70a28aa7cf59a768a4272272210d77664d9afafe8c12e4a166219a579f73f60',
    },
    {
      title: 'HERO.TITLE_2',
      type: 'img',
      description: 'HERO.DESCRIPTION_2',
      image:
        'https://cdn.builder.io/api/v1/image/assets/c43da3a161eb4f318c4f96480fdf0876/e70a28aa7cf59a768a4272272210d77664d9afafe8c12e4a166219a579f73f60',
    },
    {
      title: 'Video',
      type: 'video',
      description: 'HERO.DESCRIPTION_3',
      image: 'https://sporent.net/public/videos/20240130202754562500.mp4',
    },
    {
      title: 'HERO.TITLE_4',
      type: 'img',
      description: 'HERO.DESCRIPTION_4',
      image: 'grey',
    },
    {
      title: 'HERO.TITLE_4',
      type: 'img',
      description: 'HERO.DESCRIPTION_4',
      image: 'grey',
    },
  ];

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  @ViewChild('videoPlayer', { static: false }) videoPlayer?: ElementRef;
  private swiperInstance!: Swiper;
  isVideoPlaying = false;

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.onLangChange.subscribe(() => {
      this.reInitSwiper();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slides'] && this.slides.some(slide => slide.type === 'video')) {
      this.handleVideoChange(); 
    }
  }

  handleVideoChange() {
    console.log("====> Video slide is displayed!");
  }

  ngAfterViewInit() {
    this.initSwiper();

    if (isPlatformBrowser(this.platformId)) {
      const video = this.videoPlayer?.nativeElement as HTMLVideoElement;
      if (video) {
        video.muted = true; 
      }
    }
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
              this.playVideoOnSlideChange();  
            },
          },
        });
  
        this.updateBulletColors();
        this.playVideoOnSlideChange(); 
      }, 1000);
    }
  }
  
  private playVideoOnSlideChange() {
    if (this.swiperInstance && this.swiperInstance.slides) {
      this.swiperInstance.slides.forEach((slide) => {
        const video = slide.querySelector('video') as HTMLVideoElement;
        if (video) {
          video.pause(); 
          video.currentTime = 0; 
        }
      });
  
      const activeSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
      const video = activeSlide.querySelector('video') as HTMLVideoElement;
  
      if (video) {
        video.muted = true; 
        video.currentTime = 0; 
        video.play().catch((error) => {
          console.error('Video play failed:', error);
        });
  
        this.swiperInstance.autoplay.stop();
  
        video.addEventListener('ended', () => {
          this.swiperInstance.autoplay.start();
          this.swiperInstance.slideNext();
        });
      }
    } else {
      console.warn('Swiper instance or slides not defined');
    }
  }
  
  onVideoPlay(video: HTMLVideoElement) {
    this.isVideoPlaying = true;
    video.play();
    
    if (this.swiperInstance) {
      this.swiperInstance.params.allowTouchMove = false;
    }
  }

  onVideoEnded() {
    this.isVideoPlaying = false;

    if (this.swiperInstance) {
      this.swiperInstance.params.allowTouchMove = true;
      this.swiperInstance.slideNext();
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