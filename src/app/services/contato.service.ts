import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContato } from '../models/contato';
import { IQuery } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  constructor(private http: HttpClient) {}

  getContatos(query: IQuery): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IContato[]>(environment.backendURL + 'contato' + queryString, {
      responseType: 'json',
    });
  }

  getContato(id: number): Observable<IContato> {
    return this.http.get<IContato>(environment.backendURL + 'contato/' + id, {
      responseType: 'json',
    });
  }

  addContato(contato: IContato): Observable<IContato> {
    return this.http.post<IContato>(environment.backendURL + 'contato', contato, {
      responseType: 'json',
    });
  }

  updateContato(contato: IContato): Observable<any> {
    return this.http.put(
      environment.backendURL + 'contato/' + contato.id,
      contato,
      { responseType: 'json' }
    );
  }

  deleteContato(contato: IContato): Observable<Object> {
    return this.http.delete(environment.backendURL + 'contato/' + contato.id, {
      responseType: 'json',
    });
  }
}
