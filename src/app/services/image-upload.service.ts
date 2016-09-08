import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServerUnsafeService } from './server-unsafe.service';
import { HttpService } from './http.service';
import { BASE_API_URL } from '../config';
import { Property, PropertyService } from '../properties/index';

declare let $: any;

export interface PendingFile {
  fileName: string,
  progress: number;
}

@Injectable()
export class ImageUploadService {
  public pendingFiles$: BehaviorSubject<PendingFile[]>;
  private _pendingFiles: PendingFile[] = [];

  constructor(private unsafe: ServerUnsafeService, private http: HttpService, private propertyService: PropertyService) {
    this.pendingFiles$ = new BehaviorSubject(this._pendingFiles);
    this.pendingFiles$.subscribe();
  }

  public uploaderInit(uploaderId: string, dropzoneId: string, property: Property) {
    this.unsafe.tryUnsafeCode(() => {
      const fileUpload$ = $(`#${uploaderId}`);
      const dropzone$ = $(`#${dropzoneId}`)
      const URL = `${BASE_API_URL}/properties/${property.slug}/images`;

      fileUpload$.fileupload({
        withCredentials: true,
        dropZone: dropzone$,
        url: URL,
        type: 'POST',
        maxFileSize: 999000,
        acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
        add: (e, data) => this.imageAdded(data, dropzone$),
        progress: (e, data) => this.uploadProgress(data),
        done: (e, data) => this.uploadComplete(data),
      });

      fileUpload$.fileupload(
        'option',
        'redirect',
        window.location.href.replace(
          /\/[^\/]*$/,
          '/cors/result.html?%s'
        )
      );
      $(document).bind('dragover', (e) => {
        var found = false,
          node = e.target;
        do {
          if (node === dropzone$[0]) {
            found = true;
            break;
          }
          node = node.parentNode;
        } while (node != null);
        if (found) {
          dropzone$.addClass('in');
        } else {
          dropzone$.removeClass('in');
        }
      });
    }, '$ is undefined');
  }

  public get pendingFiles(): PendingFile[] {
    return Object.assign([], this._pendingFiles);
  }

  public updatePendingFile(newFile: PendingFile) {
    this.updatePendingFiles([...this.pendingFiles.filter(i => i.fileName !== newFile.fileName), newFile]);
  }

  public deletePendingFile(file: PendingFile) {
    this.updatePendingFiles(this.pendingFiles.filter(i => i.fileName !== file.fileName));
  }

  private getFileName(data: any): string {
    return data.files[0].name.replace(/[^a-z0-9]/ig, '');
  }

  private imageAdded(data, dropzone$) {
    const file = data.files[0];
    this.updatePendingFiles([...this.pendingFiles, { fileName: this.getFileName(data), progress: 0 }])
    dropzone$.removeClass('in');
    let h = {};
    this.http.headers.forEach((values: string[], name: string) => {
      h[name] = values[0];
    });
    delete h['Content-Type'];
    data.headers = h;
    data.submit();
  }

  private uploadProgress(data) {
    const progress = Number(data.loaded / data.total * 100);
    this.updatePendingFile({fileName: this.getFileName(data), progress: progress});
  }

  private uploadComplete(data) {
    const x = data.jqXHR;
    this.http.setAuthHeaders(x.getResponseHeader('access-token'), x.getResponseHeader('client'), x.getResponseHeader('uid'));
    this.propertyService.updateLocal(data.result);
    this.deletePendingFile({fileName: this.getFileName(data), progress: 100});
  }

  private updatePendingFiles(pendingFiles: PendingFile[]) {
    this._pendingFiles = pendingFiles;
    this.pendingFiles$.next(this._pendingFiles);
  }
}