import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime } from 'rxjs';
import { Arquivo } from 'src/app/models/arquivo';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'listaFiles',
  templateUrl: './listaFiles.component.html',
  styleUrls: ['./listaFiles.component.css']
})
export class ListaFilesComponent implements OnInit {

  @Input() files: Array<Arquivo> = []

  @Input() compact: boolean = false;

  @Output() onChangeFiles = new EventEmitter<Array<Arquivo>>();

  fileLoading: boolean = false;

  constructor(
    private messageService: MessageService,
    private arquivoService: ArquivoService,
    @Inject(DOCUMENT) private document: Document,

  ) { }

  ngOnInit() {
  }

  removeArquivo(rowIndex: number) {
    this.arquivoService
      .deleteArquivo(this.files![rowIndex].id!)
      .pipe(debounceTime(1000))
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
    this.files!.splice(rowIndex, 1);
    this.emitFiles();
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileLoading = true;
      this.arquivoService
        .uploadArquivo(file)
        .pipe(debounceTime(1000))
        .subscribe({
          next: (arquivo: Arquivo) => {
            this.files?.push(arquivo);
          },
          error: (error) => {
            this.fileLoading = false;
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `${error.status} - ${error.statusText} - ${error.error}`,
            });
          },
          complete: () => {
            this.fileLoading = false;
            this.emitFiles();
          },
        });
    }
  }

  goToUrl(id: number): void {
    this.arquivoService
      .getUrlArquivo(id)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (url: any) => {
          this.document.location.href = url.url;
        },
      });
  }

  emitFiles(){
    this.onChangeFiles.emit(this.files);
  }
}
