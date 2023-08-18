import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'caixaDeStatus',
  templateUrl: './caixaDeStatus.component.html',
  styleUrls: ['./caixaDeStatus.component.css']
})
export class CaixaDeStatusComponent implements OnInit {

  @Input() status: any = '';
  @Input() editable? = false
  @Input() options: string[] = [];
  @Output() statusChange = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  onChangeStatus(event: string){
    this.status = event;
    this.statusChange.emit(event);
  }

}
