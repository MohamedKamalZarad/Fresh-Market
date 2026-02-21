import { Component, inject, Input } from '@angular/core';
import { IWishlist } from '../../interface/wishlist';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wish-list-item',
  imports: [],
  templateUrl: './wish-list-item.html',
  styleUrl: './wish-list-item.scss',
})
export class WishListItem {
@Input() wishlistItem :IWishlist={} as IWishlist
private readonly router= inject(Router)
private readonly cartService= inject(CartService)
 private readonly wishListService=inject(WishlistService)
navigate() {
  if (this.wishlistItem?._id) {
 
  this.router.navigate(['product/'+this.wishlistItem._id]);
  } 

}
addToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res:any)=> {
        this.cartService.count.next(res.numOfCartItems)
    }
    
  })
}
deleteAnItemFromWishlist(){
   this.wishListService.deleteAnItemFromWishlist(this.wishlistItem?._id).subscribe(
    {
      next:(res)=>{
        console.log(res)
        
      }
    }
   )
}
}
