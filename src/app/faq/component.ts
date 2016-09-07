import { Component } from '@angular/core';

declare let $: any;
declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'faq',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class FAQ  {
}
