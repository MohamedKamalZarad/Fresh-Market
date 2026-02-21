import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../models/product';

@Pipe({
  name: 'lazyPipe'
})
export class LazyPipePipe implements PipeTransform {

  transform(productList: Iproduct[],config:{start:number,end:number}): Iproduct[] {

    return productList.slice(config.start,config.end);
  }

}
