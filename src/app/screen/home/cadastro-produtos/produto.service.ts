import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(environment.backendURL + 'produto', {
      responseType: 'json',
    });
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(
      environment.backendURL + 'produto/' + id,
      { responseType: 'json' }
    );
  }

  addProduto(produto: Produto): Observable<Object> {
    return this.http.post(environment.backendURL + 'produto', produto, {
      responseType: 'json',
    });
  }

  updateProduto(produto: Produto): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'produto/' + produto.id,
      produto,
      { responseType: 'json' }
    );
  }

  deleteProduto(produto: Produto): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'produto/' + produto.id,
      { responseType: 'json' }
    );
  }
}
