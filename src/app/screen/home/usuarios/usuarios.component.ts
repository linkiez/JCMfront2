import { UsuarioServiceDB } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Query } from 'src/app/models/query';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild('paginator') paginator!: Paginator;

  usuarios: Usuario[] = [];

  totalRecords: number = 0;

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    deleted: false,
  };

  constructor(
    private messageService: MessageService,
    private router: Router,
    private usuarioServiceDB: UsuarioServiceDB
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(pageChange?: boolean): void {
    this.query.page = pageChange ? this.query.page : 0;
    this.usuarioServiceDB
      .getUsuarios(this.query)
      // .pipe(
      //   debounceTime(1000),
      //   distinctUntilChanged()
      // )
      .subscribe({
        next: (consulta) => {
          this.usuarios = consulta.usuarios;
          this.totalRecords = consulta.totalRecords;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  new() {
    this.router.navigate(['/home/usuarios/0']);
  }

  pageChange(event: any) {
    this.query.page = event.page;
    this.query.pageCount = event.rows;
    this.getUsuarios(true);
  }

  search() {
    if (
      this.query.searchValue?.length! > 2 ||
      this.query.searchValue?.length! === 0
    )
      this.getUsuarios();
  }

}
