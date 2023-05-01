import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/empresa';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

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
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar empresas'});
        return throwError(()=> new Error('Erro ao buscar empresas'));
      }));
  }
}
