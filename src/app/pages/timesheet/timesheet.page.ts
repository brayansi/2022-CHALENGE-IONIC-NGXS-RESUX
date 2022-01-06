import { Component } from '@angular/core';
import { ApplicationService } from 'src/app/service/application.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: 'timesheet.page.html',
  styleUrls: ['timesheet.page.scss'],
})
export class TimesheetPage {
  constructor(public applicationService: ApplicationService) {}
}
