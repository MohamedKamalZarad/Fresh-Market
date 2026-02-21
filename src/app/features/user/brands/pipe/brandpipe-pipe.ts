import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../products/models/product';

@Pipe({
  name: 'brandpipe'
})
export class BrandpipePipe implements PipeTransform {

  transform(productList: Iproduct[], brandId: string):Iproduct[]{

    if (!productList|| !brandId) return [];

    return productList.filter(product =>
      product.brand?._id === brandId
    );
  }

}
