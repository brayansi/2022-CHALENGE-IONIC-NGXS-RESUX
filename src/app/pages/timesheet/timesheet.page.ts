import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/service/application.service';
import { FindAllTimesheet, Logout } from './timesheet.actions';
import { TimesheetState, TimesheetStateModel } from './timesheet.state';

@Component({
  selector: 'app-timesheet',
  templateUrl: 'timesheet.page.html',
  styleUrls: ['timesheet.page.scss'],
})
export class TimesheetPage {
  @Select(TimesheetState.getState) state$!: Observable<TimesheetStateModel>;

  constructor(
    private store: Store,
    public applicationService: ApplicationService
  ) {
    this.store.dispatch(new FindAllTimesheet());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
