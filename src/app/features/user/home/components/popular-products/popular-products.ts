import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../products/services/product.service';
import { WishlistService } from '../../../wish-list/services/wishlist.service';
import { Iproduct } from '../../../products/models/product';
import { LayoutFirst } from "../../../products/components/layout-first/layout-first";
import { Product } from "../../../products/components/product/product";
import { Offer } from "../../../products/components/offer/offer";
import { Search } from "../../../../../shared/components/search/search";
import { OfferPipe } from '../../../products/pipes/offer-pipe';
import { SearchPipePipe } from '../../../products/pipes/search-pipe-pipe';
import { CommonModule,SlicePipe } from '@angular/common';
@Component({
  selector: 'app-popular-products',
  imports: [LayoutFirst, Product, Offer, Search,OfferPipe,SearchPipePipe,SlicePipe],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.scss',
})
export class PopularProducts implements OnInit {
  isloading: boolean = false
  isDisabledBtn: boolean = true
  flag: boolean = true
    step: number = 1
    search!: string
      @ViewChild("inputOfSearch") inputOfSearch!: ElementRef
  private readonly productService = inject(ProductService)
  private readonly wishListService = inject(WishlistService)
  userWishListIds: Set<string> = new Set()
  
    productList: Iproduct[] = []
      getAllProduct() {
    this.isloading = true
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.data
   
        setTimeout(() => {
          
          this.isloading = false
        }, 2000);
console.log(this.productList)

      }
    })


  }
    gridChange() {
    this.flag = !this.flag

  }
  toggleDisabled() {
    this.isDisabledBtn = !this.isDisabledBtn
  
  }
    searchForProduct() {
    this.search = this.inputOfSearch.nativeElement.value

  }
  changeStepper(e: number) {
    this.step = e
  }
  getSeacrhResaults(e: string) {
    this.search = e
  }
  
  ngOnInit(): void {
 this.getAllProduct()
  }
}
