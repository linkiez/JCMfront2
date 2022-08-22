import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ieRg',
})
export class IeRgPipe implements PipeTransform {
  transform(value: string | number | undefined, args?: any): any {
    if (value) {
      value = value.toString();

      value = value.replace(/\D/g, '');

      if (value.length > 12) {
        value = value.substring(0, 12);
      }

      switch (value.length) {
        case 4:
          value = value.replace(/(\d{2})(\d+)/, '$1.$2');
          break;
        case 5:
          value = value.replace(/(\d{2})(\d+)/, '$1.$2');
          break;
        case 6:
          value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
          break;
        case 7:
          value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
          break;
        case 8:
          value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
          break;
        case 9:
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
          break;
        case 10:
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
          break;
        case 11:
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3.$4');
          break;
        case 12:
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3.$4');
          break;
        default:
          return value;
      }
    }
    return value;
  }
}
