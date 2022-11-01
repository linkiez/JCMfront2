import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string | number | undefined): string | number | undefined{
    if(value){
      value = value.toString()

      value = value.replace(/\D/g, '');

      if (value.length > 8) {
        value = value.substring(0, 8);
      }

      switch (value.length) {
        case 6:
          value = value.substring(0, 5) + '-' + value.substring(5, 6);
          break;
          case 7:
            value = value.substring(0, 5) + '-' + value.substring(5, 7);
            break;
            case 8:
              value = value.substring(0, 5) + '-' + value.substring(5, 8);
              break;
      }
    }

    return value;
  }

}
