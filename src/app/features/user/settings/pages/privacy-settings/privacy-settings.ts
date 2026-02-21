import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../../../auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MYInput } from "../../../../../shared/components/input/input";
import { initFlowbite } from 'flowbite';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-privacy-settings',
  imports: [MYInput,ReactiveFormsModule],
  templateUrl: './privacy-settings.html',
  styleUrl: './privacy-settings.scss',
})
export class PrivacySettings implements OnInit{
private readonly authService= inject(Auth)
private readonly cookiesService= inject(CookieService)
private readonly fb = inject(FormBuilder)
isEditable:boolean=false
decodeToken!:any
  updatePasswordForm: FormGroup = this.fb.group({
// Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    currentPassword: [{ value: '', disabled: !this.isEditable }, [Validators.required]],
    password: [{ value: '', disabled: !this.isEditable }, [Validators.required, ]],
    rePassword: [{ value: '', disabled: !this.isEditable }, [Validators.required,]],

  } , { validators:[ this.rePassword ]});

  rePassword(formGroup: FormGroup) {  
    if(formGroup.get("password")?.value!==formGroup.get("rePassword")?.value)
    {
      return {misMatch:true}
    }
    else{
      
     return null
    }
  }
updateInfo(){
  if (!this.isEditable) {
    this.toggleEdit();
    return
  }
if(this. updatePasswordForm.valid)
{
  const data = {
    "currentPassword":this. updatePasswordForm.get('currentPassword')?.value,
    "password":this. updatePasswordForm.get('password')?.value,
    "rePassword":this. updatePasswordForm.get('rePassword')?.value

  }
  this.authService.updateLoggedUserPassword(data).subscribe(
    {
      next:(res:any)=> {console.log(res)
      this.cookiesService.set('token', res.token)
      this.cookiesService.set('name', res.user.name)

   
   
// this.authService.userName.next(res.user.name);

      }
      
    }
  )

     this.toggleEdit();
}

}
toggleEdit(){
  this.isEditable=!this.isEditable
   Object.keys(this. updatePasswordForm.controls).forEach(key => {
    const control = this. updatePasswordForm.get(key);
    if (this.isEditable) {
      control?.enable(); 
    } else {
      control?.disable();
    }
  });
}
ngOnInit(): void {
      initFlowbite()
}
}
