import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-saiba-mais',
  templateUrl: './button-saiba-mais.component.html',
  styleUrls: ['./button-saiba-mais.component.scss'],
})
export class ButtonSaibaMaisComponent {
  @Input() label: string = 'Saiba mais';
  @Input() link: string | undefined;
  @Input() textLink: string | undefined;

  constructor() {}

  getLink(): string {
    return `https://api.whatsapp.com/send?phone=551939571436&text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site${this.textLink
    ? '%20e%20quero%20saber%20mais%20sobre%20' + this.textLink
    : ''}`;
  }
}
