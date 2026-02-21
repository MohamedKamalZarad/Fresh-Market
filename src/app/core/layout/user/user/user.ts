import { AfterViewInit, Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from "../../../../shared/components/top-bar/top-bar";
import { UserBar } from "../../../../shared/components/user-bar/user-bar";
import { Navbar } from "../../../../shared/navbar/navbar";
import { CartService } from '../../../../features/user/cart/services/cart.service';
@Component({
  selector: 'app-user',
  imports: [RouterOutlet, TopBar, UserBar, Navbar],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements AfterViewInit{
  flag:boolean=true
  private readonly renderer = inject(Renderer2)
 cartService= inject(CartService)
 numOfIItems:number=0
 getUserCart()
 {
   this.cartService.getLoggedUserCart().subscribe(
     {
       next:(res:any)=>{
         this.cartService.count.next(res.numOfCartItems)
         }
       
     }
   )
 }
 getnumberOfItems()
 {
 this.cartService.count.subscribe({
   next:(value)=>this.numOfIItems=value
 })
 }
 ngOnInit(): void {
   
 this.getUserCart()
 this.getnumberOfItems()
 }
  ngAfterViewInit() {

  this.hideTopBar()
  }

 hideTopBar() {
    this.renderer.listen('window', 'scroll', () => {
       window.scrollY>10 ? this.flag =false:this.flag =true


      
    })
  }
}
