import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime } from 'rxjs';
import { IArquivo } from 'src/app/models/arquivo';
import { ArquivoService } from 'src/app/services/arquivo.service';

@Component({
  selector: 'listaFiles',
  templateUrl: './listaFiles.component.html',
  styleUrls: ['./listaFiles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaFilesComponent implements OnInit {
  @Input() files: Array<IArquivo> = [];

  @Input() compact: boolean = false;

  @Output() onChangeFiles = new EventEmitter<Array<IArquivo>>();

  fileLoading: boolean = false;

  constructor(
    private messageService: MessageService,
    private arquivoService: ArquivoService
  ) {}

  ngOnInit() {}

  removeArquivo(rowIndex: number) {
    this.arquivoService
      .deleteArquivo(this.files![rowIndex].id!)
      .pipe(debounceTime(1000))
      .subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
        complete: () => {
          this.files!.splice(rowIndex, 1);
          this.emitFiles();
        },
      });
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileLoading = true;
      this.arquivoService
        .uploadArquivo(file)
        .pipe(debounceTime(1000))
        .subscribe({
          next: (arquivo: IArquivo) => {
            this.files?.push(arquivo);
          },
          error: (error) => {
            this.fileLoading = false;
            console.error(error);
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
        next: (url: string) => {
          document.location.href = url;
        },
      });
  }

  emitFiles() {
    this.onChangeFiles.emit(this.files);
  }
}
