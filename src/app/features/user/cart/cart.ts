import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Icart,Product,Data } from './models/icart';
import { EmptyCartLayout } from "./pages/empty-cart-layout/empty-cart-layout";
import { CartLayout } from "./pages/cart-layout/cart-layout";

@Component({
  selector: 'app-cart',
  imports: [EmptyCartLayout, CartLayout],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{
private readonly cartService= inject(CartService)
numberOFCartItems:number=0
cart:Data= {} as Data
flag:boolean=false
getCartItem(){
  this.cartService.getLoggedUserCart().subscribe(
    {
      next:(res:any)=>{
        this.cart= res.data

   this.flag= true
           
          
       
        
        this.numberOFCartItems=res.numOfCartItems
         this.cartService.count.next( this.numberOFCartItems)
      }
    }
  )
}
getCurrentCartItemNum()
{
   this.cartService.count.subscribe({
    next:(value) => {this.numberOFCartItems=value
     if (this.numberOFCartItems<=0) {
   this.flag= false
           }
         

    }
   })
}
ngOnInit(): void {
  this.getCartItem()
  this.getCurrentCartItemNum()
}
}
