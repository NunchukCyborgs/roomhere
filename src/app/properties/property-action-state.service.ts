import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { Property } from '../properties/index';
import { User } from '../users/index';

export enum PropertyActionMode {
  Editing,
  Authorized,
  NonAuthorized
}

export class PropertyActionState {
  mode: PropertyActionMode;
  text: string;
  className: string;

  constructor(mode: PropertyActionMode = PropertyActionMode.NonAuthorized, text: string = '', className: string = '') {
    this.mode = mode;
    this.text = text;
    this.className = className;
  }
}

@Injectable()
export class PropertyActionStateService {
  public isEditing$: BehaviorSubject<boolean>;
  private _isEditing: boolean = false;
  public actionState$: BehaviorSubject<PropertyActionState>;
  private _actionState: PropertyActionState = new PropertyActionState();

  constructor() {
    this.isEditing$ = new BehaviorSubject(this._isEditing);
    this.isEditing$.subscribe();

    this.actionState$ = new BehaviorSubject(this._actionState);
    this.actionState$.subscribe();
  }

  public setState(user: User, property: Property): Observable<PropertyActionState> {
    if (this._isEditing) {
      this.actionState$.next(this._actionState = new PropertyActionState(PropertyActionMode.Editing, 'Update Property', 'success'));
    } else if (property && user && user.email && (user.license_id === property.license_id || !property.license_id)) { // Remove this silly case when api is finished
      // This will be simplified to prop && prop.can_edit
      this.actionState$.next(this._actionState = new PropertyActionState(PropertyActionMode.Authorized, 'Edit Property'));
    } else {
      this.actionState$.next(this._actionState = new PropertyActionState(PropertyActionMode.NonAuthorized, 'Rent Now!'));
    }

    return this.actionState$;
  }

  public doAction(user: User, property: Property): void {
    if (this._actionState.mode === PropertyActionMode.Editing) {
      this.isEditing$.next(this._isEditing = false);
    } else if (this._actionState.mode === PropertyActionMode.Authorized) {
      this.isEditing$.next(this._isEditing = true);
    } else {
      isBrowser && $('#RentNow').foundation('open');
    }

    this.setState(user, property);
  }

  public get actionState(): PropertyActionState {
    return Object.assign({}, this._actionState);
  }
}
