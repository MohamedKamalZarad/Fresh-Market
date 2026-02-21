import { Component, Inject, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MYInput } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  imports: [RouterLink, MYInput, Button, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  ngOnInit(): void {
    initFlowbite();

  }
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(Auth)
  private readonly router=inject(Router)
  private readonly cookieService=inject(CookieService)
  registerRef = new Subscription()
  isLogged: boolean = false
  inValidReq: boolean = false
  isLoading: boolean = false
  errMessage!:string
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
    rePassword: ['', [Validators.required,]],
    agreeWithTerms: ['', [Validators.required,]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+20|0)?1[0-2,5][0-9]{8}$/)]]
  }, { validators:[ this.rePassword , this.onCheck]});

  rePassword(formGroup: FormGroup) {  
    if(formGroup.get("password")?.value!==formGroup.get("rePassword")?.value)
    {
      return {misMatch:true}
    }
    else{
      
     return null
    }
  }
onChange(){
  this.onCheck
}
onCheck(formGroup: FormGroup) {
const checked= formGroup.get('agreeWithTerms')?.value
if (checked) return null;

  return { termsNotAccepted: true };
}
  register() {
    if (this.registerForm.valid) {
      this.registerRef.unsubscribe()
      this.isLoading=true
      return this.registerRef = this.authService.signUP(this.registerForm.value).subscribe({
      next:(res:any)=>{
        this.cookieService.set('token', res.token)
         this.isLoading=false
        this.router.navigate(['/login']) 
        this.errMessage=""
        this.inValidReq=false
      },
      error:(err)=>{
         this.isLoading=false
        console.log(err);
        this.errMessage=err.error.message
        this.inValidReq=true
      }
     }
      )
    }
    else {
      return null
    }

  }

  onSubmit() {
    return this.register()
  }
}
