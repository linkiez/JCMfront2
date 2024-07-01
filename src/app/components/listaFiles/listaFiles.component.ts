import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime, firstValueFrom } from 'rxjs';
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
    this.arquivoService.deleteArquivo(this.files![rowIndex].id!).subscribe({
      next: () => {},
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao remover o arquivo - ${error.error.message}`,
        });
      },
      complete: () => {
        this.files.splice(rowIndex, 1);
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
            const find = this.files.find((item) => {
              item.id === arquivo.id;
            });
            if (!find) {
              this.files?.push(arquivo);
            }
          },
          error: (error) => {
            this.fileLoading = false;
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro no upload do arquivo - ${error.error.message}`,
            });
          },
          complete: () => {
            this.fileLoading = false;
            this.emitFiles();
          },
        });
    }
  }

  goToUrl(arquivo: IArquivo): void {
    this.arquivoService
      .getUrlArquivo(arquivo.id)
      .pipe(debounceTime(1000))
      .subscribe({
        next: async (url: string) => {
          console.log(arquivo.mimeType);
          const blob = await firstValueFrom(this.arquivoService.downloadArquivo(url));
          const urlBlob = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = arquivo.originalFilename!;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(urlBlob);
        },
      });
  }

  emitFiles() {
    this.onChangeFiles.emit(this.files);
  }
}
