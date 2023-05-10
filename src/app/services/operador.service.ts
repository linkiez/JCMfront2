import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';
import { Vendedor } from '../models/vendedor';
import { Operador } from '../models/operador';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getOperadores(query: Query): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http
      .get(environment.backendURL + 'operador' + queryString, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.log(error, query);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar operadores',
          });
          return throwError(() => new Error('Erro ao buscar operadores'));
        })
      );
  }

  deleteOperador(operador: Operador): Observable<Object> {
    return this.http
      .delete(environment.backendURL + 'operador/' + operador.id, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.log(error, operador);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao apagar operador',
          });
          return throwError(() => new Error('Erro ao apagar operador'));
        })
      );
  }
}
