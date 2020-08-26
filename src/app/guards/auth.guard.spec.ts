import { discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterService } from '../services/register.service';
import { AuthGuard } from './auth.guard';

class MockRegisterService {
  IsRegister = true;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let registerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RegisterService, useClass: MockRegisterService }],
      imports: [RouterTestingModule]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    registerService = TestBed.inject(RegisterService);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should call router.navigateByUrl', fakeAsync(() => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();
    let result = true;
    registerService.IsRegister = false;
    guard.canActivate(null, null).subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(false);

    tick();
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it('should not call router.navigateByUrl', fakeAsync(() => {
    const spy = spyOn(router, 'navigateByUrl').and.stub();
    let result = true;
    registerService.IsRegister = true;
    guard.canActivate(null, null).subscribe(x => (result = x));
    expect(spy).not.toHaveBeenCalled();
    expect(result).toEqual(true);

    tick();
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});
