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
        <a target="_blank" [href]="tweetText" class="button">
          <i class="large icon-twitter"></i>
        </a>
      </div>
    </div>
  `
})
export class PropertyActionsGroup {
  @Input() actionText: string;
  @Input() tweetText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() shareFacebook: EventEmitter<any> = new EventEmitter();
}
