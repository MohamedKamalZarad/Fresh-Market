import { AfterViewInit, Component, ElementRef, inject, OnInit, Output, Renderer2, ViewChild, viewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductService } from './services/product.service';
import { Iproduct } from './models/product';
import { Product } from "./components/product/product";
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyPipePipe } from './pipes/lazy-pipe-pipe';
import { defer } from 'rxjs';
import { OfferPipe } from './pipes/offer-pipe';
import { Offer } from "./components/offer/offer";
import { SearchPipePipe } from './pipes/search-pipe-pipe';
import { Search } from "../../../shared/components/search/search";
import { SearchResaults } from "./components/search-resaults/search-resaults";
import { WishlistService } from '../wish-list/services/wishlist.service';
import { IWishlist } from '../wish-list/interface/wishlist';

@Component({
  selector: 'app-products',
  imports: [NgxPaginationModule, Product, LazyPipePipe, OfferPipe, SearchPipePipe, Offer, Search, SearchResaults],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, AfterViewInit {

  isloading: boolean = false
  step: number = 1
  private readonly productService = inject(ProductService)
  private readonly wishListService = inject(WishlistService)
userWishListIds: Set<string> = new Set()
  isDisabledBtn: boolean = true
  pageSize: number = 8
  p!: number
  total!: number
  productList: Iproduct[] = []
  flag: boolean = true
  hideLogo: boolean = false
  search!: string
  end: number = 8
  getAllProduct(pageNumber: number = 1) {
    this.isloading = true
    this.productService.getAllProducts(pageNumber).subscribe({
      next: (res: any) => {
        this.productList = res.data
        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total = res.results
        setTimeout(() => {
          
          this.isloading = false
        }, 1000);

      }
    })


  }
  toggleDisabled(e: any) {
    this.isDisabledBtn = e
  }
  gridChange(e: any) {
    this.flag = e
  }


  loadMore() {

    this.end += 8

  }

  private readonly renderer = inject(Renderer2)

  ngAfterViewInit() {


    this.hideTopBar()
  }

  hideTopBar() {
    this.renderer.listen('window', 'scroll', () => {
      window.scrollY > 10 ? this.hideLogo = true : this.hideLogo = false



    })
  }

  @ViewChild("inputOfSearch") inputOfSearch!: ElementRef

  searchForProduct() {
    this.search = this.inputOfSearch.nativeElement.value

  }
  changeStepper(e: number) {
    this.step = e
  }
  getSeacrhResaults(e: string) {
    this.search = e
  }
getAllUserWishlist() {
  this.wishListService.getUserWishlist().subscribe({
    next: (res: any) => {
      this.userWishListIds = new Set(
        res.data.map((item: IWishlist) => item._id)
      );
        this.wishListService.numOfWishListItems.next(this.userWishListIds.size)
      console.log(this.userWishListIds);
    }
  });
}


    ngOnInit(): void {
    initFlowbite();
    this.getAllProduct();
    this.step = 1
  this.getAllUserWishlist() 
  }
}

