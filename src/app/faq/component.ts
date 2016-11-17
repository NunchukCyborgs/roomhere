import { Component } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'faq',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class FAQ  {
  constructor(private seoService: SeoService) { }
  
  ngOnInit() {
    this.seoService.prependTitle('FAQ')
  }
}
