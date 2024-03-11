import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutosComponent {
  data = [
    {
      title: 'Peças Estampadas 3,00mm 50X50(Teta)',
      desc: [
        'Sapata macho para tubo de 50x50mm de rack industrial',
        'Padrão Nissan em aço carbono 1020 SAE - 0,17kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Macho.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 3,00mm 50X50(Teta)',
      lado: 0,
    },
    {
      title: 'Peças Estampadas 4,75mm 50X50(Copo)',
      desc: [
        'Sapata fêmea para tubo de 50x50mm de rack industrial',
        'Padrão Nissan em aço carbono 1020 SAE - 0,34kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Femea.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 4,75mm 50X50(Copo)',
      lado: 1,
    },
    {
      title: 'Peças Estampadas 3,00mm 40X40 (Pezinho)',
      desc: [
        'Sapata para tubo de 40x40mm de rack industrial',
        'Padrão Honda em aço carbono 1020 SAE - 0,38kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 3,00mm 40X40 (Pezinho)',
      lado: 0,
    },
    {
      title: 'Peças Estampadas 4,75mm Ø130mm (Sapata Redonda Femea)',
      desc: [
        'Sapata fêmea 130mm para tubo de 60mm de rack industrial',
        'Aço carbono 1020 SAE - 0,86kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Redonda-Femea-130.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 4,75mm Ø130mm (Sapata Redonda Femea)',
      lado: 1,
    },
    {
      title: 'Peças Estampadas 4,75mm Ø60mm (Sapata Redonda Macho)',
      desc: [
        'Sapata macho para tubo de 60mm de rack industrial',
        'Aço carbono 1020 SAE - 0,24kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Macho-60.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 4,75mm Ø60mm (Sapata Redonda Macho)',
      lado: 0,
    },
    {
      title: 'Peças Estampadas 4,75mm 100X100X50(Copo)',
      desc: [
        'Sapata fêmea 100x100x50mm para tubo de 50x50mm de rack industrial',
        'Padrão Toyota em aço carbono 1020 SAE - 1,15kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Femea-100.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 4,75mm 100X100X50(Copo)',
      lado: 1,
    },
    {
      title: 'Peças Estampadas 3,00mm 60X60(Teta)',
      desc: [
        'Sapata macho para tubo de 60x60mm de rack industrial',
        'Padrão Nissan em aço carbono 1020 SAE - 0,22kg / Unidade'
      ],
      img: '../../../../../assets/img/Products/Sapata-Macho-para-tudo-60.webp',
      textBtn: 'Saiba Mais',
      textLink: 'Peças Estampadas 3,00mm 60X60(Teta)',
      lado: 0,
    },
  ];
}
