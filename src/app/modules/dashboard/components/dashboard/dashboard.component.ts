import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { RegistrationField } from 'src/app/interfaces/registrationField.interface';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public editorOptions: JsonEditorOptions;

  public data: RegistrationField[];

  constructor(private registerService: RegisterService) {
    this.data = this.registerService.FieldsPayload;
  }

  ngOnInit(): void {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
  }

  getData(value: RegistrationField[]) {
    this.registerService.FieldsPayload = value;
  }
}
