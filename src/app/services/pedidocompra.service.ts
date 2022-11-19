import { Query } from './../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoCompra } from '../models/pedido-compra';

@Injectable({
  providedIn: 'root'
})
export class PedidoCompraService {

  constructor(private http: HttpClient) { }

  getPedidoCompras(query: Query): Observable<any> {
    let chaves = Object.keys(query)
      let valores = Object.values(query);
      let queryString = '?';

      for(let i=0;i<chaves.length;i++){
        if(i>0) queryString += '&'
        queryString += chaves[i]+'='+valores[i]
      }


    return this.http.get<PedidoCompra[]>(environment.backendURL + 'pedidocompra' + queryString, {
      responseType: 'json',
    });
  }

  getPedidoCompra(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(
      environment.backendURL + 'pedidocompra/' + id,
      { responseType: 'json' }
    );
  }

  addPedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    return this.http.post(environment.backendURL + 'pedidocompra', pedidoCompra, {
      responseType: 'json',
    });
  }

  updatePedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    return this.http.put(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      pedidoCompra,
      { responseType: 'json' }
    );
  }

  deletePedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      { responseType: 'json' }
    );
  }

  restorePedidoCompra(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'pedidocompra/restore/' + id,
      { responseType: 'json' }
    );
  }
}
