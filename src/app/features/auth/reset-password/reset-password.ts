import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Auth } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Button } from '../../../shared/components/button/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password',
  imports: [Button, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(Auth)
  private readonly router=inject(Router)
  @Input() email: string =""
  @Output() flag: EventEmitter<boolean>=new EventEmitter()
  resetPasswordRef = new Subscription()
  isLogged: boolean = false
  inValidReq: boolean = false
  isLoading: boolean = false
  errMessage!: string
  private readonly cookieService=inject(CookieService)
  ngOnInit(): void {
    initFlowbite();

  }
  resetPasswordForm: FormGroup = this.fb.group({
   newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
  rePassword: ['', [Validators.required,]],
  },{ validators:this.rePassword});

  resetPassword() {
     if (this.resetPasswordForm.valid) {
    this.resetPasswordRef.unsubscribe()
     this.isLoading=true
     this.resetPasswordRef = this.authService.resetPassword({email:this.email,newPassword:this.resetPasswordForm.get("newPassword")?.value}).subscribe({
      next: (res:any) => {
         this.cookieService.set('token', res.token)
        console.log(this.email)
         this.isLoading=false
        this.flag.emit(true)
        setTimeout(() => {
          this.router.navigate(["/login"])
          
        }, 2000);
      
       
      }

    })}
null
  }
   rePassword(formGroup: FormGroup) {  
    if(formGroup.get("newPassword")?.value!==formGroup.get("rePassword")?.value)
    {
      return {misMatch:true}
    }
    else{
      
     return null
    }
  }
  onclick() {
    this.resetPassword()
  }
}
