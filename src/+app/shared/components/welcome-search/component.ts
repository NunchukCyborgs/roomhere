import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'welcome-search',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class WelcomeSearch {
  public searchForm: FormGroup;
  public query: string = '';
  constructor(private router: Router, private route: ActivatedRoute) { }

  onSubmit() {
    const query = this.searchForm.controls['query'].value;
    this.router.navigate(['/search', { q: query }]);
  }

  ngOnInit() {
    this.searchForm = new FormGroup({ 'query': new FormControl(this.query, Validators.required) });

    this.route.params
      .map(i => i['q'] || '')
      .do(i => this.query = i)
      .subscribe(i => this.searchForm.setValue({ query: i }));
  }
}
