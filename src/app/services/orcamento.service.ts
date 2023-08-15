import { Query } from '../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orcamento } from '../models/orcamento';


@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  constructor(private http: HttpClient) {}

  getOrcamentos(query: Query): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + JSON.stringify(valores[i]);
    }

    return this.http.get<Orcamento[]>(
      environment.backendURL + 'orcamento' + queryString,
      {
        responseType: 'json',
      }
    )
  }

  getOrcamento(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>(
      environment.backendURL + 'orcamento/' + id,
      { responseType: 'json' }
    )
  }

  addOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.post(environment.backendURL + 'orcamento', orcamento, {
      responseType: 'json',
    })
  }

  updateOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.put(
      environment.backendURL + 'orcamento/' + orcamento.id,
      orcamento,
      { responseType: 'json' }
    )
  }

  deleteOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'orcamento/' + orcamento.id,
      { responseType: 'json' }
    )
  }

  restoreOrcamento(id: number): Observable<Object> {
    return this.http.post(environment.backendURL + 'orcamento/restore/' + id, {
      responseType: 'json',
    })
  }

  aprovarOrcamento(id: number, aprovacao: string): Observable<any> {
    return this.http.post(
      environment.backendURL + 'orcamento/' + id + '/aprovar/',
      { aprovacao: aprovacao },
      { responseType: 'json' }
    )

  }
}
