import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria',
})
export class CategoriaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let data: string;

    if (value === 'MEDICINA') {
      data = 'MEDICINA HIPERBARICA';
    }

    if (value === 'BUCEO') {
      data = 'BUCEO INDUSTRIAL';
    }

    return data;
  }
}
