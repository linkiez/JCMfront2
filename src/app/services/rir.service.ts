import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuery } from '../models/query';
import { IRIR } from '../models/rir';

@Injectable({
  providedIn: 'root',
})
export class RIRService {
  constructor(private http: HttpClient) {}

  getRIRs(query: IQuery): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IRIR[]>(environment.backendURL + 'rir' + queryString, {
      responseType: 'json',
    });
  }

  getRIRsByPessoaAndProduto(
    id_pessoa: number,
    id_produto: number
  ): Observable<any> {
    return this.http.get<IRIR[]>(
      environment.backendURL +
        'rir/pessoa/' +
        id_pessoa +
        '/produto/' +
        id_produto,
      {
        responseType: 'json',
      }
    );
  }

  getRIR(id: number): Observable<IRIR> {
    return this.http.get<IRIR>(environment.backendURL + 'rir/' + id, {
      responseType: 'json',
    });
  }

  addRIR(rir: IRIR): Observable<Object> {
    return this.http.post(environment.backendURL + 'rir', rir, {
      responseType: 'json',
    });
  }

  updateRIR(rir: IRIR): Observable<IRIR> {
    return this.http.put(environment.backendURL + 'rir/' + rir.id, rir, {
      responseType: 'json',
    });
  }

  deleteRIR(rir: IRIR): Observable<Object> {
    return this.http.delete(environment.backendURL + 'rir/' + rir.id, {
      responseType: 'json',
    });
  }

  restoreRIR(id: number): Observable<Object> {
    return this.http.post(environment.backendURL + 'rir/restore/' + id, {
      responseType: 'json',
    });
  }
}
