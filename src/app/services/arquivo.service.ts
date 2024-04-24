import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArquivo } from '../models/arquivo';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  constructor(private http: HttpClient) {}

  getArquivos(): Observable<IArquivo[]> {
    return this.http.get<IArquivo[]>(environment.backendURL + 'file', {
      responseType: 'json',
    });
  }

  getArquivo(id: number): Observable<IArquivo> {
    return this.http.get<IArquivo>(environment.backendURL + 'file/' + id, {
      responseType: 'json',
    });
  }

  addArquivo(arquivo: IArquivo): Observable<IArquivo> {
    return this.http.post(environment.backendURL + 'file', arquivo, {
      responseType: 'json',
    });
  }

  uploadArquivo(file: File): Observable<IArquivo> {
    const formData = new FormData();

    formData.append('filetoupload', file);

    return this.http.post(environment.backendURL + 'file', formData, {
      responseType: 'json',
    });
  }

  deleteArquivo(id: number): Observable<Object> {
    return this.http.delete(environment.backendURL + 'file/' + id, {
      responseType: 'json',
    });
  }

  getUrlArquivo(id: number): Observable<string> {
    return this.http.get<string>(environment.backendURL + 'file/url/' + id, {
      responseType: 'json',
    });
  }
}
