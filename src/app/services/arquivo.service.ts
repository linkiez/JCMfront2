import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArquivo } from '../models/arquivo';
import { IPedidoCompraItem } from '../models/pedido-compra';
import { IOrcamentoItem } from '../models/orcamento';
import { IOrdemProducaoItem } from '../models/ordem-producao';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  constructor(private http: HttpClient) {}

  getArquivos(): Observable<IArquivo[]> {
    return this.http.get<IArquivo[]>(environment.backendURL + 'file', {
      responseType: 'json',
    });
  }

  getArquivo(id: number): Observable<IArquivo> {
    return this.http.get<IArquivo>(environment.backendURL + 'file/' + id, {
      responseType: 'json',
    });
  }

  addArquivo(arquivo: IArquivo): Observable<IArquivo> {
    return this.http.post(environment.backendURL + 'file', arquivo, {
      responseType: 'json',
    });
  }

  uploadArquivo(file: File): Observable<IArquivo> {
    const formData = new FormData();

    formData.append('filetoupload', file);

    return this.http.post(environment.backendURL + 'file', formData, {
      responseType: 'json',
    });
  }

  deleteArquivo(id: number): Observable<Object> {
    return this.http.delete(environment.backendURL + 'file/' + id, {
      responseType: 'json',
    });
  }

  getUrlArquivo(id: number): Observable<string> {
    return this.http.get<string>(environment.backendURL + 'file/url/' + id, {
      responseType: 'json',
    });
  }

  async downloadAllFilesFromArray(
    array: IOrdemProducaoItem[] | IOrcamentoItem[]
  ) {
    const files = array.map((item) => item.files ?? []).flat();
    let filesUrl = files.map((file) =>
      firstValueFrom(this.getUrlArquivo(file?.id!))
    );

    const blobs$ = (await Promise.all(filesUrl)).map((url, index) =>
      this.downloadArquivo(url).pipe(
        map((blob) => ({ fileName: files[index].originalFilename!, blob })),
      )
    );

    forkJoin(blobs$).pipe(
      map(files => files.filter(file => file !== null)), // remove null values
      map(files => this.zipFiles(files))
    )
    .subscribe(zipBlob => {
        zipBlob.then((zipBlob) => {
          FileSaver.saveAs(zipBlob, 'files.zip');
        });

    });
  }

  private downloadArquivo(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  private async zipFiles(files: { fileName: string; blob: Blob }[]) {
    const zip = new JSZip();

    files.forEach(file => {
      zip.file(file.fileName, file.blob);
    });

    return await zip.generateAsync({ type: 'blob' });
  }
}
