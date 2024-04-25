import { IQuery } from '../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrdemProducao } from '../models/ordem-producao';

@Injectable({
  providedIn: 'root',
})
export class OrdemProducaoService {
  constructor(private http: HttpClient) {}

  getOrdemProducoes(query: IQuery): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IOrdemProducao[]>(
      environment.backendURL + 'ordemproducao' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getOrdemProducao(id: number): Observable<IOrdemProducao> {
    return this.http.get<IOrdemProducao>(
      environment.backendURL + 'ordemproducao/' + id,
      { responseType: 'json' }
    );
  }

  addOrdemProducao(ordemproducao: IOrdemProducao): Observable<any> {
    return this.http.post(
      environment.backendURL + 'ordemproducao',
      ordemproducao,
      {
        responseType: 'json',
      }
    );
  }

  updateOrdemProducao(ordemproducao: IOrdemProducao): Observable<any> {
    return this.http.put(
      environment.backendURL + 'ordemproducao/' + ordemproducao.id,
      ordemproducao,
      { responseType: 'json' }
    );
  }

  deleteOrdemProducao(ordemproducao: IOrdemProducao): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'ordemproducao/' + ordemproducao.id,
      { responseType: 'json' }
    );
  }

  restoreOrdemProducao(id: number): Observable<Object> {
    return this.http.post(
      environment.backendURL + 'ordemproducao/restore/' + id,
      {
        responseType: 'json',
      }
    );
  }
}
