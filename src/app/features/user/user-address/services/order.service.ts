import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private readonly httpClient =inject(HttpClient)

//Post
createCashOrder(cartId:string,data:any)
{
 return this.httpClient.post(environment.base+'orders/'+cartId,data)
}
checkoutSession(id:string,data:any)
{
  return  this.httpClient.post(environment.base+`orders/checkout-session/${id}?url=http://localhost:4200`,data)
}
//get
getAllOrders()
{
 return  this.httpClient.get(environment.base+'orders')
}
getAnOrder(id:string)
{
 return  this.httpClient.get(environment.base+'orders/'+id)
}
getUserOrders(id:string)
{
 return  this.httpClient.get(environment.base+'orders/user/'+id)
}
  orderCount:BehaviorSubject<number>=new BehaviorSubject<number>(0)
}
