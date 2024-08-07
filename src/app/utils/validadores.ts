import { PessoaService } from './../services/pessoa.service';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IPessoa } from '../models/pessoa';
import { IValidação } from '../models/validacao';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidadorService {
  constructor(private pessoaService: PessoaService) {}

public validador: IValidação[] = [
  {
    campo: 'cnpj_cpf',
    nome: 'CPF tem 11 numeros',
    funcao: (pessoa: IPessoa) => {
      const cpfQuantosNumeros = pessoa.cnpj_cpf
        ?.toString()
        .replace(/\D/g, '')
        .split('').length;
      return cpfQuantosNumeros === 11 ||
        cpfQuantosNumeros === 0 ||
        pessoa.pessoa_juridica === true
        ? true
        : false;
    },
    menssagem: 'CPF deve ter 11 numeros.',
  },
  {
    campo: 'cnpj_cpf',
    nome: 'CPF Valido',
    funcao: (pessoa: IPessoa) => {
      const cpfQuantosNumeros = pessoa.cnpj_cpf
        ?.toString()
        .replace(/\D/g, '')
        .split('').length;
      if (
        cpfQuantosNumeros === 11 && pessoa.pessoa_juridica === false
          ? true
          : false
      ) {
        let Soma;
        let Resto;
        const strCPF = (pessoa.cnpj_cpf || '').toString().replace(/\D/g, '');
        Soma = 0;
        if (
          strCPF == '00000000000' ||
          strCPF == '11111111111' ||
          strCPF == '22222222222' ||
          strCPF == '33333333333' ||
          strCPF == '44444444444' ||
          strCPF == '55555555555' ||
          strCPF == '66666666666' ||
          strCPF == '77777777777' ||
          strCPF == '88888888888' ||
          strCPF == '99999999999'
        )
          return false;

        for (let i = 1; i <= 9; i++)
          Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++)
          Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
      }
      return true;
    },
    menssagem: 'CPF não é valido.',
  },
  {
    campo: 'cnpj_cpf',
    nome: 'CNPJ tem 14 numeros',
    funcao: (pessoa: IPessoa) => {
      const cnpjQuantosNumeros = pessoa.cnpj_cpf
        ?.toString()
        .replace(/\D/g, '')
        .split('').length;
      return cnpjQuantosNumeros === 14 ||
        cnpjQuantosNumeros === 0 ||
        pessoa.pessoa_juridica === false
        ? true
        : false;
    },
    menssagem: 'CNPJ deve ter 14 numeros.',
  },
  {
    campo: 'cnpj_cpf',
    nome: 'CNPJ Valido',
    funcao: (pessoa: IPessoa) => {
      const cnpjQuantosNumeros = pessoa.cnpj_cpf
        ?.toString()
        .replace(/\D/g, '')
        .split('').length;
      if (
        cnpjQuantosNumeros === 14 && pessoa.pessoa_juridica === true
          ? true
          : false
      ) {
        const cnpj = (pessoa.cnpj_cpf || '').toString().replace(/\D/g, '');
        // Elimina CNPJs invalidos conhecidos
        if (
          cnpj == '00000000000000' ||
          cnpj == '11111111111111' ||
          cnpj == '22222222222222' ||
          cnpj == '33333333333333' ||
          cnpj == '44444444444444' ||
          cnpj == '55555555555555' ||
          cnpj == '66666666666666' ||
          cnpj == '77777777777777' ||
          cnpj == '88888888888888' ||
          cnpj == '99999999999999'
        )
          return false;

        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += Number(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != Number(digitos.charAt(0))) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += Number(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != Number(digitos.charAt(1))) return false;
      }
      return true;
    },
    menssagem: 'CNPJ não é valido.',
  },
  {
    campo: 'cnpj_cpf',
    nome: 'CNPJ/CPF Já cadastrado',
    funcao: async (pessoa: IPessoa) => {
      pessoa.cnpj_cpf = pessoa.cnpj_cpf?.toString().replace(/\D/g, '');

      const QuantosNumeros = pessoa.cnpj_cpf
        ?.toString()
        .replace(/\D/g, '')
        .split('').length;
      if (QuantosNumeros === 14 || QuantosNumeros === 11 ? true : false) {
        const check = this.pessoaService.existeCnpjCpfPessoa(pessoa);
        const resultado = await firstValueFrom(check);
        return resultado;
      }
    },
    menssagem: `O CNPJ/CPF já esta cadastrado.`,
  },
  {
    campo: 'email',
    nome: 'Email Valido',
    funcao: (email: string) => {
      if (!email) return true;
      return email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    },
    menssagem: 'Email não é valido.',
  },
];
}
