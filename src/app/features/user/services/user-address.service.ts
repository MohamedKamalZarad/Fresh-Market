import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
   private readonly httpClient =inject(HttpClient)
//*******************Post******************
addAddress(data:any){
  return this.httpClient.post(environment.base + "addresses",data)
 }
 //*******************Put******************
updateAddress(data:any,id:string){
  return this.httpClient.put(environment.base + "addresses/"+id,data)
 }

//*******************DELETE******************
deleteAddress(id:string){
  return this.httpClient.delete(environment.base + "addresses/"+id)
 }
 //*******************GET******************
getSpecificAddress(id:string){
  return this.httpClient.get(environment.base + "addresses/"+id)
 }
getAddresses(){
  return this.httpClient.get(environment.base + "addresses")
 }

}
