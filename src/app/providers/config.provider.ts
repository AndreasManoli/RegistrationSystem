import { InjectionToken } from '@angular/core';
import { urls } from '../config/config.json';
import { registrationField } from '../config/payload-registrationField.json';
import { AppConfig } from '../interfaces/config.interface';
import { schema } from '../schemas/registrationField.schema.json';

export const CONFIG: AppConfig = { urls, payloads: { registrationField }, schemas: { registrationField: schema } };
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
