import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from '../models/contato';
import { Query } from '../models/query';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  constructor(private http: HttpClient, private messageService: MessageService) {}

  getContatos(query: Query): Observable<any> {
    let chaves = Object.keys(query);
    let valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get(
      environment.backendURL + 'contato' + queryString,
      {
        responseType: 'json',
      }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar contatos'});
        return throwError(()=> new Error('Erro ao buscar contatos'));
      }));
  }

  getContato(id: number): Observable<Contato> {
    return this.http.get<Contato>(environment.backendURL + 'contato/' + id, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar contato'});
        return throwError(()=> new Error('Erro ao buscar contato'));
      }));
  }

  addContato(contato: Contato): Observable<Contato> {
    return this.http.post(environment.backendURL + 'contato', contato, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, contato);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar contato'});
        return throwError(()=> new Error('Erro ao adicionar contato'));
      }));
  }

  updateContato(contato: Contato): Observable<Contato> {
    return this.http.put(
      environment.backendURL + 'contato/' + contato.id,
      contato,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, contato);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar contato'});
        return throwError(()=> new Error('Erro ao alterar contato'));
      }));
  }

  deleteContato(contato: Contato): Observable<Object> {
    return this.http.delete(environment.backendURL + 'contato/' + contato.id, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, contato);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar contato'});
        return throwError(()=> new Error('Erro ao apagar contato'));
      }));;
  }
}
