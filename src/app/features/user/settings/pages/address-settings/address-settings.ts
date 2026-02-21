import { Component, inject, OnInit } from '@angular/core';
import { MYInput } from "../../../../../shared/components/input/input";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Button } from "../../../../../shared/components/button/button";
import { UserAddressService } from '../../../services/user-address.service';
import { AddressCard } from "./components/address-card/address-card";
import { Addresses } from './interfaces/addresses';
import { InputDiffUI } from "../../../../../shared/components/input-diff-ui/input-diff-ui";
 
@Component({
  selector: 'app-address-settings',
  imports: [MYInput, ReactiveFormsModule, Button, AddressCard, InputDiffUI],
  templateUrl: './address-settings.html',
  styleUrl: './address-settings.scss',
})
export class AddressSettings implements OnInit{
  private readonly fb = inject(FormBuilder)
  private readonly userAddressService=inject(UserAddressService)

  addressList:Addresses[]=[]
  addressLength:number=0
  isShown: boolean = false
  toAdd: boolean = false
  inValidReq: boolean = false
  choice:string = ''
  errMessage!:string
  selectedAddress!: Addresses
   addressForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+20|0)?1[0-2,5][0-9]{8}$/)]]
  }, );

addAddress()
{
   

  const data={
    "name": this.addressForm.get("name")?.value,
    "details": this.addressForm.get("description")?.value,
    "phone": this.addressForm.get("phone")?.value,
    "city": this.addressForm.get("city")?.value
}
  this.userAddressService.addAddress(data).subscribe(
    {
      next:(res)=>{

    this.isShown=!this.isShown

    this.getAddresses()


  }
    }
  )
}
sendAddress(address: Addresses)
{
 this.choice = 'update';
  this.selectedAddress = address;
  this.isShown = true;

  this.addressForm.patchValue({
    name: address.name,
    city: address.city,
    description: address.details,
    phone: address.phone
  })
  this.addressForm.get('name')?.disable()
  


}
deleteAddress(id:string)
{
  this.userAddressService.deleteAddress(id).subscribe(
    {
      next:(res)=>{
        console.log(res)
    this.getAddresses()
      }
    }
  )
}
chooseFunc(){
if(this.choice==='add')
{

  this.addAddress()
}
if(this.choice==='update')
{
  

this.updateAddress()
}
}
updateAddress()
{
    const data={
    "details": this.addressForm.get("description")?.value,
    "phone": this.addressForm.get("phone")?.value,
    "city": this.addressForm.get("city")?.value
}
  this.userAddressService.updateAddress(data, this.selectedAddress._id)
.subscribe(
    {
      next:(res)=>{
        console.log(res)
        this.getAddresses()
        this.isShown=!this.isShown

      }
    }
  )
}
getAddresses()
{
  this.userAddressService.getAddresses().subscribe(

    {
      next:(res:any)=> {
       this.addressList =res.data
       console.log(this.addressList)
     this.addressLength=this.addressList.length
      }
      
    }
  )
}
stopProg(event:Event){
event.stopPropagation()
}


  ngOnInit(): void {
    this.getAddresses()
  }
}
