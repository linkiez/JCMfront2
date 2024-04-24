import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFornecedor } from '../models/fornecedor';
import { IQuery } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  constructor(private http: HttpClient) {}

  getFornecedores(query: IQuery): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IFornecedor[]>(
      environment.backendURL + 'fornecedor' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  deleteFornecedor(fornecedor: IFornecedor): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'fornecedor/' + fornecedor.id,
      {
        responseType: 'json',
      }
    );
  }

  restoreFornecedor(fornecedor: IFornecedor): Observable<Object> {
    return this.http.post(
      environment.backendURL + 'fornecedor/restore/' + fornecedor.id,
      {
        responseType: 'json',
      }
    );
  }
}
