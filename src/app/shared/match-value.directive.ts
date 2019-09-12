import {Attribute, Directive, forwardRef, Input} from '@angular/core';
import {Validator, NG_VALIDATORS, FormControl, AbstractControl} from '@angular/forms';

@Directive({
  selector: '[matchValue][formControlName],[matchValue][formControl],[matchValue][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchValueDirective), multi: true}
  ]
})

export class MatchValueDirective implements Validator {
  constructor(@Attribute('matchValue') public other: string, @Attribute('reverse') public reverse: string) {
  }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true';
  }

  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;

    // control vlaue
    let e = c.root.get(this.other);

    // value not equal
    if (e && v !== e.value && !this.isReverse) {
      return {
        matchValue: true
      };
    }

    // value equal and reverse
    if (e && v === e.value && this.isReverse && e.errors !== null) {
      delete e.errors['matchValue'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({matchValue: true});
    }

    return null;
  }

}
