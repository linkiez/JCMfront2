import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../models/fornecedor';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  getFornecedores(query: Query): Observable<any> {
    let chaves = Object.keys(query)
      let valores = Object.values(query);
      let queryString = '?';

      for(let i=0;i<chaves.length;i++){
        if(i>0) queryString += '&'
        queryString += chaves[i]+'='+valores[i]
      }

    return this.http.get<Fornecedor[]>(environment.backendURL + 'fornecedor' + queryString, {
      responseType: 'json',
    })
  }

  deleteFornecedor(fornecedor: Fornecedor): Observable<Object> {
    return this.http
      .delete(environment.backendURL + 'fornecedor/' + fornecedor.id, {
        responseType: 'json',
      })

  }
}
