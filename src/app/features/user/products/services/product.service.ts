import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
private readonly httpClient = inject(HttpClient)
getAllProducts(pageNumber:number = 1):Observable<any>{
return this.httpClient.get(environment.base + `products?page=${pageNumber}`)
}
getSpecificProduct(id:string):any{
  return this.httpClient.get(environment.base + `products/${id}`)
}
}
