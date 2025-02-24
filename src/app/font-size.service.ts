import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {
  private fontSizes: { [key: string]: number } = {
    "--font-size-xsmall": 12,
    "--font-size-small": 14,
    "--font-size-normal": 16,
    "--font-size-medium": 18,
    "--font-size-mediumM": 20,
    "--font-size-large": 20,
    "--font-size-xlarge": 30,
    "--font-size-xl": 36,
    "--font-size-xxl": 38,
    "--font-size-xxxl": 50,
    "--font-size-xxxxl": 60,
    "--font-size-big": 120,
    "--font-size-ultrabig": 200
  };

  private step = 1; // Step size for increase/decrease

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.applyFontSizes();
    }
  }

  private applyFontSizes() {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.fontSizes).forEach((key: string) => {
        document.documentElement.style.setProperty(key, `${this.fontSizes[key]}px`);
      });
    }
  }

  increaseFontSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.fontSizes).forEach((key: string) => {
        const maxLimits: { [key: string]: number } = {
          "--font-size-xsmall": 20,
          "--font-size-small": 22,
          "--font-size-normal": 26,
          "--font-size-medium": 28,
          "--font-size-mediumM": 30,
          "--font-size-large": 40,
          "--font-size-xlarge": 50,
          "--font-size-xl": 60,
          "--font-size-xxl": 64,
          "--font-size-xxxl": 80,
          "--font-size-xxxxl": 100,
          "--font-size-big": 150,
          "--font-size-ultrabig": 250
        };
  
        // Ensure it does not exceed max limit
        if (this.fontSizes[key] + this.step <= maxLimits[key]) {
          this.fontSizes[key] += this.step;
        }
      });
  
      this.applyFontSizes();
    }
  }
  

  decreaseFontSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.keys(this.fontSizes).forEach((key: string) => {
        this.fontSizes[key] = Math.max(this.fontSizes[key] - this.step, 10);
      });
      this.applyFontSizes();
    }
  }
}
