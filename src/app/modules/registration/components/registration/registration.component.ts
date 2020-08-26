import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FieldValidation } from 'src/app/interfaces/fieldValidation.interface';
import { RegistrationField } from 'src/app/interfaces/registrationField.interface';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  validationMessages: Record<string, Record<string, string>> = {};
  hide: Record<string, boolean> = {};
  fields$: Observable<RegistrationField[]>;
  error$: Observable<any>;
  validationFieldsResults$: Observable<{ results: RegistrationField[]; message: any }>;
  private subscription: Subscription;

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit() {
    this.validationFieldsResults$ = this.registerService.getValidationFields();
    this.fields$ = this.validationFieldsResults$.pipe(
      map(x => x.results),
      tap(fields => {
        const fromGroupInput = {};
        fields?.forEach(x => {
          this.setValidationMessages(x.name, x.validations);
          _.set(this.hide, x.name, true);
          _.set(fromGroupInput, x.name, new FormControl('', this.generateValidations(x.validations)));
        });
        this.form = new FormGroup(fromGroupInput);
      })
    );
    this.error$ = this.validationFieldsResults$.pipe(map(x => x.message));
  }

  ngOnDestroy() {
    _.attempt(() => this.subscription?.unsubscribe());
  }

  setValidationMessages(name: string, validations: FieldValidation[]): void {
    const messages = {};
    validations?.forEach(x => _.set(messages, x.name === 'regex' ? 'pattern' : x.name, x.message));
    _.set(this.validationMessages, name, messages);
  }

  getFirstValidationMessage(name: string): string {
    const keys = _.keys(this.form.controls[name].errors);
    return _.get(this.validationMessages, [name, _.head(keys)]);
  }

  generateValidations(validations: FieldValidation[]): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    validations?.forEach(x => {
      switch (x.name) {
        case 'maxlength': {
          if (_.isNumber(x.value)) {
            validators.push(Validators.maxLength(x.value));
          }
          break;
        }
        case 'minlength': {
          if (_.isNumber(x.value)) {
            validators.push(Validators.minLength(x.value));
          }
          break;
        }
        case 'regex': {
          if (_.isString(x.value)) {
            validators.push(Validators.pattern(x.value));
          }
          break;
        }
      }
    });
    return validators;
  }

  register(): void {
    _.attempt(() => this.subscription?.unsubscribe());

    this.subscription = this.registerService.register(this.form.value).subscribe(x => {
      if (x.status) {
        this.router.navigateByUrl('welcome');
      }
    });
  }
}
