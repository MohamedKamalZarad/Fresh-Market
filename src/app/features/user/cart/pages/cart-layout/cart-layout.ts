import { Component, inject, Input, input, OnInit } from '@angular/core';
import { Icart,Data,Product} from '../../models/icart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-layout',
  imports: [],
  templateUrl: './cart-layout.html',
  styleUrl: './cart-layout.scss',
})
export class CartLayout implements OnInit  {
@Input() cart:Data= {} as Data
numOfCartItems:number =0
count:number=0
productList:Product[]=[]
 cartService= inject(CartService)
localCounts: Record<string, number> = {};
isShown:boolean=true
private readonly router= inject(Router)
removeSpecificItem(id:string)
{
  this.cartService.removeSpecificItem(id).subscribe({
    next:(res:any)=>{
                this.cart= res.data
            this.productList=this.cart.products
        this.numOfCartItems=res.numOfCartItems
      this.cartService.count.next(res.numOfCartItems)
     }
    
  })
}

updateItem(id: string) {
  const count = this.localCounts[id];

  this.cartService.updateCartItems(id, count).subscribe({
    next: (res: any) => {
      this.cart = res.data;
      this.productList = this.cart.products;
      this.numOfCartItems = res.numOfCartItems;
      this.cartService.count.next(this.numOfCartItems);

      this.productList.forEach(p => {
        this.localCounts[p.product._id] = p.count;
      });
    }
  });
}

getNumOfItems()
{
   this.cartService.count.subscribe(
  {
    next:(res)=>this.numOfCartItems=res
  }
 )
}
increase(id: string) {
  this.localCounts[id]++;
}

decrease(id: string) {
  if (this.localCounts[id] > 1) {
    this.localCounts[id]--;
  }
}
clearCart()
{
   this.cartService.clearCart().subscribe(
    {
      next:(res)=>{
    this.isShown=!this.isShown
         this.cartService.count.next( 0)
        console.log(res)
        
      
      }
      
    }
   )
}
stopProg(event:MouseEvent){
event.stopPropagation()
}
navigateToProductDetails(id:string) {

 
  this.router.navigate(['product/'+id]);
}
navigateToOnlinePayment()
{
  this.router.navigate(['onlinePayment/'+this.cart._id])

}
navigateToCashOnDelivery()
{
  this.router.navigate(['cashOndelivery/'+this.cart._id])

}
  
ngOnInit(): void {

  
  this.productList=this.cart.products
   this.productList.forEach(p => {
    this.localCounts[p.product._id] = p.count;
  })
this.getNumOfItems()

}
}
