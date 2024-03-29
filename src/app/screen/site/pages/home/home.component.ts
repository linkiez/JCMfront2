import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  products = [
    {
      img: '../../../../../assets/img/Products/Sapata-Femea-100.webp',
      title: 'Copo 4,75mm 100x100x50mm',
      altText: 'Copo 4,75mm 100x100x50mm',
    },
    {
      img: '../../../../../assets/img/Products/Sapata-Femea.webp',
      title: 'Copo 4,75mm 50x50mm',
      altText: 'Copo 4,75mm 50x50mm',
    },
    {
      img: '../../../../../assets/img/Products/Sapata-Macho-60.webp',
      title: 'Sapata Macho 4,75mm D60mm',
      altText: 'Sapata Macho 4,75mm D60mm',
    },
    {
      img: '../../../../../assets/img/Products/Sapata-Macho-para-tudo-60.webp',
      title: 'Teta 3,00mm 50X50mm',
      altText: 'Teta 3,00mm 50X50mm',
    },
    {
      img: '../../../../../assets/img/Products/Sapata-Macho.webp',
      title: 'Teta 3,00mm 40X40mm',
      altText: 'Teta 3,00mm 40X40mm',
    },
    {
      img: '../../../../../assets/img/Products/Sapata-Redonda-Femea-130.webp',
      title: 'Sapata Fêmea 4,75mm D130mm',
      altText: 'Sapata Fêmea 4,75mm D130mm',
    },
    {
      img: '../../../../../assets/img/Products/Sapata.webp',
      title: 'Pézinho 3,00mm 40X40mm',
      altText: 'Pézinho 3,00mm 40X40mm',
    },
  ];

  services = [
    {
      label: 'Corte a Laser',
      class:
        'card-services1 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
    {
      label: 'Calandra de tubos',
      class:
        'card-services2 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
    {
      label: 'Dobra de chapas',
      class:
        'card-services4 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
    {
      label: 'Conformação de Peças e Estampa',
      class:
        'card-services5 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
    {
      label: 'Dobradeira de Tubo até 2',
      class:
        'card-services6 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
    {
      label: 'Calandra de Chapa',
      class:
        'card-services7 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 mt-4 hover:bg-cover',
    },
    {
      label: 'Corte a Plasma',
      class:
        'card-services3 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
    {
      label: 'Puncionadeira',
      class:
        'card-services8 transition-all duration-1000 h-64 rounded-lg shadow-md shadow-gray mx-1 flex place-content-center align-items-center hover:-translate-y-1 hover:scale-100 hover:bg-cover mt-4',
    },
  ];

  responsiveOptions = [
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '640px',
        numVisible: 1,
        numScroll: 1
    },
];

  displayModal: boolean = false;

  openModal(): void {
    this.displayModal = true;
  }

  closeModal(): void {
    this.displayModal = false;
  }

  getYearsSince(dateString: string): number {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const yearInMillis = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor(diff / yearInMillis);
  }
}
