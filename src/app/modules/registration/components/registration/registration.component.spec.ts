import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { RegistrationField } from 'src/app/interfaces/registrationField.interface';
import { RegisterService } from 'src/app/services/register.service';
import { RegistrationComponent } from './registration.component';

class MockRegisterService {
  IsRegister = true;

  getValidationFields(): Observable<{ results: RegistrationField[]; message: any }> {
    return of({ results: null, message: '' });
  }
  register = () => of({ status: true });
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registerService: RegisterService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
      providers: [{ provide: RegisterService, useClass: MockRegisterService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    registerService = TestBed.inject(RegisterService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register', fakeAsync(() => {
    const spy = spyOn(registerService, 'register').and.returnValue(of({ status: false }));
    const routerSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.register();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();

    component.register();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
  }));

  it('should redirect', fakeAsync(() => {
    const spy = spyOn(registerService, 'register').and.returnValue(of({ status: true }));
    const routerSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.register();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();

    component.register();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  }));

  it('should setValidationMessages', () => {
    component.setValidationMessages('test', [{ name: 'regex', message: 'test' } as any]);
    expect(component.validationMessages).toEqual({ test: { pattern: 'test' } });
    component.setValidationMessages('test', [{ name: 'minlenght', message: 'test' } as any]);
    expect(component.validationMessages).toEqual({ test: { minlenght: 'test' } });
    component.setValidationMessages('test', null);
    expect(component.validationMessages).toEqual({ test: {} });
  });

  it('should with correct input generateValidations', () => {
    expect(
      component.generateValidations([
        { name: 'regex', value: '12' } as any,
        { name: 'maxlength', value: 12 } as any,
        { name: 'minlength', value: 12 } as any
      ]).length
    ).toEqual(3);
  });

  it('should with wrong input generateValidations', () => {
    expect(
      component.generateValidations([
        { name: 'regex', value: 12 } as any,
        { name: 'maxlength', value: '12' } as any,
        { name: 'minlength', value: '12' } as any
      ]).length
    ).toEqual(0);
  });
  it('should with null input generateValidations', () => {
    expect(component.generateValidations(null).length).toEqual(0);
  });
});
