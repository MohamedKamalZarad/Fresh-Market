import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WishlistService {
numOfWishListItems:BehaviorSubject<number>=new BehaviorSubject<number>(0)
 private readonly httpClient=inject(HttpClient)
getUserWishlist(){
 return this.httpClient.get(environment.base + "wishlist")
}
addItemToWishlist(data:any){
   return this.httpClient.post(environment.base + "wishlist/",data)
}
deleteAnItemFromWishlist(id:string){
 return this.httpClient.delete(environment.base + "wishlist/"+id)
}
}
