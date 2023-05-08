import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProdutos(query: Query): Observable<any> {
    let chaves = Object.keys(query)
    let valores = Object.values(query);
    let queryString = '?';

    for(let i=0;i<chaves.length;i++){
      if(i>0) queryString += '&'
      queryString += chaves[i]+'='+valores[i]
    }

    return this.http.get<Produto[]>(environment.backendURL + 'produto' + queryString, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, query);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar produtos'});
        return throwError(()=> new Error('Erro ao buscar produtos'));
      }));
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(
      environment.backendURL + 'produto/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar produto'});
        return throwError(()=> new Error('Erro ao buscar produto'));
      }));
  }

  addProduto(produto: Produto): Observable<Object> {
    return this.http.post(environment.backendURL + 'produto', produto, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, produto);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar produto'});
        return throwError(()=> new Error('Erro ao adicionar produto'));
      }));
  }

  updateProduto(produto: Produto): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'produto/' + produto.id,
      produto,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, produto);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar produto'});
        return throwError(()=> new Error('Erro ao alterar produto'));
      }));
  }

  deleteProduto(produto: Produto): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'produto/' + produto.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, produto);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar produto'});
        return throwError(()=> new Error('Erro ao apagar produto'));
      }));
  }

  restoreProduto(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'produto/restore/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar produto'});
        return throwError(()=> new Error('Erro ao restaurar produto'));
      }));
  }
}
