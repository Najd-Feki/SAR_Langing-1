import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
    { src: 'assets/images/english.jpg', alt: 'Related Image 1' },
    { src: 'assets/images/news-image.png', alt: 'Related Image 2' },
    { src: 'assets/images/news-image.png', alt: 'Related Image 3' }
  ];

  changeImage(imageSrc: string, imageAlt: string) {
    this.selectedImage = imageSrc;
    this.selectedAlt = imageAlt;
  }
}
