import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { UserAddressService } from '../services/user-address.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../user-address/services/order.service';
import { Addresses } from '../settings/pages/address-settings/interfaces/addresses';
import { InputDiffUI } from "../../../shared/components/input-diff-ui/input-diff-ui";


@Component({
  selector: 'app-cash',
  imports: [ReactiveFormsModule, InputDiffUI],
  templateUrl: './cash.html',
  styleUrl: './cash.scss',
})
export class Cash implements OnInit{
  private readonly fb = inject(FormBuilder)
  private readonly userAddressService=inject(UserAddressService)
 private readonly activatedRoute=inject(ActivatedRoute)
    private readonly orderService=inject(OrderService)
    cartId!:string
    addressList:Addresses[]=[]
     addressForm: FormGroup = this.fb.group({
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+20|0)?1[0-2,5][0-9]{8}$/)]]
  }, );
  getAddresses()
{
  this.userAddressService.getAddresses().subscribe(

    {
      next:(res:any)=> {
       this.addressList =res.data
       console.log(this.addressList)

      }
      
    }
  )
}
addAddress()
{
   

  const data={
    "details": this.addressForm.get("description")?.value,
    "phone": this.addressForm.get("phone")?.value,
    "city": this.addressForm.get("city")?.value
}
  this.userAddressService.addAddress(data).subscribe(
    {
      next:(res)=>{

    this.getAddresses()


  }
    }
  )
}

sendAddress(event: Event) {
  const select = event.target as HTMLSelectElement;
  const id = select.value;

  const address = this.addressList.find(a => a._id === id);
  if (!address) return;

  this.addressForm.patchValue({
    city: address.city,
    description: address.details,
    phone: address.phone
  });

 
}
getCartId()
{
this.cartId=this.activatedRoute.snapshot.paramMap.get('id')!
 
}
createCashOrder()
{
  const data={
     "shippingAddress":{
    "details": this.addressForm.get("description")?.value,
    "phone": this.addressForm.get("phone")?.value,
    "city": this.addressForm.get("city")?.value}
}
  this.orderService.createCashOrder(this.cartId, data).subscribe(
    {
      next:(res)=>{

   console.log(res)
   


  }
    }
  )

}
  ngOnInit(): void {
     this.getAddresses()
     this.getCartId()
  }
}

