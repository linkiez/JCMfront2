import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Query } from '../models/query';

import { Operador } from '../models/operador';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  constructor(
    private http: HttpClient,
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

  }

  deleteOperador(operador: Operador): Observable<Object> {
    return this.http
      .delete(environment.backendURL + 'operador/' + operador.id, {
        responseType: 'json',
      })

  }

  restoreOperador(operador: Operador): Observable<Object> {
    return this.http
      .post(environment.backendURL + 'operador/restore/' + operador.id, {
        responseType: 'json',
      })

  }
}
