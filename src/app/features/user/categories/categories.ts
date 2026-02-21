import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { Icategories } from './models/icategories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit{
private readonly categoriesService=inject(CategoriesService)
categriesList:Icategories[] = []

private readonly router=inject(Router)
navigate(id:string) {

 
  this.router.navigate(['category/'+id])
  

}
ngOnInit(): void {
  this.categoriesService.getAllCategories().subscribe(
    {
      next:(res:any)=> this.categriesList= res.data
      
    }
  )
}
}
