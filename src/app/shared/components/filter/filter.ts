import { Component, ElementRef, inject, Input, input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../features/user/products/services/product.service';
import { WishlistService } from '../../../features/user/wish-list/services/wishlist.service';
import { Iproduct } from '../../../features/user/products/models/product';
import { Product } from "../../../features/user/products/components/product/product";
import { Offer } from "../../../features/user/products/components/offer/offer";
import { SlicePipe } from '@angular/common';
import { SearchPipePipe } from '../../../features/user/products/pipes/search-pipe-pipe';
import { OfferPipe } from '../../../features/user/products/pipes/offer-pipe';
import { Brand } from '../../../features/user/brands/components/brand/brand';
import { Brands } from '../../../features/user/brands/brands';
import { Ibrand } from '../../../features/user/brands/models/ibrand';

@Component({
  selector: 'app-filter',
  imports: [Product, Offer, OfferPipe, SearchPipePipe, SlicePipe],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter implements OnInit {
  isloading: boolean = true
  isDisabledBtn: boolean = true
  flag: boolean = true
  step: number = 1
  search!: string
@Input() brandItems: Iproduct[] =[]
  @ViewChild("inputOfSearch") inputOfSearch!: ElementRef


  userWishListIds: Set<string> = new Set()


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
showSkelton()
{
  setTimeout(() => {
    this.isloading=false
  }, 1500);
}
  ngOnInit(): void {
this.showSkelton()
  }
}
