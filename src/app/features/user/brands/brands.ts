import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from './services/brand.service';
import { Ibrand } from './models/ibrand';
import { Brand } from "./components/brand/brand";
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [Brand],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands implements OnInit{
private readonly brandService = inject(BrandService)
brandList:Ibrand[] = []

getAllBrands()
{
  this.brandService.getAllBrand().subscribe(
    {
      next:(res:any)=> this.brandList= res.data 
      
    }
  )
}



ngOnInit(): void {
  this.getAllBrands()
}
}
