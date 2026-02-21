import { Component, Inject, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../services/auth.service';
import {  Subscription } from 'rxjs';
import { MYInput } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, MYInput, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(Auth)
  private readonly cookieService=inject(CookieService)
  private readonly router=inject(Router)

  loginRef=new Subscription()
  isLogged: boolean = false
  isLoading: boolean = false
  inValidReq: boolean=false
  ngOnInit(): void {
    initFlowbite();

  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login() {
    if (this.loginForm.valid) {
      this.isLoading=true
      this.loginRef.unsubscribe()
     return this.loginRef= this.authService.login(this.loginForm.value).subscribe({
      next:(res:any)=>{console.log(res)
        this.cookieService.set('token', res.token)
        this.cookieService.set('name', res.user.name)
        // this.authService.updateUserNameFromToken();
        this.router.navigate(['/home'])
        this.inValidReq=false
        this.isLoading=false
      },
      error:(err)=>{
        this.inValidReq=true
         this.isLoading=false
      }
     })
    }
    else{
      return null
    }

  }

  onSubmit() {
    return this.login()
  }





}
