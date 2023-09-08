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

})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() lado: number = 0;

  constructor() {}

  ngOnInit(): void {}
}

