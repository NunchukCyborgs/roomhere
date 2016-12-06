import { Response } from '@angular/http';

export class ValidationService {
  static getAuthErrors(res: Response): string[] {
    const json = res.json();
    if (!res.ok && json.errors) {
      return Array.isArray(json.errors) ? json.errors : json.errors.full_messages;
    } else {
      return []
    }
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      // 'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'invalidPhoneNumber': 'Invalid phone number. Must be 10 or 11 digits',
      'invalidDate': 'Invalid Date',
      'invalidName': 'Invalid Name. Please give your first and last name',
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static phoneNumberValidator(control) {
    const match = control.value.match(/\d/g); 
    if (control.value.length === 0 || (match && (match.length === 10 || match.length === 11))) {
      return null;
    } else {
      return { 'invalidPhoneNumber': true };
    }
  }

  static dateValidator(control, minDate, maxDate) {
    // todo
    console.log('date validator: ', control.value, minDate, maxDate);
    const match = control.value && control.value.match(/\d/g); 
    if (1 === 1) {
      return null;
    } else {
      return { 'invalidDate': true };
    }
  }

  static nameValidator(control) {
    // todo
    console.log('name validator: ', control.value);
    
    if (control.value.match(/^[a-z ,.'-]+$/i)) {
      return null;
    } else {
      return { 'invalidName': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (!control.value.length || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
