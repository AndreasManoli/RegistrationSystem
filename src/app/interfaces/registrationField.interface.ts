import { FieldValidation } from './fieldValidation.interface';

export interface RegistrationField {
  type: string;
  name: string;
  label: string;
  required: boolean;
  validations?: FieldValidation[];
}
