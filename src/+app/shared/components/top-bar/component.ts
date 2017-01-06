import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Property } from '../../../shared/dtos/property';
import { jQueryService } from '../../../shared/services/jquery.service';

@Component({
  selector: 'top-bar',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class TopBar {
  @Input() hasAuth: boolean;
  @Input() isLandlord: boolean;
  @Input() name: string;
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private jquery: jQueryService) { }

  public closeMenu() {
    this.jquery.loadJQuery()
      .subscribe(jquery => jquery('.title-bar button[data-toggle]').click());
  }
}
