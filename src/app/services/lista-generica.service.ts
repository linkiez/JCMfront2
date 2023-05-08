import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaGenerica } from '../models/lista-generica';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ListaGenericaService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getListaGenericas(): Observable<ListaGenerica[]> {
    return this.http.get<ListaGenerica[]>(environment.backendURL + 'listagenerica', {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar listas genericas'});
        return throwError(()=> new Error('Erro ao buscar listas genericas'));
      }));
  }

  getListaGenerica(id: number): Observable<ListaGenerica> {
    return this.http.get<ListaGenerica>(
      environment.backendURL + 'listagenerica/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar lista generica'});
        return throwError(()=> new Error('Erro ao buscar lista generica'));
      }));
  }

  getByNameListaGenerica(nome: string): Observable<ListaGenerica> {
    return this.http.get<ListaGenerica>(
      environment.backendURL + 'listagenerica/nome/' + nome,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar lista generica por nome'});
        return throwError(()=> new Error('Erro ao buscar lista generica por nome'));
      }));;
  }

  addListaGenerica(listaGenerica: ListaGenerica): Observable<Object> {
    return this.http.post(environment.backendURL + 'listagenerica', listaGenerica, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, listaGenerica);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar lista generica'});
        return throwError(()=> new Error('Erro ao adicionar lista generica'));
      }));
  }

  updateListaGenerica(listaGenerica: ListaGenerica): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'listagenerica/' + listaGenerica.id,
      listaGenerica,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, listaGenerica);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar lista generica'});
        return throwError(()=> new Error('Erro ao alterar lista generica'));
      }));
  }

  deleteListaGenerica(listaGenerica: ListaGenerica): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'listagenerica/' + listaGenerica.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, listaGenerica);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar lista generica'});
        return throwError(()=> new Error('Erro ao apagar lista generica'));
      }));
  }
}
