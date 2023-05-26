import { MessageService } from 'primeng/api';
import { Query } from './../models/query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoCompra } from '../models/pedido-compra';

@Injectable({
  providedIn: 'root'
})
export class PedidoCompraService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

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
    }).pipe(
      catchError((error) => {
        console.log(error, query);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar pedidos de compra'});
        return throwError(()=> new Error('Erro ao buscar pedidos de compra'));
      }));
  }

  getPedidoCompraItem(query: Query): Observable<any> {
    let chaves = Object.keys(query)
      let valores = Object.values(query);
      let queryString = '?';

      for(let i=0;i<chaves.length;i++){
        if(i>0) queryString += '&'
        queryString += chaves[i]+'='+valores[i]
      }


    return this.http.get<PedidoCompra[]>(environment.backendURL + 'pedidocompra/item' + queryString, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, query);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar pedidos de compra item'});
        return throwError(()=> new Error('Erro ao buscar pedidos de compra item'));
      }));
  }

  getPedidoCompra(id: number): Observable<PedidoCompra> {
    return this.http.get<PedidoCompra>(
      environment.backendURL + 'pedidocompra/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar pedido de compra'});
        return throwError(()=> new Error('Erro ao buscar pedido de compra'));
      }));
  }

  addPedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    return this.http.post(environment.backendURL + 'pedidocompra', pedidoCompra, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, pedidoCompra);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar pedido de compra'});
        return throwError(()=> new Error('Erro ao adicionar pedido de compra'));
      }));
  }

  updatePedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    return this.http.put(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      pedidoCompra,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, pedidoCompra);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar pedido de compra'});
        return throwError(()=> new Error('Erro ao alterar pedido de compra'));
      }));
  }

  deletePedidoCompra(pedidoCompra: PedidoCompra): Observable<any> {
    return this.http.delete(
      environment.backendURL + 'pedidocompra/' + pedidoCompra.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, pedidoCompra);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar pedido de compra'});
        return throwError(()=> new Error('Erro ao apagar pedido de compra'));
      }));
  }

  restorePedidoCompra(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'pedidocompra/restore/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar pedido de compra'});
        return throwError(()=> new Error('Erro ao restaurar pedido de compra'));
      }));
  }
}
