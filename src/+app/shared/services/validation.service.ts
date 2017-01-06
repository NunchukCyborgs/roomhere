import { Response } from '@angular/http';
import { Validators } from '@angular/forms';

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
      'invalid': 'Invalid',
      'required': 'Required',
      'maxlength': `Maximum length ${validatorValue.requiredLength}`,
      'invalidCreditCard': 'Invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      // 'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'invalidPhoneNumber': 'Invalid phone number. Must be 10 or 11 digits',
      'invalidDate': 'Invalid Date',
      'invalidName': 'Invalid Name. Please give your first and last name',
      'min': `Minimum of ${validatorValue}`,
      'max': `Maxium of ${validatorValue}`,
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    const value = control.value && control.value.replace(/[^0-9]/g, '');
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
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

  static dateValidator(minDate, maxDate, control) {
    try {
      const parts = control.value.split("-");
      const parsedDate = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2]),
      );

      console.log('date validator: ', parsedDate, minDate, maxDate);

      if (minDate <= parsedDate && parsedDate <= maxDate) {
        return null;
      }
    } catch (err) {
      console.log('err date: ', err);
    }

    return { 'invalidDate': true };
  }

  static nameValidator(control) {
    const match = control.value.match(/^[a-z,.'-]+[ ]([a-z,.'-]|[ ])+$/i);

    if (control.value.length === 0 || match) {
      return null;
    } else {
      return { 'invalidName': true };
    }
  }

  static minValidator(min: number, control) {
    const value = control && control.value.toString().replace(/[^0-9]/, '');
    if (!Number.isNaN(value) && Number(value) >= min) {
      return null;
    } else {
      return { 'min': min };
    }
  }

  static maxValidator(max: number, control) {
    const value = control && control.value.toString().replace(/[^0-9]/, '');
    if (!Number.isNaN(value) && Number(value) <= max) {
      return null;
    } else {
      return { 'max': max };
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

  static moneyValidator(control) {
    const money = control.value && control.value.toString();
    if (!money || !money.length || money.match(/^[$]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/)) {
      return null;
    } else {
      return { 'invalid': true };
    }
  }
}
