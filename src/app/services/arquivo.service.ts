import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Arquivo } from '../models/arquivo';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getArquivos(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(environment.backendURL + 'file', {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar arquivos'});
        return throwError(()=> new Error('Erro ao buscar arquivos'));
      }));
  }

  getArquivo(id: number): Observable<Arquivo> {
    return this.http.get<Arquivo>(
      environment.backendURL + 'file/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar arquivos'});
        return throwError(()=> new Error('Erro ao buscar arquivo'));
      }));
  }

  addArquivo(arquivo: Arquivo): Observable<Arquivo> {
    return this.http.post(environment.backendURL + 'file', arquivo, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar arquivos'});
        return throwError(()=> new Error('Erro ao adicionar arquivos'));
      }));
  }

  uploadArquivo(file: File): Observable<Arquivo> {
    const formData = new FormData()

    formData.append('filetoupload', file)

    return this.http.post(environment.backendURL + 'file', formData, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao enviar arquivo'});
        return throwError(()=> new Error('Erro ao enviar arquivos'));
      }));
  }

  deleteArquivo(id: number): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'file/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar arquivos'});
        return throwError(()=> new Error('Erro ao apagar arquivos'));
      }));
  }

  getUrlArquivo(id: number): Observable<Object> {
    return this.http.get(
      environment.backendURL + 'file/url/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar url do arquivo'});
        return throwError(()=> new Error('Erro ao buscar url do arquivo'));
      }));
  }
}
