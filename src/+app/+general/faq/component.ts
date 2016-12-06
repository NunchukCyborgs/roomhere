import { Component, Renderer } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'faq',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class Faq  {
  constructor(private seoService: SeoService, private renderer: Renderer) { }
  
  ngOnInit() {
    this.seoService.addTags({description: 'Roomhere Frequently Asked Questions. Learn more about how we help you find your new home. ', title: 'FAQ'}, this.renderer);
  }
}
