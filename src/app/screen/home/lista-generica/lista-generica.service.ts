import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaGenerica } from './lista-generica';

@Injectable({
  providedIn: 'root'
})
export class ListaGenericaService {
  constructor(private http: HttpClient) { }

  getListaGenericas(): Observable<ListaGenerica[]> {
    return this.http.get<ListaGenerica[]>(environment.backendURL + 'listagenerica', {
      responseType: 'json',
    });
  }

  getListaGenerica(id: number): Observable<ListaGenerica> {
    return this.http.get<ListaGenerica>(
      environment.backendURL + 'listagenerica/' + id,
      { responseType: 'json' }
    );
  }

  getByNameListaGenerica(nome: string): Observable<ListaGenerica> {
    return this.http.get<ListaGenerica>(
      environment.backendURL + 'listagenerica/nome/' + nome,
      { responseType: 'json' }
    );
  }

  addListaGenerica(listaGenerica: ListaGenerica): Observable<Object> {
    return this.http.post(environment.backendURL + 'listagenerica', listaGenerica, {
      responseType: 'json',
    });
  }

  updateListaGenerica(listaGenerica: ListaGenerica): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'listagenerica/' + listaGenerica.id,
      listaGenerica,
      { responseType: 'json' }
    );
  }

  deleteListaGenerica(listaGenerica: ListaGenerica): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'listagenerica/' + listaGenerica.id,
      { responseType: 'json' }
    );
  }
}
