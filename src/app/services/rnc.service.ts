import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Query } from '../models/query';
import { RNC } from '../models/rnc';

@Injectable({
  providedIn: 'root'
})
export class RNCService {

  constructor(private http: HttpClient) { }

  getRNCs(query: Query): Observable<{ rncs: RNC[]; totalRecords: number }> {
    let chaves = Object.keys(query)
    let valores = Object.values(query);
    let queryString = '?';

    for(let i=0;i<chaves.length;i++){
      if(i>0) queryString += '&'
      queryString += chaves[i]+'='+valores[i]
    }

    return this.http.get<{ rncs: RNC[]; totalRecords: number }>(environment.backendURL + 'rnc' + queryString, {
      responseType: 'json',
    })
  }

  getRNC(id: number): Observable<RNC> {
    return this.http.get<RNC>(
      environment.backendURL + 'rnc/' + id,
      { responseType: 'json' }
    )
  }

  addRNC(rnc: RNC): Observable<RNC> {
    return this.http.post<RNC>(environment.backendURL + 'rnc', rnc, {
      responseType: 'json',
    })
  }

  updateRNC(rnc: RNC): Observable<RNC> {
    return this.http.put<RNC>(
      environment.backendURL + 'rnc/' + rnc.id,
      rnc,
      { responseType: 'json' }
    )
  }

  deleteRNC(rnc: RNC): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'rnc/' + rnc.id,
      { responseType: 'json' }
    )
  }

  restoreRNC(id: number): Observable<RNC>{
    return this.http.post<RNC>(
      environment.backendURL + 'rnc/restore/' + id,
      { responseType: 'json' }
    )
  }
}
