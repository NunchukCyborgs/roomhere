import { Component } from '@angular/core';

declare let $: any;
declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'privacy-policy',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PrivacyPolicy  {
}
