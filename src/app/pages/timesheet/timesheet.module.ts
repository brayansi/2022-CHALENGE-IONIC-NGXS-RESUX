import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetPage } from './timesheet.page';

import { TimesheetPageRoutingModule } from './timesheet-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesheetPageRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [TimesheetPage],
})
export class TimesheetPageModule {}
