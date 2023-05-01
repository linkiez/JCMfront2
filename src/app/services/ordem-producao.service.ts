import { Query } from '../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdemProducao } from '../models/ordem-producao';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class OrdemProducaoService {
  constructor(private http: HttpClient, private messageService: MessageService) {}

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
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar Ordens de Produção'});
        return throwError(()=> new Error('Erro ao buscar Ordens de Produção'));
      }));
  }

  getOrdemProducao(id: number): Observable<OrdemProducao> {
    return this.http.get<OrdemProducao>(
      environment.backendURL + 'ordemproducao/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar Ordem de Produção'});
        return throwError(()=> new Error('Erro ao buscar Ordem de Produção'));
      }));
  }

  addOrdemProducao(ordemproducao: OrdemProducao): Observable<any> {
    return this.http.post(environment.backendURL + 'ordemproducao', ordemproducao, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar Ordem de Produção'});
        return throwError(()=> new Error('Erro ao buscar Ordem de Produção'));
      }));
  }

  updateOrdemProducao(ordemproducao: OrdemProducao): Observable<any> {
    return this.http.put(
      environment.backendURL + 'ordemproducao/' + ordemproducao.id,
      ordemproducao,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar Ordem de Produção'});
        return throwError(()=> new Error('Erro ao alterar Ordem de Produção'));
      }));
  }

  deleteOrdemProducao(ordemproducao: OrdemProducao): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'ordemproducao/' + ordemproducao.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar Ordem de Produção'});
        return throwError(()=> new Error('Erro ao apagar Ordem de Produção'));
      }));
  }

  restoreOrdemProducao(id: number): Observable<Object> {
    return this.http.post(environment.backendURL + 'ordemproducao/restore/' + id, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar Ordem de Produção'});
        return throwError(()=> new Error('Erro ao restaurar Ordem de Produção'));
      }));
  }


}
