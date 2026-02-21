import { Component, inject, Input } from '@angular/core';
import { Iproduct } from '../../models/product';
import { FloorPipe } from '../../pipes/floor-pipe';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wish-list/services/wishlist.service';

@Component({
  selector: 'app-layout-second',
  imports: [FloorPipe],
  templateUrl: './layout-second.html',
  styleUrl: './layout-second.scss',
})
export class LayoutSecond {
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
