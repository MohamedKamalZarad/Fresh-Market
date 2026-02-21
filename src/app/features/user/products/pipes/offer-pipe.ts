import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../models/product';

@Pipe({
  name: 'offer'
})
export class OfferPipe implements PipeTransform {

  transform(products: Iproduct[], limit: number = 20): Iproduct[] {
    return products.slice(0, limit).map((product, index) => {
  
      return {
        ...product,
        offerNumber: index % 2 === 0 ? 7 : 9
      };
    });
  }

}
