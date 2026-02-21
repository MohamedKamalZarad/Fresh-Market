import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {

  transform(price:number): number {
    return Math.floor(price)
  }

}
