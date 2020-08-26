import { RegistrationField } from './registrationField.interface';

export interface AppConfig {
  urls: {
    registrationField: string;
    register: string;
  };
  payloads: { registrationField: RegistrationField[] };
  schemas: { registrationField: any };
}
