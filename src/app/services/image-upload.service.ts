import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isBrowser } from 'angular2-universal';
import { HttpService } from './http.service';
import { Property } from '../properties/property';
import { PropertyService } from '../services/property.service';

export interface PendingFile {
  fileName: string,
  progress: number;
}

@Injectable()
export class ImageUploadService {
  public pendingFiles$: BehaviorSubject<PendingFile[]>;
  private _pendingFiles: PendingFile[] = [];

  constructor(private http: HttpService, private propertyService: PropertyService) {
    this.pendingFiles$ = new BehaviorSubject(this._pendingFiles);
    this.pendingFiles$.subscribe();
  }

  public uploaderInit(uploaderId: string, property: Property, wrapperSelector: string = 'image-upload .wrapper') {
    if (isBrowser) {
      const fileUpload$ = $(`#${uploaderId}`);
      const URL = `${BASE_API_URL}/properties/${property.slug}/images`;
      const wrapper$ = $(wrapperSelector);

      fileUpload$.fileupload({
        withCredentials: true,
        dropZone: fileUpload$,
        url: URL,
        type: 'POST',
        maxFileSize: 999000,
        acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
        add: (e, data) => this.imageAdded(data, wrapper$),
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

      this.bindToDrag(wrapper$);
    };
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

  private imageAdded(data, wrapper$) {
    const file = data.files[0];
    this.updatePendingFiles([...this.pendingFiles, { fileName: this.getFileName(data), progress: 0 }])
    wrapper$.removeClass('in');
    let h = {};
    this.http.headers.forEach((values: string[], name: string) => {
      h[name] = values[0];
    });
    delete h['Content-Type'];
    delete h['content-type'];
    data.headers = h;
    data.submit();
  }

  private uploadProgress(data) {
    const progress = Number(data.loaded / data.total * 100);
    this.updatePendingFile({ fileName: this.getFileName(data), progress: progress });
  }

  private uploadComplete(data) {
    const x = data.jqXHR;
    let headers = { token: x.getResponseHeader('access-token'), client: x.getResponseHeader('client'), uid: x.getResponseHeader('uid') };
    if (headers.token && headers.client && headers.uid) {
      this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
    }
    this.propertyService.updatePropertyBySlugLocal(data.result);
    this.deletePendingFile({ fileName: this.getFileName(data), progress: 100 });
  }

  private updatePendingFiles(pendingFiles: PendingFile[]) {
    this._pendingFiles = pendingFiles;
    this.pendingFiles$.next(this._pendingFiles);
  }

  private bindToDrag(wrapper$) {
    $(document).bind('dragover', (e) => {
      let found = false;
      let node = e.target;

      do {
        if (node === wrapper$[0]) {
          found = true;
          break;
        }
        node = node.parentNode;
      } while (node != null);
      if (found) {
        wrapper$.addClass('in');
      } else {
        wrapper$.removeClass('in');
      }
    });
  }
}
