import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../../../auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { UserInfo } from '../../interfaces/user-info';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-account-settings',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss',
})
export class AccountSettings implements OnInit {

private readonly authService= inject(Auth)
private readonly cookiesService= inject(CookieService)
private readonly fb = inject(FormBuilder)
isEditable:boolean=false
userInfo:UserInfo ={} as UserInfo
decodeToken!:any
  updateUserInfoForm: FormGroup = this.fb.group({
    name: [{ value: '', disabled: !this.isEditable }, [Validators.required]],
    email: [{ value: '', disabled: !this.isEditable }, [Validators.required,Validators.email]],
    phone: [{ value: '', disabled: !this.isEditable }, [Validators.required]]
  })

getUserInfo()
{
this.decodeToken = jwtDecode(this.cookiesService.get('token'))
this.authService.getUserInfo(this.decodeToken.id).subscribe(
  {
    next:(res:any)=> {this.userInfo =res.data
      console.log(this.userInfo)
        this.updateUserInfoForm.patchValue({
    name: this.userInfo.name,
    email: this.userInfo.email,
    phone: this.userInfo.phone
  });
    }
    
  }
)

}
updateInfo(){
  if (!this.isEditable) {
    this.toggleEdit();
    return
  }
if(this.updateUserInfoForm.valid)
{
  const data = {
    "name": this.updateUserInfoForm.get('name')?.value,
    "email": this.updateUserInfoForm.get('email')?.value,
    "phone": this.updateUserInfoForm.get('phone')?.value

  }
  this.authService.updateLoggedUserData(data).subscribe(
    {
      next:(res)=> console.log(res)
      
    }
  )

     this.toggleEdit();
}

}
toggleEdit(){
  this.isEditable=!this.isEditable
   Object.keys(this.updateUserInfoForm.controls).forEach(key => {
    const control = this.updateUserInfoForm.get(key);
    if (this.isEditable) {
      control?.enable(); 
    } else {
      control?.disable();
    }
  });
}
ngOnInit(): void {
  this.getUserInfo()

}
}
