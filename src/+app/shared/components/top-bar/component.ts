import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Property } from '../../../shared/dtos/property';

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

  constructor(private router: Router) { }

  public closeMenu() {
    isBrowser && $('.title-bar button[data-toggle]').click();
  }
}
