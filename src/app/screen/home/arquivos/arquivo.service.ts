import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Arquivo } from './arquivo';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(private http: HttpClient) { }

  getArquivos(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(environment.backendURL + 'file', {
      responseType: 'json',
    });
  }

  getArquivo(id: number): Observable<Arquivo> {
    return this.http.get<Arquivo>(
      environment.backendURL + 'file/' + id,
      { responseType: 'json' }
    );
  }

  addArquivo(arquivo: Arquivo): Observable<Arquivo> {
    return this.http.post(environment.backendURL + 'file', arquivo, {
      responseType: 'json',
    });
  }

  deleteArquivo(id: number): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'file/' + id,
      { responseType: 'json' }
    );
  }

  getUrlArquivo(id: number): Observable<Object> {
    return this.http.get(
      environment.backendURL + 'file/url/' + id,
      { responseType: 'json' }
    );
  }
}
