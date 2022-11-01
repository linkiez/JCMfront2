import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string | number | undefined): string | number | undefined{
    if(value){
      value = value.toString()

      value = value.replace(/\D/g, '');

      switch (value.length) {
        case 8:
          value = value.substring(0, 4) + '-' + value.substring(4, 8);
          break;
        case 9:
          value = value.substring(0, 5) + '-' + value.substring(5, 9);
          break;
        case 10:
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
          break;
        case 11:
          value = `(${value.substring(0, 2)}) ${value.substring(2, 3)} ${value.substring(
            3,
            7
          )}-${value.substring(7, 11)}`;
          break;
        
      }
    }

    return value;
  }
}
