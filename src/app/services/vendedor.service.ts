import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';
import { Vendedor } from '../models/vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

constructor(private http: HttpClient, private messageService: MessageService) { }

getVendedores(query: Query): Observable<any> {
  let chaves = Object.keys(query)
  let valores = Object.values(query);
  let queryString = '?';

  for(let i=0;i<chaves.length;i++){
    if(i>0) queryString += '&'
    queryString += chaves[i]+'='+valores[i]
  }

  return this.http.get(environment.backendURL + 'vendedor'+ queryString, {
    responseType: 'json',
  }).pipe(
    catchError((error) => {
      console.log(error, query);
      this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar vendedores'});
      return throwError(()=> new Error('Erro ao buscar vendedores'));
    }));
}

deleteVendedor(vendedor: Vendedor): Observable<Object> {
  return this.http.delete(
    environment.backendURL + 'vendedor/' + vendedor.id,
    { responseType: 'json' }
  ).pipe(
    catchError((error) => {
      console.log(error, vendedor);
      this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar vendedor'});
      return throwError(()=> new Error('Erro ao apagar vendedor'));
    }));
}
}
