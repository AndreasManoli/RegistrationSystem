import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

const components = [DashboardComponent];

@NgModule({
  declarations: components,
  entryComponents: components,
  imports: [CommonModule, DashboardRoutingModule, MatButtonModule, NgJsonEditorModule],
  exports: components
})
export class DashboardModule {}
