import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuery } from '../models/query';
import { IRNC } from '../models/rnc';

@Injectable({
  providedIn: 'root',
})
export class RNCService {
  constructor(private http: HttpClient) {}

  getRNCs(query: IQuery): Observable<{ rncs: IRNC[]; totalRecords: number }> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<{ rncs: IRNC[]; totalRecords: number }>(
      environment.backendURL + 'rnc' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getRNC(id: number): Observable<IRNC> {
    return this.http.get<IRNC>(environment.backendURL + 'rnc/' + id, {
      responseType: 'json',
    });
  }

  addRNC(rnc: IRNC): Observable<IRNC> {
    return this.http.post<IRNC>(environment.backendURL + 'rnc', rnc, {
      responseType: 'json',
    });
  }

  updateRNC(rnc: IRNC): Observable<IRNC> {
    return this.http.put<IRNC>(environment.backendURL + 'rnc/' + rnc.id, rnc, {
      responseType: 'json',
    });
  }

  deleteRNC(rnc: IRNC): Observable<Object> {
    return this.http.delete(environment.backendURL + 'rnc/' + rnc.id, {
      responseType: 'json',
    });
  }

  restoreRNC(id: number): Observable<IRNC> {
    return this.http.post<IRNC>(environment.backendURL + 'rnc/restore/' + id, {
      responseType: 'json',
    });
  }
}
