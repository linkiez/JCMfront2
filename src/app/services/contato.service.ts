import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from '../models/contato';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  constructor(private http: HttpClient) {}

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
    );
  }

  getContato(id: number): Observable<Contato> {
    return this.http.get<Contato>(environment.backendURL + 'contato/' + id, {
      responseType: 'json',
    });
  }

  addContato(contato: Contato): Observable<Contato> {
    return this.http.post(environment.backendURL + 'contato', contato, {
      responseType: 'json',
    });
  }

  updateContato(contato: Contato): Observable<Contato> {
    return this.http.put(
      environment.backendURL + 'contato/' + contato.id,
      contato,
      { responseType: 'json' }
    );
  }

  deleteContato(contato: Contato): Observable<Object> {
    return this.http.delete(environment.backendURL + 'contato/' + contato.id, {
      responseType: 'json',
    });
  }
}
