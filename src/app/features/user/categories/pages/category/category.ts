import { Component, inject, OnInit } from '@angular/core';
import { Filter } from "../../../../../shared/components/filter/filter";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { CategoriesService } from '../../services/categories.service';
import { Ibrand } from '../../../brands/models/ibrand';
import { Iproduct } from '../../../products/models/product';
import { CategoryPipePipe } from '../../pipe/category-pipe-pipe';
import { Icategories } from '../../models/icategories';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [Filter, CategoryPipePipe, DatePipe],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  private readonly categoriesService = inject(CategoriesService)
  categoryId!: string | null;
  categoryItems: Icategories = {} as Icategories
  productList: Iproduct[] = []
  getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.data

        console.log(this.productList)

      }
    })


  }
  getSpecificCategory() {
    this.categoriesService.getSpecificCategory(this.categoryId!).subscribe
      (
        {
          next: (res: any) => {
            this.categoryItems = res.data
            console.log(res)
          }
        }
      )
  }
  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getSpecificCategory()
    this.getAllProduct()
  }
}
