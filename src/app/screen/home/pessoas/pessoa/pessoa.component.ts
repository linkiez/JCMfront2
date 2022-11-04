import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Contato } from 'src/app/models/contato';
import { DOCUMENT } from '@angular/common';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { Arquivo } from 'src/app/models/arquivo';
import { Validação } from 'src/app/models/validacao';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  providers: [ConfirmationService],
})
export class PessoaComponent implements OnInit {
  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    @Inject(DOCUMENT) private document: Document,
    private arquivoService: ArquivoService,
    private listaGenericaService: ListaGenericaService
  ) {}
  pessoa: Pessoa = {pessoa_juridica: false};

  validador: Validação[] = [
    {campo: 'cnpj_cpf',
      nome: 'CPF tem 11 numeros',
      funcao: (pessoa: Pessoa) => {
        let cpfQuantosNumeros = pessoa.cnpj_cpf
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
      funcao: (pessoa: Pessoa) => {
        let cpfQuantosNumeros = pessoa.cnpj_cpf
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
          let strCPF = (pessoa.cnpj_cpf || '')
            .toString()
            .replace(/\D/g, '');
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
      funcao: (pessoa: Pessoa) => {
        let cnpjQuantosNumeros = pessoa.cnpj_cpf
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
      funcao: (pessoa: Pessoa) => {
        let cnpjQuantosNumeros = pessoa.cnpj_cpf
          ?.toString()
          .replace(/\D/g, '')
          .split('').length;
        if (
          cnpjQuantosNumeros === 14 && pessoa.pessoa_juridica === true
            ? true
            : false
        ) {
          let cnpj = (pessoa.cnpj_cpf || '').toString().replace(/\D/g, '');
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
          let digitos = cnpj.substring(tamanho);
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
      funcao: async(pessoa: Pessoa) => {
        pessoa.cnpj_cpf = Number(
          pessoa.cnpj_cpf?.toString().replace(/\D/g, '')
        );

        let QuantosNumeros = pessoa.cnpj_cpf
          ?.toString()
          .replace(/\D/g, '')
          .split('').length;
        if (QuantosNumeros === 14 || QuantosNumeros === 11 ? true : false) {
          let check = this.pessoaService.existeCnpjCpfPessoa(pessoa)
          let resultado = await firstValueFrom(check);
          return resultado
        }
      },
      menssagem: `O CNPJ/CPF já esta cadastrado.`,
    },
    {
      campo: 'email',
      nome: 'Email Valido',
      funcao: (email: string)=>{
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      },
      menssagem: 'Email não é valido.'
    }
  ];

  cnpj_cpfInvalido: Validação[] = [];

  emailInvalido: Validação[] = [];

  private subscription: Subscription = new Subscription();

  categorias$ = this.listaGenericaService.getByNameListaGenerica('categoriaContato').pipe(map((listaGenerica: any)=> listaGenerica.lista_generica_items))

  cnpjLoading: boolean = false;

  ngOnInit(): void {
    this.getPessoa();
  }

  getPessoa() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.subscription = this.pessoaService.getPessoa(id).subscribe({
        next: (pessoa) => {
          if(pessoa.data_nasc)pessoa.data_nasc = new Date(pessoa.data_nasc!.toString())
          if (pessoa.fornecedor?.data_aprov)
          pessoa.fornecedor.data_aprov = new Date(pessoa.fornecedor.data_aprov.toString())
          if (pessoa.fornecedor?.data_venc)
          pessoa.fornecedor.data_venc = new Date(pessoa.fornecedor.data_venc.toString())
          this.pessoa = pessoa;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
      });
    }
  }

  createPessoa() {
    let pessoaClean = this.cleanPessoa(this.pessoa);

    this.pessoaService.addPessoa(pessoaClean).subscribe({
      next: (pessoa) => {
        pessoa.data_nasc = new Date(pessoa.data_nasc!.toString())
          if (pessoa.fornecedor?.data_aprov)
          pessoa.fornecedor.data_aprov = new Date(pessoa.fornecedor.data_aprov.toString())
          if (pessoa.fornecedor?.data_venc)
          pessoa.fornecedor.data_venc = new Date(pessoa.fornecedor.data_venc.toString())
        this.pessoa = pessoa
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A pessoa foi criada.',
        }),
    });
  }

  updatePessoa() {
    let pessoaClean = this.cleanPessoa(this.pessoa);

    this.pessoaService.updatePessoa(pessoaClean).subscribe({
      next: (pessoa) => {
        pessoa.data_nasc = new Date(pessoa.data_nasc!.toString())
          if (pessoa.fornecedor?.data_aprov)
          pessoa.fornecedor.data_aprov = new Date(pessoa.fornecedor.data_aprov.toString())
          if (pessoa.fornecedor?.data_venc)
          pessoa.fornecedor.data_venc = new Date(pessoa.fornecedor.data_venc.toString())
        this.pessoa = pessoa
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A pessoa foi atualizada.',
        }),
    });
  }

  cleanPessoa(pessoa: Pessoa) {
    if (pessoa.telefone)
      pessoa.telefone = Number(pessoa.telefone.toString().replace(/\D/g, ''));
    if (pessoa.cnpj_cpf)
      pessoa.cnpj_cpf = Number(pessoa.cnpj_cpf.toString().replace(/\D/g, ''));
    if (typeof pessoa.cnpj_cpf === 'string') delete pessoa.cnpj_cpf;
    if (pessoa.ie_rg)
      pessoa.ie_rg = Number(pessoa.ie_rg.toString().replace(/\D/g, ''));
    return pessoa;
  }

  createOrUpdate() {
    if (this.cnpj_cpfInvalido.length === 0){
      if (this.pessoa.id == undefined) {
        this.createPessoa();
      } else {
        this.updatePessoa();
      }
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível salvar, erro de validação.',
      });
    }

  }

  deletePessoa() {
    this.pessoaService.deletePessoa(this.pessoa).subscribe({
      next: (pessoa) => (this.pessoa = pessoa),
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A pessoa foi exluida.',
        });
        this.router.navigate(['/home/pessoas']);
      },
    });
  }

  newFornecedor() {
    this.pessoa.fornecedor = {};
  }

  newOperador() {
    this.pessoa.operador = {};
  }

  newVendedor() {
    this.pessoa.vendedor = {};
  }

  newContato() {
    let contatos: Contato[] = [];
    if (!this.pessoa.contatos) this.pessoa.contatos = contatos;
    this.pessoa.contatos.push({});
  }

  removeContato(rowIndex: number) {
    this.pessoa.contatos = this.pessoa.contatos!.splice(rowIndex - 1, 1);
  }

  removeArquivo(rowIndex: number) {
    this.arquivoService
      .deleteArquivo(this.pessoa.files![rowIndex].id!)
      .subscribe({
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
        complete: () => {},
      });
    this.pessoa.files = this.pessoa.files!.splice(rowIndex - 1, 1);
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.arquivoService.uploadArquivo(file).subscribe({
        next: (arquivo: Arquivo) => {
          console.log(arquivo);
          this.pessoa.files?.push(arquivo);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
        complete: () => {
          this.createOrUpdate();
        },
      });
    }
  }

  getBackPessoas() {
    this.router.navigate(['/home/pessoas']);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este produto?',
      accept: () => {
        this.deletePessoa();
      },
    });
  }

  goToUrl(id: number): void {
    this.arquivoService.getUrlArquivo(id).subscribe({
      next: (url: any) => {
        this.document.location.href = url.url;
      },
    });
  }

  validaCpfCnpj() {
    let cnpj_cpfValidador = this.validador.filter((validacao)=>validacao.campo === 'cnpj_cpf')

    let cnpj_cpfValidado = cnpj_cpfValidador.map(async(validacao) => {
      validacao.resultado = await validacao.funcao(this.pessoa);
      return validacao
    })
    Promise.all(cnpj_cpfValidado).then((validado) => {
      let cnpj_cpfInvalido = validado.filter(
        (validacao) => validacao.resultado === false
      );
      this.cnpj_cpfInvalido = cnpj_cpfInvalido;

      if(cnpj_cpfInvalido.length==0&&this.pessoa.pessoa_juridica&&this.pessoa.cnpj_cpf){
        this.cnpjLoading = true

        this.pessoaService.consultaCNPJ(this.pessoa.cnpj_cpf).subscribe({next: (consultaPJ: any) =>{
          console.log(consultaPJ);
          this.pessoa.razao_social = consultaPJ.razao_social;
          this.pessoa.nome = consultaPJ.estabelecimento.nome_fantasia?consultaPJ.estabelecimento.nome_fantasia:consultaPJ.razao_social
          this.pessoa.data_nasc = new Date(consultaPJ.estabelecimento.data_inicio_atividade)
          this.pessoa.endereco = `${consultaPJ.estabelecimento.tipo_logradouro} ${consultaPJ.estabelecimento.logradouro}, ${consultaPJ.estabelecimento.numero}, ${consultaPJ.estabelecimento.complemento || ''}, ${consultaPJ.estabelecimento.bairro}`;
          this.pessoa.cep = Number(consultaPJ.estabelecimento.cep);
          this.pessoa.telefone = Number(consultaPJ.estabelecimento.ddd1+consultaPJ.estabelecimento.telefone1);
          this.pessoa.email = consultaPJ.estabelecimento.email;
          this.pessoa.municipio = consultaPJ.estabelecimento.cidade.nome;
          this.pessoa.uf = consultaPJ.estabelecimento.estado.sigla;
          this.pessoa.ie_rg = Number(consultaPJ.estabelecimento.inscricoes_estaduais[0].inscricao_estadual);
        }, complete: ()=>{this.cnpjLoading = false}})
      }
    })

  }

  consultaCep(){
    let cep = this.pessoa.cep?.toString()
    .replace(/\D/g, '')

    let cepQuantosNumeros = cep?.split('').length;

    if (cepQuantosNumeros == 8 && cep){
      this.pessoaService.consultaCep(cep).subscribe(
        {next: (cep: any)=>{
          console.log(cep);
          this.pessoa.endereco = `${cep.logradouro}, ${cep.complemento}, ${cep.bairro}`
          this.pessoa.municipio = cep.localidade;
          this.pessoa.uf = cep.uf;
        },
        error: (error: Error) => {console.log(error);}}
      )
    }
  }


}
