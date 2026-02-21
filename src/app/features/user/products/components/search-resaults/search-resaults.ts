import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Iproduct } from '../../models/product';
import { Product } from "../product/product";
import { Offer } from "../offer/offer";

@Component({
  selector: 'app-search-resaults',
  imports: [Product, Offer],
  templateUrl: './search-resaults.html',
  styleUrl: './search-resaults.scss',
})
export class SearchResaults   {
  @Output() search:EventEmitter<string>=new EventEmitter<string>()
  @Input() searchResaults:Iproduct[]= []
  isDisabledBtn: boolean = true
  flag: boolean = true
 
    gridChange() {
    this.flag = !this.flag
  }
  toggleDisabled() {
    this.isDisabledBtn = !this.isDisabledBtn
  }
 @ViewChild("inputOfSearch") inputOfSearch!:ElementRef

  searchForProduct()
  {
     this.search = this.inputOfSearch.nativeElement.value

  }

}
