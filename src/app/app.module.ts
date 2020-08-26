import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackEndModule } from './modules/back-end/back-end.module';
import { APP_CONFIG, CONFIG } from './providers/config.provider';
import { RegisterService } from './services/register.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, BackEndModule],
  providers: [{ provide: APP_CONFIG, useValue: CONFIG }, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
