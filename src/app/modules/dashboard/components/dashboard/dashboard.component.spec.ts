import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterService } from 'src/app/services/register.service';
import { DashboardComponent } from './dashboard.component';

class MockRegisterService {
  IsRegister = true;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'json-editor',
  template: 'dashboard.component.html'
})
// tslint:disable-next-line:component-class-suffix
class MockJsonEditor {
  @Input() options;
  @Input() data;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let registerService: RegisterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MockJsonEditor],
      providers: [{ provide: RegisterService, useClass: MockRegisterService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    registerService = TestBed.inject(RegisterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value to registerService.FieldsPayload ', () => {
    component.getData(null);
    expect(registerService.FieldsPayload).toBeNull();
  });
});
