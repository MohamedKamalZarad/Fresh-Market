import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Offer } from "../offer/offer";
import { Iproduct } from '../../models/product';
import { ProductGallary } from "../product-gallary/product-gallary";
import { LayoutFirst } from "../layout-first/layout-first";
import { LayoutSecond } from "../layout-second/layout-second";

@Component({
  selector: 'app-product',
  imports: [Offer, LayoutFirst, LayoutSecond],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
@Input() product:Iproduct = {} as Iproduct 
@Input() flag!:boolean
@Input() discount!:number
@Input() userWishListIds!: Set<string>





 
}
