import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions,CarouselModule } from 'ngx-owl-carousel-o';
import { Icategories } from '../../../categories/models/icategories';
import { CategoriesService } from '../../../categories/services/categories.service';
@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.html',
  styleUrl: './popular-categories.scss',
})
export class PopularCategories implements OnInit{
private readonly categoriesService=inject(CategoriesService)
categriesList:Icategories[] = []
  customOptions: OwlOptions = {
    loop: true,
    autoplayTimeout:3000,
    autoplayHoverPause:false,
    autoplaySpeed:1000,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],

    nav: false,
     responsive: {
    0: {
      items: 2
    },
    480: {
      items: 3
    },
    768: {
      items: 5
    },
    1024: {
      items: 7
    },
    1280: {
      items: 10
    }
  }
  }

ngOnInit(): void {
  this.categoriesService.getAllCategories().subscribe(
    {
      next:(res:any)=> this.categriesList= res.data
      
    }
  )
}
}

