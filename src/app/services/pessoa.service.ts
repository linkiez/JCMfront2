import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(environment.backendURL + 'pessoa', {
      responseType: 'json',
    });
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(
      environment.backendURL + 'pessoa/' + id,
      { responseType: 'json' }
    );
  }

  addPessoa(pessoa: Pessoa): Observable<Object> {
    return this.http.post(environment.backendURL + 'pessoa', pessoa, {
      responseType: 'json',
    });
  }

  updatePessoa(pessoa: Pessoa): Observable<Object> {
    return this.http.put(
      environment.backendURL + 'pessoa/' + pessoa.id,
      pessoa,
      { responseType: 'json' }
    );
  }

  deletePessoa(pessoa: Pessoa): Observable<Object> {
    return this.http.delete(
      environment.backendURL + 'pessoa/' + pessoa.id,
      { responseType: 'json' }
    );
  }

  existeCnpjCpfPessoa(pessoa: Pessoa): Observable<any>{
    return this.http.post(environment.backendURL + 'pessoa/cnpj_cpf/existe', pessoa);
  }
}
