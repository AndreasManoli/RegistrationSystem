import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, CONFIG } from 'src/app/providers/config.provider';
import { RegistrationFieldInterceptor } from './registration-field.interceptor';

describe('RegistrationFieldInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationFieldInterceptor, { provide: APP_CONFIG, useValue: CONFIG }]
    })
  );

  it('should be created', () => {
    const interceptor: RegistrationFieldInterceptor = TestBed.inject(RegistrationFieldInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
