import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageHandler {
  private errorSubject = new Subject<string>();
  private sucessSubject = new Subject<string>();

  constructor(private messageService: MessageService) {
    this.errorSubject.subscribe((error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error,
      });
    });
    this.sucessSubject.subscribe((sucess) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: sucess,
      });
    });
  }

  handleError(error: string) {
    this.errorSubject.next(error);
  }

  handleSucess(sucess: string) {
    this.sucessSubject.next(sucess);
  }
}
