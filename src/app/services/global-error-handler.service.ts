import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler {
  private errorSubject = new Subject<string>();

  constructor(private messageService: MessageService) {
    this.errorSubject.subscribe(error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error
      });
    });
  }

  handleError(error: string) {
    this.errorSubject.next(error);
  }
}
