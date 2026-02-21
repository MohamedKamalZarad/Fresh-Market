import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../../features/user/products/services/product.service';
import { Iproduct } from '../../../../features/user/products/models/product';
import { FloorPipe } from '../../../../features/user/products/pipes/floor-pipe';
import { SearchPipePipe } from '../../../../features/user/products/pipes/search-pipe-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchlist',
  imports: [FloorPipe,SearchPipePipe],
  templateUrl: './searchlist.html',
  styleUrl: './searchlist.scss',
})
export class Searchlist implements OnInit{
  @Input() search!: string
  productList: Iproduct[] = []
  private readonly router= inject(Router)
  private readonly productService = inject(ProductService)
  getAllProduct() {

    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.data
  
        console.log(this.productList)

      }
    })


  }
  navigate(id:string) {

 
  this.router.navigate(['product/'+id]);
  

}
  ngOnInit(): void {
     this.getAllProduct()
     
  }
}
