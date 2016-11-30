import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'welcome-search',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class WelcomeSearch {
  public searchForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  onSubmit() {
    const query = this.searchForm.controls['query'].value;
    this.router.navigate(['/search', { q: query }]);
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      'query': new FormControl('', Validators.required),
    });
  }
}
