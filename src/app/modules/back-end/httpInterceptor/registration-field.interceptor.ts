import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { RegisterService } from 'src/app/services/register.service';

@Injectable()
export class RegistrationFieldInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, private registerService: RegisterService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url === this.config.urls.registrationField) {
      return of(new HttpResponse({ status: 200, body: this.registerService.FieldsPayload }));
    } else if (request.method === 'POST' && request.url === this.config.urls.register) {
      return of(new HttpResponse({ status: 200, body: { status: true } }));
    }
    next.handle(request);
  }
}
