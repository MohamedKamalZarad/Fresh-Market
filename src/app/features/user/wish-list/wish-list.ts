import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { WishListItem } from "./components/wish-list-item/wish-list-item";
import { IWishlist } from './interface/wishlist';
import { Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [WishListItem],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.scss',
})
export class WishList implements OnInit{
 private readonly wishListService=inject(WishlistService)
 private readonly router= inject(Router)
private readonly cartService= inject(CartService)
 userWishList:IWishlist[] = []
   isloading: boolean = false
     pageSize: number = 8
getAllUserWishlist()
{
   this.isloading=true
 this.wishListService.getUserWishlist().subscribe(
  {
    next:(res:any)=>  {
      this.userWishList=res.data
    let x =  setTimeout(() => {
          this.isloading= false
      }, 500);
      this.wishListService.numOfWishListItems.next(this.userWishList.length)
    console.log(this.userWishList)
    
    }

  }
 )
}
navigate(id:string) {

 
  this.router.navigate(['product/'+id]);
  

}
addToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res:any)=> {
        this.cartService.count.next(res.numOfCartItems)
    }
    
  })
}
deleteAnItemFromWishlist(id:string){
   this.wishListService.deleteAnItemFromWishlist(id).subscribe(
    {
      next:(res:any)=>{
        console.log(res)
        this.wishListService.numOfWishListItems.next(res.data.length)
          this.getAllUserWishlist()
      }
    }
   )
}
ngOnInit(): void {
  this.getAllUserWishlist()
}
}
