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
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit {

  slides = [
    {
      title: 'رحلة في عالم الفضاء والاكتشافات العلمية',
      type: 'img',
      description: 'تتناول هذه الفعالية آخر الاكتشافات في مجال الفضاء، بما في ذلك الأبحاث الجديدة حول الكواكب والمجرات البعيدة. كما يتم عرض أحدث التجارب الفضائية التي تهدف إلى استكشاف حدود الكون.',
      title_en: 'Journey into the World of Space and Scientific Discoveries',
      description_en: 'This event covers the latest discoveries in space, including new research about distant planets and galaxies. It also showcases the newest space experiments aimed at exploring the boundaries of the universe.',
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    },
    {
      title: 'فن التصوير الفوتوغرافي: الإبداع والتقنيات الحديثة',
      type: 'img',
      description: 'ورشة عمل للمصورين المبتدئين والمحترفين ليتعلموا تقنيات التصوير الفوتوغرافي المتقدمة، وكيفية استخدام الكاميرات الحديثة لالتقاط الصور بطريقة إبداعية وغير تقليدية.',
      title_en: 'Photography Art: Creativity and Modern Techniques',
      description_en: 'A workshop for both beginner and professional photographers to learn advanced photography techniques and how to use modern cameras to capture images in creative and unconventional ways.',
      image: 'https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg',
    },
    {
      title: 'مستقبل الذكاء الاصطناعي وتطبيقاته في حياتنا اليومية',
      type: 'img',
      description: 'تستعرض هذه الجلسة كيفية تأثير الذكاء الاصطناعي على حياتنا اليومية، من الروبوتات إلى تحليل البيانات، وكيف يمكن أن يشكل المستقبل التقني للمجتمعات المختلفة.',
      title_en: 'The Future of Artificial Intelligence and Its Applications in Daily Life',
      description_en: 'This session highlights the impact of artificial intelligence on our daily lives, from robots to data analysis, and how it can shape the technological future of societies.',
      image: 'https://w0.peakpx.com/wallpaper/866/419/HD-wallpaper-the-future-of-ai-leading-the-charge-in-it-innovation-future-of-ai-ai-future-of-artificial-intelligence-artificial-intelligence.jpg',
    },
    {
      title: 'الاستدامة في البناء: الابتكارات البيئية المستقبلية',
      type: 'img',
      description: 'مؤتمر حول استدامة المباني واستخدام تقنيات البناء الحديثة التي تساعد على تقليل التأثير البيئي، مع تسليط الضوء على أبرز المشاريع الخضراء التي تم تنفيذها حول العالم.',
      title_en: 'Sustainability in Construction: Future Environmental Innovations',
      description_en: 'A conference about building sustainability and the use of modern construction techniques that help reduce environmental impact, highlighting the most notable green projects implemented worldwide.',
      image: 'https://contractortrainingcenter.com/cdn/shop/articles/AdobeStock_628152248_1.jpg?v=1703092946&width=1920',
    },
        // {
    //   title: 'Video',
    //   type: 'video',
    //   description: 'HERO.DESCRIPTION_3',
    //   image: 'https://sporent.net/public/videos/20240130202754562500.mp4',
    // },
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