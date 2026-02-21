import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Iproduct } from '../../models/product';
import { initFlowbite } from 'flowbite';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-gallary',
  imports: [],
  templateUrl: './product-gallary.html',
  styleUrl: './product-gallary.scss',
})
export class ProductGallary implements OnInit {
  ngOnInit(): void {
    initFlowbite()

     this. startAutoSlide() 
  }

  currentIndex = 0
  intervalId!: any
@Input() singleProduct:Iproduct = {} as Iproduct
  productService = inject(ProductService)


    ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 2000);
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.singleProduct.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.singleProduct.images.length) %
      this.singleProduct.images.length;
  }
  getTransform(i: number) {
  if (i === this.currentIndex) return 'translateX(0)';
  if (i < this.currentIndex) return 'translateX(-100%)';
  return 'translateX(100%)';
}

}
