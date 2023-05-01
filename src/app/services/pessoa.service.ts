import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { Pessoa } from '../models/pessoa';
import { Query } from '../models/query';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getPessoas(query: Query): Observable<any> {
      let chaves = Object.keys(query)
      let valores = Object.values(query);
      let queryString = '?';

      for(let i=0;i<chaves.length;i++){
        if(i>0) queryString += '&'
        queryString += chaves[i]+'='+valores[i]
      }

      return this.http.get(environment.backendURL + 'pessoa'+ queryString, {
        responseType: 'json',
      }).pipe(
        catchError((error) => {
          console.error(error);
          this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar pessoas'});
          return throwError(()=> new Error('Erro ao buscar pessoas'));
        }));
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(
      environment.backendURL + 'pessoa/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao buscar pessoa'});
        return throwError(()=> new Error('Erro ao buscar pessoa'));
      }));
  }

  addPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post(environment.backendURL + 'pessoa', pessoa, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao adicionar pessoa'});
        return throwError(()=> new Error('Erro ao buscar pessoa'));
      }));
  }

  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put(
      environment.backendURL + 'pessoa/' + pessoa.id,
      pessoa,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao alterar pessoa'});
        return throwError(()=> new Error('Erro ao alterar pessoa'));
      }));
  }

  deletePessoa(pessoa: Pessoa): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'pessoa/' + pessoa.id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao apagar pessoa'});
        return throwError(()=> new Error('Erro ao apagar pessoa'));
      }));
  }

  restorePessoa(id: number): Observable<Object>{
    return this.http.post(
      environment.backendURL + 'pessoa/restore/' + id,
      { responseType: 'json' }
    ).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao restaurar pessoa'});
        return throwError(()=> new Error('Erro ao resturar pessoa'));
      }));
  }

  existeCnpjCpfPessoa(pessoa: Pessoa): Observable<any>{
   return this.http.post(environment.backendURL + 'pessoa/cnpj_cpf/existe', pessoa).pipe(
    catchError((error) => {
      console.error(error);
      this.messageService.add({severity:'error', summary:'Erro', detail:`Erro ao buscar ${pessoa.pessoa_juridica?"CNPJ":"CPF"} da pessoa`});
      return throwError(()=> new Error(`Erro ao buscar ${pessoa.pessoa_juridica?"CNPJ":"CPF"} da pessoa`));
    }));
  }

  consultaCep(cep: string): Observable<any> {
    return this.http.get(`http://viacep.com.br/ws/${cep}/json/`, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao consultar CEP da pessoa'});
        return throwError(()=> new Error('Erro ao consultar CEP da pessoa'));
      }));
  }

  consultaCNPJ(cnpj: string){
    return this.http.get(`https://publica.cnpj.ws/cnpj/${cnpj.replace(/\D/g, '')}`, {
      responseType: 'json',
    }).pipe(
      catchError((error) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao consultar CNPJ da pessoa'});
        return throwError(()=> new Error('Erro ao consultar CNPJ da pessoa'));
      }));
  }
}
