import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/service/application.service';
import {
  CreateTimesheet,
  FindAllTimesheet,
  Logout,
  UpdateTimesheet,
} from './timesheet.actions';
import { TimesheetState, TimesheetStateModel } from './timesheet.state';

import moment from 'moment';
import { Timesheet } from 'src/app/model/Timesheet';

@Component({
  selector: 'app-timesheet',
  templateUrl: 'timesheet.page.html',
  styleUrls: ['timesheet.page.scss'],
})
export class TimesheetPage {
  @Select(TimesheetState.getState) state$!: Observable<TimesheetStateModel>;
  @Select(TimesheetState.getTimesheet) timesheet$!: Observable<
    Array<Timesheet>
  >;

  public date: string = moment().format('DD/MM/YYYY');
  public time: string = moment().format('hh:mm');
  public accumulated = '00:00:00';

  constructor(
    private store: Store,
    public applicationService: ApplicationService
  ) {
    this.store.dispatch(new FindAllTimesheet());

    setTimeout(() => {
      setInterval(() => {
        const data = this.store.selectSnapshot(TimesheetState.getTimesheet);

        if (data.length > 0) {
          if (!data[0].startLunch || data[0]?.endLunch) {
            const diff = moment().diff(
              moment((data[0].start as string).split('.')[0]),
              'seconds'
            );

            this.accumulated = moment((data[0].start as string).split('.')[0])
              .startOf('s')
              .add(diff, 'seconds')
              .format('HH:mm:ss');
          }
        } else {
          this.accumulated = '00:00:00';
        }
      }, 1000);
    }, 1000);
  }

  /**
   * This is the method that triggers an action to set timesheet
   */
  setTime() {
    const data = this.store.selectSnapshot(TimesheetState.getTimesheet);

    if (data.length <= 0) {
      const timesheet: Timesheet = {
        start: moment().toISOString(),
      } as Timesheet;

      this.store.dispatch(new CreateTimesheet(timesheet));
    } else {
      const timesheet: Timesheet = { ...data[0] } as Timesheet;

      if (!timesheet.startLunch) {
        timesheet.startLunch = moment().toISOString();
      } else if (!timesheet.endLunch) {
        timesheet.endLunch = moment().toISOString();
      } else if (!timesheet.end) {
        timesheet.end = moment().toISOString();
      }

      this.store.dispatch(new UpdateTimesheet(timesheet));
    }
  }

  /**
   * This is the method that return date formatted
   */
  formatDate(date: string): string {
    return moment(date.split('.')[0]).format('DD/MM/YYYY');
  }

  /**
   * This is the method that return date time formatted
   */
  formatTime(date: string, isSetUtf?: boolean): string {
    return moment(date.split('.')[0]).format('HH:mm:ss');
  }

  /**
   * This is the method that triggers an action to logout
   */
  logout() {
    this.store.dispatch(new Logout());
  }
}
