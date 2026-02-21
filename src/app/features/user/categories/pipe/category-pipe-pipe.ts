import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../products/models/product';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipePipe implements PipeTransform {

  transform(productList: Iproduct[], categoryId: string):Iproduct[]{

    if (!productList|| !categoryId) return [];

    return productList.filter(product =>
      product.category?._id === categoryId
    );
  }
}
