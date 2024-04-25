import { IQuery } from './../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPedidoCompra } from '../models/pedido-compra';

@Injectable({
  providedIn: 'root',
})
export class PedidoCompraService {
  constructor(private http: HttpClient) {}

  getPedidoCompras(query: IQuery): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IPedidoCompra[]>(
      environment.backendURL + 'pedidocompra' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getPedidoComprasIQF(query: {
    fornecedor: number | undefined;
    ano: number;
  }): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IPedidoCompra[]>(
      environment.backendURL + 'pedidocompra/iqf' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getPedidoCompraItem(query: IQuery): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<IPedidoCompra[]>(
      environment.backendURL + 'pedidocompra/item' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getPedidoCompra(id: number): Observable<IPedidoCompra> {
    return this.http.get<IPedidoCompra>(
      environment.backendURL + 'pedidocompra/' + id,
      { responseType: 'json' }
    );
  }

  addPedidoCompra(pedidoCompra: IPedidoCompra): Observable<any> {
    return this.http.post(
      environment.backendURL + 'pedidocompra',
      pedidoCompra,
      {
        responseType: 'json',
      }
    );
  }

  updatePedidoCompra(pedidoCompra: IPedidoCompra): Observable<any> {
    return this.http.put(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      pedidoCompra,
      { responseType: 'json' }
    );
  }

  deletePedidoCompra(pedidoCompra: IPedidoCompra): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      { responseType: 'json' }
    );
  }

  restorePedidoCompra(id: number): Observable<Object> {
    return this.http.post(
      environment.backendURL + 'pedidocompra/restore/' + id,
      { responseType: 'json' }
    );
  }
}
