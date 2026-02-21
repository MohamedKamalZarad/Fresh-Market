import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Navbar } from "../../navbar/navbar";
import { Icon } from "../../icon/icon";
import { Auth } from '../../../features/auth/services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-bar',
  imports: [Navbar, Icon, RouterLink],
  templateUrl: './user-bar.html',
  styleUrl: './user-bar.scss',
})
export class UserBar implements OnInit{
  private readonly cookiesService= inject(CookieService)
  private readonly router = inject(Router)
  private readonly authService= inject(Auth)

    userName:string=''
    
    // getUserName(){
      

  
    // this.authService.userName.subscribe(
    //   {
    //     next:(value)=> this.userName= value
    //   }
    // )
    // }
    deleteToken(){
      this.cookiesService.delete('token')
      this.router.navigate(['/login'])
    }
    goToSettings(){
         this.router.navigate(['/settings'])
    }


ngOnInit(): void {
    initFlowbite();
    this.userName= this.cookiesService.get('name')
  }
}
