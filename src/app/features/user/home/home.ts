import { Component } from '@angular/core';
import { OwlOptions,CarouselModule } from 'ngx-owl-carousel-o';
import { MainSlider } from "./components/main-slider/main-slider";
import { PopularCategories } from "./components/popular-categories/popular-categories";
import { PopularProducts } from "./components/popular-products/popular-products";
@Component({
  selector: 'app-home',
  imports: [CarouselModule, MainSlider, PopularCategories, PopularProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
