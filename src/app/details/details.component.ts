import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  selectedImage: string = 'assets/images/news-image.png';
  selectedAlt: string = 'Main News Image';

  images = [
    { src: 'assets/images/news-image.png', alt: 'Related Image 1' },
    { src: 'assets/images/news-image.png', alt: 'Related Image 2' },
    { src: 'assets/images/news-image.png', alt: 'Related Image 3' }
  ];

  id: number = 0;

 constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);  
    }

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id); 
    });
  }


  changeImage(imageSrc: string, imageAlt: string) {
    this.selectedImage = imageSrc;
    this.selectedAlt = imageAlt;
  }
}
