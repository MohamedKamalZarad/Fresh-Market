import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../features/user/cart/services/cart.service';
import { OrderService } from '../../features/user/user-address/services/order.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../features/user/wish-list/services/wishlist.service';
import { Cart } from "../../features/user/cart/cart";

@Component({
  selector: 'app-icon',
  imports: [Cart],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon implements OnInit {
  cartService = inject(CartService)
  orderService = inject(OrderService)
  wishListService = inject(WishlistService)
  private readonly router = inject(Router)
  numOfIItems: number = 0
  orderCount: number = 0
  numOfWishListItems: number = 0
  cartIsopened:boolean=false
  getnumberOfItems() {
    this.cartService.count.subscribe({
      next: (value) => this.numOfIItems = value
    })
  }
  getOrderCount() {
    this.orderService.orderCount.subscribe({
      next: (value) => this.orderCount = value
    })
  }
   getnumberOfWishListItems() {
     this.wishListService.numOfWishListItems.subscribe(
      {
        next:(res)=>
        {
          console.log(res)
          
this.numOfWishListItems=res
        }
      }
     )
   }
navigateToAllOrder()
{
this.router.navigate(["allorders"])
}
navigateToWislist()
{
this.router.navigate(["wishlist"])
}
navigateToCart()
{
this.router.navigate(["cart"])
}
stopProg(event:MouseEvent){
event.stopPropagation()
}
  ngOnInit(): void {

    this.getOrderCount()

    this.getnumberOfItems()
     this.getnumberOfWishListItems()
  
  }

  }
