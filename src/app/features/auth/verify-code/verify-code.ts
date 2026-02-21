import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Auth } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-verify-code',
  imports: [Button, ɵInternalFormsSharedModule, ReactiveFormsModule,],
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(Auth)

  @Input() email!: string
  @Output() step: EventEmitter<number> = new EventEmitter()
  verifyCodeRef = new Subscription()
  isLogged: boolean = false
  inValidReq: boolean = false
  isLoading: boolean = false
  flag: boolean = false
  errMessage!: string
  ngOnInit(): void {
    initFlowbite();

  }
  verifyCodeForm: FormGroup = this.fb.group({
    resetCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^\d{6}$/)]],
  });
  verifyResetCode() {
     if (this.verifyCodeForm.valid) {
    this.verifyCodeRef.unsubscribe()
    this.isLoading=true
     this.verifyCodeRef = this.authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res:any) => {
    
        this.flag = true
         this.isLoading=false
       
        setTimeout(() => {
          this.step.emit(2) ;
        }, 1000)
       
      }

    })
  }
  }
    forgetPassword(){
    this.verifyCodeRef.unsubscribe()
   return this.verifyCodeRef= this.authService.forgetPassword({email:this.email}).subscribe({
      next:(res)=> {
        console.log(res)}
       
    })
    
  }
  onclick() {
    this.verifyResetCode()
  }
}