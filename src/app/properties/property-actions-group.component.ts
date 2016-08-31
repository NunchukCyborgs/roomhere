import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: __filename,
  selector: 'property-actions-group',
  styles: [`
  `],
  template: `
    <div>
      <a class="button expanded large rent-now" (click)="submit.emit(true)">{{actionText}}</a>
      <div class="secondary expanded button-group">
        <button type="button" (click)="shareFacebook.emit(true)" class="button"><i class="large icon-facebook"></i></button>
        <button type="button" (click)="shareTwitter.emit(true)" class="button"><i class="large icon-twitter"></i></button>
      </div>
    </div>
  `
})
export class PropertyActionsGroup {
  @Input() actionText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() shareFacebook: EventEmitter<any> = new EventEmitter();
  @Output() shareTwitter: EventEmitter<any> = new EventEmitter();
}
