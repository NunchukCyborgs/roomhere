import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: __filename,
  selector: 'property-actions-group',
  styles: [`
  `],
  template: `
    <div>
      <a class="button expanded large rent-now" (click)="onSubmit()">{{actionText}}</a>
      <div class="secondary expanded button-group">
        <a class="button"><i class="large icon-facebook"></i></a>
        <a class="button"><i class="large icon-twitter"></i></a>
        <a class="button"><i class="large icon-instagram"></i></a>
      </div>
    </div>
  `
})
export class PropertyActionsGroup {
  @Input() actionText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();

  public onSubmit() {
    this.submit.emit(true);
  }
}
