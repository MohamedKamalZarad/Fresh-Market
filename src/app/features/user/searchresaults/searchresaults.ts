import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Filter } from "../../../shared/components/filter/filter";
import { Iproduct } from '../products/models/product';
import { OfferPipe } from '../products/pipes/offer-pipe';
import { SearchPipePipe } from '../products/pipes/search-pipe-pipe';
import { SlicePipe } from '@angular/common';
import { Product } from "../products/components/product/product";
import { Offer } from "../products/components/offer/offer";
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-searchresaults',
  imports: [Filter, OfferPipe, SearchPipePipe, SlicePipe, Product, Offer],
  templateUrl: './searchresaults.html',
  styleUrl: './searchresaults.scss',
})
export class Searchresaults implements OnInit {
  isloading: boolean = true
  isDisabledBtn: boolean = true
  flag: boolean = true
  search!: string
  userWishListIds: Set<string> = new Set()
  private readonly productService = inject(ProductService)
  productList: Iproduct[] = []
  step: number = 1
  @ViewChild("inputOfSearch") inputOfSearch!: ElementRef
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
  showSkelton() {
    setTimeout(() => {
      this.isloading = false
    }, 1500);
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.data
        console.log(res.data)
     this.showSkelton()

      }
    })
  }

  ngOnInit(): void {
    initFlowbite()

    this.getAllProduct()
  }
}
