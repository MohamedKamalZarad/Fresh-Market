import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly httpClient= inject(HttpClient)
  getAllBrand():any{
    return this.httpClient.get(environment.base + 'brands')
  }
  getSpecificBrand(id:string){
    return this.httpClient.get(environment.base + 'brands/' + id)
  }
}
