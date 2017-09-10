import {AbstractControl} from '@angular/forms';

export class PhoneNumberValidator {

  public static validate(c:AbstractControl) {
    let PHONE_NUMBER_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return PHONE_NUMBER_REGEXP.test(c.value) ? null : {
      validatePhoneNumber: {
        valid: false
      }
    };
  }
}
