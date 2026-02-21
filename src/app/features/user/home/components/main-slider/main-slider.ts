import { Component } from '@angular/core';
import { OwlOptions,CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.html',
  styleUrl: './main-slider.scss',
})
export class MainSlider {
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayHoverPause:false,
    autoplayTimeout:3000,
mouseDrag:true,
    touchDrag:  true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
   autoHeight: true,
    nav: false,
    responsive: {
    0: {
      items: 1
    },
    640: {
      items: 1
    },
    768: {
      items: 1
    },
    1024: {
      items: 1
    }
  }
  }
}
