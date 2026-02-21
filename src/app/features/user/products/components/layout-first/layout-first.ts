import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Iproduct } from '../../models/product';
import { FloorPipe } from '../../pipes/floor-pipe';
import { ProductGallary } from "../product-gallary/product-gallary";
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wish-list/services/wishlist.service';
import { IWishlist } from '../../../wish-list/interface/wishlist';

@Component({
  selector: 'app-layout-first',
  imports: [FloorPipe],
  templateUrl: './layout-first.html',
  styleUrl: './layout-first.scss',
})
export class LayoutFirst {
@Input() product:Iproduct = {} as Iproduct
@Input() userWishListIds!: Set<string> 

private readonly router= inject(Router)
private readonly cartService= inject(CartService)
private readonly wishListService=inject(WishlistService)
addToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res:any)=> {
        this.cartService.count.next(res.numOfCartItems)
    }
    
  })
}

navigate() {
  if (this.product?._id) {
 
  this.router.navigate(['product/'+this.product._id]);
  } 

}
addToWishList()
{
  this.wishListService.addItemToWishlist({
    "productId": this.product._id
  }).subscribe(
    {
      next:(res:any)=>
      {
        console.log(res)
             this.userWishListIds = new Set(
        res.data.map((item:string) => item)

      )
            this.wishListService.numOfWishListItems.next(this.userWishListIds.size)

        console.log( this.userWishListIds,this.userWishListIds.size)
      }
    }
  )
}
deleteAnItemFromWishlist()
{
  this.wishListService.deleteAnItemFromWishlist(this.product._id).subscribe({
    next:(res:any)=>{console.log(res)
                   this.userWishListIds = new Set(
        res.data.map((item:string) => item)

      )
         this.wishListService.numOfWishListItems.next(this.userWishListIds.size)
    }
    
  })
}
}
