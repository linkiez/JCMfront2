import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IListaGenerica, IListaGenericaItem } from '../models/lista-generica';
import { Obj } from '@popperjs/core';

@Injectable({
  providedIn: 'root',
})
export class ListaGenericaService {
  constructor(private http: HttpClient) {}

  getListaGenericas(): Observable<IListaGenerica[]> {
    return this.http.get<IListaGenerica[]>(
      environment.backendURL + 'listagenerica',
      {
        responseType: 'json',
      }
    );
  }

  getListaGenerica(id: number): Observable<IListaGenerica> {
    return this.http.get<IListaGenerica>(
      environment.backendURL + 'listagenerica/' + id,
      { responseType: 'json' }
    );
  }

  getByNameListaGenerica(nome: string): Observable<IListaGenerica> {
    return this.http.get<IListaGenerica>(
      environment.backendURL + 'listagenerica/nome/' + nome,
      { responseType: 'json' }
    );
  }

  addListaGenerica(listaGenerica: IListaGenerica): Observable<Object> {
    return this.http.post(
      environment.backendURL + 'listagenerica',
      listaGenerica,
      {
        responseType: 'json',
      }
    );
  }

  updateListaGenerica(listaGenerica: IListaGenerica): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'listagenerica/' + listaGenerica.id,
      listaGenerica,
      { responseType: 'json' }
    );
  }

  deleteListaGenerica(listaGenerica: IListaGenerica): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'listagenerica/' + listaGenerica.id,
      { responseType: 'json' }
    );
  }

  addListaGenericaItem(
    listaGenericaItem: IListaGenericaItem
  ): Observable<IListaGenericaItem> {
    return this.http.post<IListaGenericaItem>(
      environment.backendURL + 'listagenerica/item',
      listaGenericaItem,
      { responseType: 'json' }
    );
  }

  updateListaGenericaItem(
    listaGenericaItem: IListaGenericaItem
  ): Observable<IListaGenericaItem> {
    return this.http.put<IListaGenericaItem>(
      environment.backendURL + 'listagenerica/item/' + listaGenericaItem.id,
      listaGenericaItem,
      { responseType: 'json' }
    );
  }

  deleteListaGenericaItem(
    listaGenericaItem: IListaGenericaItem
  ): Observable<Object> {
    return this.http.delete<IListaGenericaItem>(
      environment.backendURL + 'listagenerica/item/' + listaGenericaItem.id,
      { responseType: 'json' }
    );
  }
}
