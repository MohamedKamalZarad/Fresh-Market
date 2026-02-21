import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductGallary } from "../../components/product-gallary/product-gallary";
import { Iproduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wish-list/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [ProductGallary],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit{
  cartService= inject(CartService)
  productService = inject(ProductService)
  activatedRoute=inject(ActivatedRoute)
  private readonly wishListService=inject(WishlistService)
  @Input() userWishListIds!: Set<string> 
  private readonly router= inject(Router)
 images:string[]=[]
 temp:string=''
 mainImg:string= ''
 subImg:string=''
    productId!: string  | null
    currentIndex:number=0
product:Iproduct={} as Iproduct
navigate(id:string) {

 
  this.router.navigate(['specific-brand/'+id])
  

}
  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.paramMap.get('id');
  
    this.getSingleProduct()
  }
  getSingleProduct(){
    this.productService.getSpecificProduct(this.productId!).subscribe({
      next:(res:any)=> {this.product=res.data
        this.images=this.product.images.slice(1,4)
        this.mainImg=res.data.images[0]
      }
       
    })
  }
  swapImgs(index:number){
    this.temp= this.mainImg
   this.mainImg=this.images[index]
    this.images[index]= this.temp
  }
addToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res:any)=> {
        this.cartService.count.next(res.numOfCartItems)
    }
    
  })
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
}
