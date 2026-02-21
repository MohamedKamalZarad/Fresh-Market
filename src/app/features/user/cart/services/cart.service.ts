import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient= inject(HttpClient)
  addProductToCart(id:string)
  {
  return  this.httpClient.post(environment.base+'cart',{
    productId:id
  })
  }
  getLoggedUserCart()
  {
     return  this.httpClient.get(environment.base+'cart')
  }
  removeSpecificItem(id:string)
  {
     return  this.httpClient.delete(environment.base+'cart/'+id)
  }
  updateCartItems(id:string,count:number)
  {
    return  this.httpClient.put(environment.base+'cart/'+id , {
       count
    })
  }
  clearCart()
  {
    return  this.httpClient.delete(environment.base+'cart/')
  }
  count:BehaviorSubject<number>=new BehaviorSubject<number>(0)
}
