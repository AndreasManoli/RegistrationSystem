import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { APP_CONFIG, CONFIG } from '../providers/config.provider';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APP_CONFIG, useValue: CONFIG }]
    });
    service = TestBed.inject(RegisterService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be IsRegister = true', () => {
    service.IsRegister = true;
    expect(service.IsRegister).toBeTruthy();
  });

  it('should be FieldsPayload = null', () => {
    service.FieldsPayload = null;
    expect(service.FieldsPayload).toBeNull();
  });

  it('should register execute post call', fakeAsync(() => {
    let result = null;
    const spy = spyOn(http, 'post').and.returnValue(of({ result: null }));
    service.register({}).subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual({ result: null });

    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it('should getValidationFields execute get call', fakeAsync(() => {
    let result = null;
    const spy = spyOn(http, 'get').and.returnValue(of([]));

    service.getValidationFields().subscribe(x => (result = x));
    tick(1000);
    flushMicrotasks();
    discardPeriodicTasks();

    expect(spy).toHaveBeenCalled();
    expect(result).toEqual({ results: [], message: null });

    tick(1000);
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});
