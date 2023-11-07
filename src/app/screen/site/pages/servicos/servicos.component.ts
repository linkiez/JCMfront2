import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicosComponent {
  data = [
    {
      title: 'Sapata Macho',
      desc: [
        'Sapata macho para tubo de 50x50mm de rack industrial',
        'Padrão Nissan em aço carbono 1020 SAE - 0,13kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Macho.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata Macho',
      lado: 0,
    },
    {
      title: 'Sapata Fêmea',
      desc: [
        'Sapata fêmea para tubo de 50x50mm de rack industrial',
        'Padrão Nissan em aço carbono 1020 SAE - 0,34kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Femea.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata Fêmea',
      lado: 1,
    },
    {
      title: 'Sapata',
      desc: [
        'Sapata para tubo de 40x40mm de rack industrial',
        'Padrão Honda em aço carbono 1020 SAE - 0,29kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata',
      lado: 0,
    },
    {
      title: 'Sapata Redonda Fêmea 130mm',
      desc: [
        'Sapata fêmea 130mm para tubo de 60mm de rack industrial',
        'Aço carbono 1020 SAE - 0kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Redonda-Femea-130.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata Redonda Fêmea 130mm',
      lado: 1,
    },
    {
      title: 'Sapata Macho 60mm',
      desc: [
        'Sapata macho para tubo de 60mm de rack industrial',
        'Aço carbono 1020 SAE - 0kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Macho-60.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata Macho 60mm',
      lado: 0,
    },
    {
      title: 'Sapata',
      desc: [
        'Sapata fêmea 100x100mm para tubo de 50x50mm de rack industrial',
        'Padrão Toyota em aço carbono 1020 SAE - 0,425kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Femea-100.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata',
      lado: 1,
    },
    {
      title: 'Sapata Macho',
      desc: [
        'Sapata macho para tubo de 60x60mm de rack industrial',
        'Padrão Nissan em aço carbono 1020 SAE - 0,18kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Macho-para-tudo-60.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Sapata Macho',
      lado: 0,
    },
  ];
}
