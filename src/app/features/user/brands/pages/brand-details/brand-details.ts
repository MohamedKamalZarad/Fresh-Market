import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../cart/models/icart';
import { Product } from "../../../products/components/product/product";
import { Offer } from "../../../products/components/offer/offer";
import { Filter } from "../../../../../shared/components/filter/filter";
import { Ibrand } from '../../models/ibrand';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../products/services/product.service';
import { Iproduct } from '../../../products/models/product';
import { BrandpipePipe } from '../../pipe/brandpipe-pipe';

@Component({
  selector: 'app-brand-details',
  imports: [Product, Offer, Filter, DatePipe,BrandpipePipe],
  templateUrl: './brand-details.html',
  styleUrl: './brand-details.scss',
})
export class BrandDetails implements OnInit {
  private readonly brandService = inject(BrandService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  private readonly router = inject(Router)

  brandId!: string | null;
  brandItems: Ibrand = {} as Ibrand
productList: Iproduct[] = []

  getSpecificBrand() {
    this.brandService.getSpecificBrand(this.brandId!).subscribe(
      {
        next: (res: any) => {
          this.brandItems = res.data
          
          console.log(this.brandItems)

        }
      }
    )
  }
  getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.data

        console.log(this.productList)

      }
    })


  }
  ngOnInit(): void {
    this.brandId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getSpecificBrand()
    this.getAllProduct()

  }
}
