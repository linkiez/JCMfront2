import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Input,
  OnInit,

} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('bounceInAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}

