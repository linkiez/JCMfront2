import { Query } from '../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdemProducao } from '../models/ordem-producao';


@Injectable({
  providedIn: 'root',
})
export class OrdemProducaoService {
  constructor(private http: HttpClient) {}

  getOrdemProducoes(query: Query): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<OrdemProducao[]>(
      environment.backendURL + 'ordemproducao' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getOrdemProducao(id: number): Observable<OrdemProducao> {
    return this.http.get<OrdemProducao>(
      environment.backendURL + 'ordemproducao/' + id,
      { responseType: 'json' }
    );
  }

  addOrdemProducao(ordemproducao: OrdemProducao): Observable<any> {
    return this.http.post(environment.backendURL + 'ordemproducao', ordemproducao, {
      responseType: 'json',
    });
  }

  updateOrdemProducao(ordemproducao: OrdemProducao): Observable<any> {
    return this.http.put(
      environment.backendURL + 'ordemproducao/' + ordemproducao.id,
      ordemproducao,
      { responseType: 'json' }
    );
  }

  deleteOrdemProducao(ordemproducao: OrdemProducao): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'ordemproducao/' + ordemproducao.id,
      { responseType: 'json' }
    );
  }

  restoreOrdemProducao(id: number): Observable<Object> {
    return this.http.post(environment.backendURL + 'ordemproducao/restore/' + id, {
      responseType: 'json',
    });
  }


}
