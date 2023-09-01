import { Component } from '@angular/core';
import {
  faAward,
  faHands,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faAward = faAward;
  faHands = faHands;
  faChartLine = faChartLine;

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

  displayModal: boolean = false;

  openModal(): void {
    this.displayModal = true;
  }

  closeModal(): void {
    this.displayModal = false;
  }
}
