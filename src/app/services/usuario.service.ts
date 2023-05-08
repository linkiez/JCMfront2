import { Usuario } from './../models/usuario';
import { Injectable} from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceDB {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUsuarios(query: Query): Observable<any> {
    let chaves = Object.keys(query)
    let valores = Object.values(query);
    let queryString = '?';

    for(let i=0;i<chaves.length;i++){
      if(i>0) queryString += '&'
      queryString += chaves[i]+'='+valores[i]
    }

    return this.http.get<any>(environment.backendURL + 'usuario' + queryString, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, query);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar usuarios'});
        return throwError(()=> new Error('Erro ao buscar usuarios'));
      }));
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      environment.backendURL + 'usuario/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar usuario'});
        return throwError(()=> new Error('Erro ao buscar usuario'));
      }));
  }

  addUsuario(usuario: Usuario): Observable<Object> {
    return this.http.post(environment.backendURL + 'usuario', usuario, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.log(error, usuario);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar usuario'});
        return throwError(()=> new Error('Erro ao adicionar usuario'));
      }));;
  }

  updateUsuario(usuario: Usuario): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'usuario/' + usuario.id,
      usuario,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, usuario);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar usuario'});
        return throwError(()=> new Error('Erro ao alterar usuario'));
      }));
  }

  deleteUsuario(usuario: Usuario): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'usuario/' + usuario.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.log(error, usuario);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar usuario'});
        return throwError(()=> new Error('Erro ao apagar usuario'));
      }));;
  }

  restoreUsuario(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'usuario/restore/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar usuario'});
        return throwError(()=> new Error('Erro ao restaurar usuario'));
      }));
  }
}
