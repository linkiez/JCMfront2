import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

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
    })
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(
      environment.backendURL + 'produto/' + id,
      { responseType: 'json' }
    )
  }

  getProdutoByName(nome: string): Observable<Produto> {
    return this.http.post<Produto>(
      environment.backendURL + 'produto/nome', {nome: nome},
      { responseType: 'json' }
    )
  }

  addProduto(produto: Produto): Observable<Object> {
    return this.http.post(environment.backendURL + 'produto', produto, {
      responseType: 'json',
    })
  }

  updateProduto(produto: Produto): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'produto/' + produto.id,
      produto,
      { responseType: 'json' }
    )
  }

  deleteProduto(produto: Produto): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'produto/' + produto.id,
      { responseType: 'json' }
    )
  }

  restoreProduto(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'produto/restore/' + id,
      { responseType: 'json' }
    )
  }
}
