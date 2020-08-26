import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RegistrationFieldInterceptor } from './httpInterceptor/registration-field.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RegistrationFieldInterceptor,
      multi: true
    }
  ],
  exports: [HttpClientModule]
})
export class BackEndModule {}
