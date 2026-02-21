import { Component, inject, Input } from '@angular/core';
import { Ibrand } from '../../models/ibrand';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class Brand {
@Input() brand:Ibrand ={} as Ibrand
private readonly router= inject(Router)
navigate(id:string) {

 
  this.router.navigate(['specific-brand/'+id])
  

}
}
