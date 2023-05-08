import { Query } from '../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orcamento } from '../models/orcamento';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  constructor(private http: HttpClient, private messageService: MessageService) {}

  getOrcamentos(query: Query): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<Orcamento[]>(
      environment.backendURL + 'orcamento' + queryString,
      {
        responseType: 'json',
      }
    ).pipe(
      catchError((error) => {
        console.log(error, query);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar orçamentos'});
        return throwError(()=> new Error('Erro ao buscar orçamentos'));
      }));
  }

  getOrcamento(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>(
      environment.backendURL + 'orcamento/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar orçamento'});
        return throwError(()=> new Error('Erro ao buscar orçamento'));
      }));
  }

  addOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.post(environment.backendURL + 'orcamento', orcamento, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, orcamento);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar orçamento'});
        return throwError(()=> new Error('Erro ao adicionar orçamento'));
      }));
  }

  updateOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.put(
      environment.backendURL + 'orcamento/' + orcamento.id,
      orcamento,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, orcamento);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar orçamento'});
        return throwError(()=> new Error('Erro ao alterar orçamento'));
      }));
  }

  deleteOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'orcamento/' + orcamento.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, orcamento);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar orçamento'});
        return throwError(()=> new Error('Erro ao apagar orçamento'));
      }));
  }

  restoreOrcamento(id: number): Observable<Object> {
    return this.http.post(environment.backendURL + 'orcamento/restore/' + id, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar orçamento'});
        return throwError(()=> new Error('Erro ao restaurar orçamento'));
      }));
  }

  aprovarOrcamento(id: number, aprovacao: string): Observable<Object> {
    return this.http.post(
      environment.backendURL + 'orcamento/' + id + '/aprovar/',
      { aprovacao: aprovacao },
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao aprovar orçamento'});
        return throwError(()=> new Error('Erro ao aprovar orçamento'));
      }));
  }
}
