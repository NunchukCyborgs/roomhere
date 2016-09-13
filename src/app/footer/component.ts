import { Component } from '@angular/core';

declare let $: any;
declare let require: (string) => string;

@Component({
  // moduleId: __filename,
  selector: 'sticky-footer',
  // styles: [require('./styles.scss').toString()],
  // directives: [...ROUTER_DIRECTIVES],
  templateUrl: 'template.html'
})
export class StickyFooter  {
}
