import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../models/product';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(productList:Iproduct[],word:string){
    if(!word || word.trim()=='') return productList
    word = word.toLowerCase()
    return productList.filter(product =>
      product.title.toLowerCase().includes(word)
     )
  }

}
