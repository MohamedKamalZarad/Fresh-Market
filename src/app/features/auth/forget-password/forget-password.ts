import { Component, Inject, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Auth } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Button } from '../../../shared/components/button/button';
import { VerifyCode } from "../verify-code/verify-code";
import { ResetPassword } from "../reset-password/reset-password";

@Component({
  selector: 'app-forget-password',
  imports: [Button, ɵInternalFormsSharedModule, ReactiveFormsModule, VerifyCode, ResetPassword],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit {
private readonly fb = inject(FormBuilder)
private readonly authService = inject(Auth)

forgetPasswordRef = new Subscription()
isLogged: boolean = false
isValidRes: boolean = false
isLoading: boolean = false
flag!: boolean
step:number=0
errMessage!:string
emailValue: string = ""
ngOnInit(): void {
    initFlowbite();

  }
  forgetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  forgetPassword(){
    if (this.forgetPasswordForm.valid) {
    this.forgetPasswordRef.unsubscribe()
    this.isLoading=true
   this.forgetPasswordRef= this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next:(res)=> {

         this.isLoading=false
        this.isValidRes=true
   

        setTimeout(() => {
           this.step=1
        }, 1000)
        
        console.log(res)}
       
    })
  }
  }
  onStepChanged(step:number){
    this.step=step
  }
   controlMark(flag:boolean){
    this.flag=flag
  }
  onclick(){
     this.emailValue = this.forgetPasswordForm.get('email')?.value;
      this.forgetPassword()
    }
}
