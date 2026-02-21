import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class Auth {
 private readonly httpClient =inject(HttpClient)
 private readonly cookiesService= inject(CookieService)
 //*******************Post******************
//  constructor() {
//   this.updateUserNameFromToken();
// }


 login(data:any){
  return this.httpClient.post(environment.base + "auth/signin",data)
 }
 signUP(data:any){
  return this.httpClient.post(environment.base + "auth/signup",data)
 }
 forgetPassword(data:any){
  return this.httpClient.post(environment.base + "auth/forgotPasswords",data)
 }
 verifyResetCode(data:any){
  return this.httpClient.post(environment.base + "auth/verifyResetCode",data)
 }
  //******************Put******************
 updateLoggedUserPassword(data:any){
  return this.httpClient.put(environment.base + "users/changeMyPassword",data)
 }
 resetPassword(data:any){
  return this.httpClient.put(environment.base + "auth/resetPassword",data)
 }
 updateLoggedUserData(data:any){
  return this.httpClient.put(environment.base + "users/updateMe/",data)
 }
  //******************Get******************
 getAllUsers(){
  return this.httpClient.get(environment.base+ "users")
 }
 getUserInfo(id:any){
  return this.httpClient.get(environment.base+ "users/"+id)
 }
 verifyToken(){
  return this.httpClient.get(environment.base+ "auth/verifyToken")
 }


  

    
}
