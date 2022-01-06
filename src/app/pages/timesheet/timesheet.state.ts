import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TimesheetService } from 'src/app/service/timesheet.service';
import {
  FindAllTimesheet,
  FindAllTimesheetError,
  FindAllTimesheetSuccess,
  Logout,
} from './timesheet.actions';

export interface TimesheetStateModel {
  loading: number;
}

@State<TimesheetStateModel>({
  name: 'TimesheetModel',
  defaults: {
    loading: 0,
  },
})
@Injectable()
export class TimesheetState {
  constructor(
    private timesheetService: TimesheetService,
    private navController: NavController
  ) {}

  @Selector()
  static getState(state: TimesheetStateModel): TimesheetStateModel {
    return state;
  }

  @Action(FindAllTimesheet)
  findAllTimesheet(ctx: StateContext<TimesheetStateModel>) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading + 1 });

    this.timesheetService
      .findAll()
      .toPromise()
      .then((res: any) => ctx.dispatch(new FindAllTimesheetSuccess()))
      .catch((err: any) => ctx.dispatch(new FindAllTimesheetError(err)));
  }

  @Action(FindAllTimesheetSuccess)
  async findAllTimesheetSuccess(ctx: StateContext<TimesheetStateModel>) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading - 1 });
  }

  @Action(FindAllTimesheetError)
  async findAllTimesheetError(ctx: StateContext<TimesheetStateModel>) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading - 1 });
  }

  /**
   * This method dispatches logout method
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(Logout)
  logout(ctx: StateContext<TimesheetStateModel>) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading + 1 });
    this.timesheetService
      .logout()
      .subscribe(() => this.navController.navigateRoot('/login'));
  }
}
