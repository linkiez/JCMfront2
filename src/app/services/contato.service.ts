import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(environment.backendURL + 'contato', {
      responseType: 'json',
    });
  }

  getProduto(id: number): Observable<Contato> {
    return this.http.get<Contato>(
      environment.backendURL + 'contato/' + id,
      { responseType: 'json' }
    );
  }

  addProduto(contato: Contato): Observable<Object> {
    return this.http.post(environment.backendURL + 'contato', contato, {
      responseType: 'json',
    });
  }

  updateProduto(contato: Contato): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'contato/' + contato.id,
      contato,
      { responseType: 'json' }
    );
  }

  deleteProduto(contato: Contato): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'contato/' + contato.id,
      { responseType: 'json' }
    );
  }
}
