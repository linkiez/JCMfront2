import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,

} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() lado: number = 0;

  constructor() {}

  ngOnInit(): void {}
}

