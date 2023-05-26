import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';
import { RIR } from '../models/rir';

@Injectable({
  providedIn: 'root'
})
export class RIRService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getRIRs(query: Query): Observable<any> {
    let chaves = Object.keys(query)
    let valores = Object.values(query);
    let queryString = '?';

    for(let i=0;i<chaves.length;i++){
      if(i>0) queryString += '&'
      queryString += chaves[i]+'='+valores[i]
    }

    return this.http.get<RIR[]>(environment.backendURL + 'rir' + queryString, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, query);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar rirs'});
        return throwError(()=> new Error('Erro ao buscar rirs'));
      }));
  }

  getRIR(id: number): Observable<RIR> {
    return this.http.get<RIR>(
      environment.backendURL + 'rir/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar rir'});
        return throwError(()=> new Error('Erro ao buscar rir'));
      }));
  }

  addRIR(rir: RIR): Observable<Object> {
    return this.http.post(environment.backendURL + 'rir', rir, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, rir);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar rir'});
        return throwError(()=> new Error('Erro ao adicionar rir'));
      }));
  }

  updateRIR(rir: RIR): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'rir/' + rir.id,
      rir,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, rir);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar rir'});
        return throwError(()=> new Error('Erro ao alterar rir'));
      }));
  }

  deleteRIR(rir: RIR): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'rir/' + rir.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, rir);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar rir'});
        return throwError(()=> new Error('Erro ao apagar rir'));
      }));
  }

  restoreRIR(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'rir/restore/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar rir'});
        return throwError(()=> new Error('Erro ao restaurar rir'));
      }));
  }
}
