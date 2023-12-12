import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ishikawa',
  templateUrl: './ishikawa.component.html',
  styleUrls: ['./ishikawa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IshikawaComponent implements OnInit {
  @ViewChild('ishikawaContainer', { read: ElementRef}) ishikawaContainer: ElementRef | undefined

  width = 0
  height = 0

  constructor() { }

  ngOnInit(): void {
    if(this.ishikawaContainer){
      this.width = this.ishikawaContainer.nativeElement.offsetWidth
      this.height = this.ishikawaContainer.nativeElement.offsetHeight
    }
  }
}
