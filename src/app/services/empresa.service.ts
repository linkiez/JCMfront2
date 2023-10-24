import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/empresa';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpresas(query: Query): Observable<any> {
    let chaves = Object.keys(query)
      let valores = Object.values(query);
      let queryString = '?';

      for(let i=0;i<chaves.length;i++){
        if(i>0) queryString += '&'
        queryString += chaves[i]+'='+valores[i]
      }

    return this.http.get<Empresa[]>(environment.backendURL + 'empresa' + queryString, {
      responseType: 'json',
    })
  }

  deleteEmpresa(empresa: Empresa): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'empresa/' + empresa.id,
      { responseType: 'json' }
    )
  }

  restoreEmpresa(empresa: Empresa): Observable<Object> {
    return this.http.post(environment.backendURL + 'empresa/restore/' + empresa.id, {
      responseType: 'json',
    })
  }
}
