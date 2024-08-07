import { Obj } from '@popperjs/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IPessoa } from 'src/app/models/pessoa';
import { IQuery } from 'src/app/models/query';
import { IUsuario, IUsuarioAcesso } from 'src/app/models/usuario';
import { PessoaService } from 'src/app/services/pessoa.service';
import { UsuarioServiceDB } from 'src/app/services/usuarioDB.service';
import passwordValidator from 'password-validator';
import { NestedAccess, NestedAccessKey } from 'src/app/authentication/access.guard';
import lodash from 'lodash';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  listaDeAcessos: IUsuarioAcesso = {
    admin: false,
    contato: {
      findAll: false,
      findAllDeleted: false,
      findAllContatoPessoa: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    file: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      destroy: false,
      restore: false,
    },
    fornecedor: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    listaGenerica: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    operador: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    orcamento: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    ordemProducao: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    pedidoCompra: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    pessoa: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      findByName: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    produto: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      findByName: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    rir: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    usuario: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    vendedor: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    empresa: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false,
    },
    rnc: {
      findAll: false,
      findAllDeleted: false,
      findOne: false,
      create: false,
      update: false,
      destroy: false,
      restore: false
    }
  };

  usuario: IUsuario = {
    email: '',
    senha: '',
    acesso: this.listaDeAcessos,
    id: undefined,
    confirmarSenha: '',
    deletedAt: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    id_pessoa: undefined,
    pessoa: undefined,
  };

  pessoas: IPessoa[] = [];

  validacoes: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private usuarioServiceDB: UsuarioServiceDB,
    private confirmationService: ConfirmationService,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0 && isFinite(id))
      this.usuarioServiceDB.getUsuario(id).subscribe({
        next: (usuario) => {
          this.usuario = lodash.merge(this.usuario, usuario);
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar usuário - ' + error.error.message,
          });
        },
        complete: () => {},
      });
  }

  getBack() {
    window.history.back();
  }

  createUsuario() {
    this.usuarioServiceDB.addUsuario(this.usuario).subscribe({
      next: (usuario) => {
        this.usuario = usuario as IUsuario;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar usuário - ' + error.error.message,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário atualizado com sucesso',
        });
        this.router.navigate([`/home/usuarios/${this.usuario.id}`]);
      },
    });
  }

  updateUsuario() {
    this.usuarioServiceDB.updateUsuario(this.usuario).subscribe({
      next: (usuario) => {
        this.usuario = usuario as IUsuario;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar usuário - ' + error.error.message,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário atualizado com sucesso',
        });
      },
    });
  }

  createOrUpdateUsuario() {
    if (Number(this.route.snapshot.paramMap.get('id')) > 0) {
      this.updateUsuario();
    } else {
      this.createUsuario();
    }
  }

  deleteUsuario() {
    this.usuarioServiceDB.deleteUsuario(this.usuario).subscribe({
      next: (usuario) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário apagado com sucesso',
        });
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao apagar usuário - ' + error.error.message,
        });
      },
      complete: () => {
        this.getBack();
      },
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este usuario?',
      accept: () => {
        this.deleteUsuario();
      },
    });
  }

  searchPessoa(searchTerm: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      fornecedor: false,
      operador: false,
      vendedor: false,
      deleted: false,
    };

    this.pessoaService
      .getPessoas(query)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.pessoas = consulta.pessoas),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar pessoas - ' + error.error.message,
          });
        },
      });
  }

  getKeys(obj: IUsuarioAcesso) {
    const keys = Object.keys(obj);
    keys.splice(keys.indexOf('admin'), 1);
    return keys as (keyof IUsuarioAcesso)[];
  }

  getKeysTyped(obj: NestedAccess) {
    const keys = Object.keys(obj);
    keys.splice(keys.indexOf('admin'), 1);
    return keys as (keyof NestedAccess)[];
  }



  verifyUserAccess(
    value: boolean,
    acesso: IUsuarioAcesso | NestedAccess
  ): IUsuarioAcesso | NestedAccess {
    const currentAccess = acesso as { [key: string]: NestedAccess };

    for (const key of Object.keys(currentAccess)) {
      if (typeof currentAccess[key] === 'boolean') {
        currentAccess[key] = value;
      } else if (typeof currentAccess[key] === 'object') {
        this.verifyUserAccess(value, currentAccess[key]);
      } else {
        console.error('Erro ao verificar acesso');
      }
    }

    return currentAccess as IUsuarioAcesso | NestedAccess;
  }

  selecionarTodosAcessos() {
    this.usuario.acesso = this.verifyUserAccess(
      true,
      this.usuario.acesso
    ) as IUsuarioAcesso;
  }

  limparTodosAcessos() {
    this.usuario.acesso = this.verifyUserAccess(
      false,
      this.usuario.acesso
    ) as IUsuarioAcesso;
  }

  validaSenha(event: any) {
    if (!event) this.validacoes = [];
    else {
      const schema = new passwordValidator();
      schema
        .is()
        .min(8, 'Senha deve possuir no minimo 8 caracteres.')
        .is()
        .max(128, 'Senha deve possuir no maximo 128 caracteres.')
        .has()
        .uppercase(1, 'Senha deve possuir no minimo uma letra maiuscula.')
        .has()
        .lowercase(1, 'Senha deve possuir no minimo uma letra minuscula.')
        .has()
        .digits(1, 'Senha deve possuir no minimo um numero.')
        .has()
        .symbols(1, 'Senha deve possuir no minimo um simbolo.');

      this.validacoes = schema.validate(event, { details: true }) as Array<any>;
      this.confirmaSenha();
    }
  }

  confirmaSenha() {
    if (this.usuario.senha != this.usuario.confirmarSenha) {
      this.validacoes.push({
        validation: 'confirmarSenha',
        message: 'Senha e confirmação de senha não conferem.',
      });
    }
  }
}

