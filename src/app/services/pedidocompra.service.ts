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

  getPedidoCompras(): Observable<PedidoCompra[]> {
    return this.http.get<PedidoCompra[]>(environment.backendURL + 'pedidocompra', {
      responseType: 'json',
    });
  }

  getPedidoCompra(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(
      environment.backendURL + 'pedidocompra/' + id,
      { responseType: 'json' }
    );
  }

  addPedidoCompra(pedidoCompra: PedidoCompra): Observable<PedidoCompra> {
    return this.http.post(environment.backendURL + 'pedidocompra', pedidoCompra, {
      responseType: 'json',
    });
  }

  updatePedidoCompra(pedidoCompra: PedidoCompra): Observable<PedidoCompra> {
    return this.http.put(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      pedidoCompra,
      { responseType: 'json' }
    );
  }

  deletePedidoCompra(pedidoCompra: PedidoCompra): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      { responseType: 'json' }
    );
  }
}
