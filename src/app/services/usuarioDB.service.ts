import { IUsuario } from '../models/usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IQuery } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceDB {
  constructor(private http: HttpClient) {}

  getUsuarios(query: IQuery): Observable<any> {
    const chaves = Object.keys(query);
    const valores = Object.values(query);
    let queryString = '?';

    for (let i = 0; i < chaves.length; i++) {
      if (i > 0) queryString += '&';
      queryString += chaves[i] + '=' + valores[i];
    }

    return this.http.get<any>(
      environment.backendURL + 'usuario' + queryString,
      {
        responseType: 'json',
      }
    );
  }

  getUsuario(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(environment.backendURL + 'usuario/' + id, {
      responseType: 'json',
    });
  }

  addUsuario(usuario: IUsuario): Observable<Object> {
    return this.http.post(environment.backendURL + 'usuario', usuario, {
      responseType: 'json',
    });
  }

  updateUsuario(usuario: IUsuario): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'usuario/' + usuario.id,
      usuario,
      { responseType: 'json' }
    );
  }

  deleteUsuario(usuario: IUsuario): Observable<Object> {
    return this.http.delete(environment.backendURL + 'usuario/' + usuario.id, {
      responseType: 'json',
    });
  }

  restoreUsuario(id: number): Observable<Object> {
    return this.http.post(environment.backendURL + 'usuario/restore/' + id, {
      responseType: 'json',
    });
  }
}
