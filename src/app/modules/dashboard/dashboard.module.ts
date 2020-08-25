import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

const components = [DashboardComponent];

@NgModule({
  declarations: components,
  entryComponents: components,
  imports: [CommonModule, DashboardRoutingModule],
  exports: components
})
export class DashboardModule {}
