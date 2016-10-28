import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { Property } from '../../shared/dtos/property';
import { User } from '../../shared/dtos/user';

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

  public shouldShow(property: Property): boolean {
    const contactName = property.owner && (property.owner.landlord_name || property.owner.owner_name);
    const hasContact = property.owner && contactName && (property.owner.email || property.owner.phone);
    return Boolean(this.mode !== PropertyActionMode.NonAuthorized || (property.available_at && hasContact));
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
    this.actionState$ = new BehaviorSubject(this._actionState);
  }

  public setState(property: Property): Observable<PropertyActionState> {
    if (this._isEditing) {
      this.actionState$.next(this._actionState = new PropertyActionState(PropertyActionMode.Editing, 'Save Changes', 'success'));
    } else if (property && property.can_edit) {
      this.actionState$.next(this._actionState = new PropertyActionState(PropertyActionMode.Authorized, 'Edit Property'));
    } else {
      this.actionState$.next(this._actionState = new PropertyActionState(PropertyActionMode.NonAuthorized, 'Rent Now!'));
    }

    return this.actionState$;
  }

  public doAction(property: Property): void {
    if (this._actionState.mode === PropertyActionMode.Editing) {
      this.isEditing$.next(this._isEditing = false);
    } else if (this._actionState.mode === PropertyActionMode.Authorized) {
      this.isEditing$.next(this._isEditing = true);
    } else {
      isBrowser && $('#RentNowModal').foundation() && $('#RentNowModal').foundation('open');
    }

    this.setState(property);
  }

  public get actionState(): PropertyActionState {
    return Object.assign({}, this._actionState);
  }
}
