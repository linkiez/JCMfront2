import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuery } from '../models/query';
import { IVendedor } from '../models/vendedor';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  constructor(private http: HttpClient) {}

  getVendedores(query: IQuery): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get(environment.backendURL + 'vendedor' + queryString, {
      responseType: 'json',
    });
  }

  deleteVendedor(vendedor: IVendedor): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'vendedor/' + vendedor.id,
      { responseType: 'json' }
    );
  }

  restoreVendedor(vendedor: IVendedor): Observable<Object> {
    return this.http.post(
      environment.backendURL + 'vendedor/restore/' + vendedor.id,
      {
        responseType: 'json',
      }
    );
  }
}
