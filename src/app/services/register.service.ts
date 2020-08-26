import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as Ajv from 'ajv';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { AppConfig } from '../interfaces/config.interface';
import { RegistrationField } from '../interfaces/registrationField.interface';
import { RegistrationRequest } from '../interfaces/registrationRequest.interface';
import { APP_CONFIG } from '../providers/config.provider';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  get IsRegister(): boolean {
    return this.isRegister;
  }
  set IsRegister(value: boolean) {
    this.isRegister = value;
  }
  private isRegister = false;

  get FieldsPayload(): RegistrationField[] {
    return this.fieldsPayload;
  }
  set FieldsPayload(value: RegistrationField[]) {
    this.fieldsPayload = value;
  }
  private fieldsPayload: RegistrationField[];

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this.FieldsPayload = this.config.payloads.registrationField;
  }

  getValidationFields(): Observable<{ results: RegistrationField[]; message: any }> {
    const ajv = new Ajv();
    const validate = ajv.compile(this.config.schemas.registrationField);
    return this.httpClient.get<RegistrationField[]>(this.config.urls.registrationField).pipe(
      delay(1000),
      map((x: RegistrationField[]) => {
        const valid = validate(x);
        if (!valid) {
          throw validate.errors;
        }
        return { results: x, message: null };
      }),
      catchError(error => {
        console.log(error);
        return of({ results: null, message: error });
      })
    );
  }

  register(value: RegistrationRequest): Observable<{ status: boolean }> {
    return this.httpClient.post<{ status: boolean }>(this.config.urls.register, value).pipe(tap(x => (this.IsRegister = x.status)));
  }
}
