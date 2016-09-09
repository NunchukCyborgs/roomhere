import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Property } from '../properties/index';
import { User } from '../users/index';

export enum PropertyActionState {
  Editing,
  Authorized,
  NonAuthorized
}

@Injectable()
export class PropertyActionStateService {
  public isEditing$: BehaviorSubject<boolean>;
  private _isEditing: boolean = false;
  public actionState$: BehaviorSubject<PropertyActionState>;
  private _actionState: PropertyActionState = PropertyActionState.NonAuthorized;
  public actionText$: BehaviorSubject<string>;

  constructor() {
    this.actionText$ = new BehaviorSubject(this.getActionText(this._actionState));
    this.actionText$.subscribe();

    this.isEditing$ = new BehaviorSubject(this._isEditing);
    this.isEditing$.subscribe();

    this.actionState$ = new BehaviorSubject(this._actionState);
    this.actionState$
      .do(i => this.actionText$.next(this.getActionText(i)))
      .flatMap(() => this.actionText$)
      .subscribe();
  }

  public setState(user: User, property: Property): Observable<PropertyActionState> {
    if (this._isEditing) {
      this.actionState$.next(this._actionState = PropertyActionState.Editing);
    } else if (property && user && (user.license_id === property.license_id || !property.license_id)) { // Remove this silly case when api is finished
      this.actionState$.next(this._actionState = PropertyActionState.Authorized);
    } else {
      this.actionState$.next(this._actionState = PropertyActionState.NonAuthorized);
    }

    return this.actionState$;
  }

  public doAction(user: User, property: Property): void {
    if (this._actionState === PropertyActionState.Editing) {
      this.isEditing$.next(this._isEditing = false);
    } else if (this._actionState === PropertyActionState.Authorized) {
      this.isEditing$.next(this._isEditing = true);
    } else {
      console.log('begin rent now workflow');
    }

    this.setState(user, property);
  }

  private getActionText(state: PropertyActionState): string {
    if (state === PropertyActionState.Editing) {
      return 'Cancel Changes';
    } else if (state === PropertyActionState.Authorized) {
      return 'Edit Property';
    } else {
      return 'Rent Now!';
    }
  }
}