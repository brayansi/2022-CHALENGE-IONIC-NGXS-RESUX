import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Timesheet } from 'src/app/model/Timesheet';
import { TimesheetResponseDto } from 'src/app/model/TimesheetResponseDto';
import { TimesheetService } from 'src/app/service/timesheet.service';
import {
  CreateTimesheet,
  CreateTimesheetError,
  CreateTimesheetSuccess,
  FindAllTimesheet,
  FindAllTimesheetError,
  FindAllTimesheetSuccess,
  Logout,
  UpdateTimesheet,
  UpdateTimesheetError,
  UpdateTimesheetSuccess,
} from './timesheet.actions';

export interface TimesheetStateModel {
  itens: Array<Timesheet>;
  loading: number;
}

@State<TimesheetStateModel>({
  name: 'TimesheetModel',
  defaults: {
    itens: [],
    loading: 0,
  },
})
@Injectable()
export class TimesheetState {
  constructor(
    private timesheetService: TimesheetService,
    private navController: NavController
  ) {}

  /**
   * This is the selector that return timesheet page state
   *
   * @param state Timesheet page state
   * @returns state
   */
  @Selector()
  static getState(state: TimesheetStateModel): TimesheetStateModel {
    return state;
  }

  /**
   * This is the selector that return timesheet open
   *
   * @param state Timesheet page state
   * @returns Array of timesheet
   */
  @Selector()
  static getTimesheet(state: TimesheetStateModel): Array<Timesheet> {
    return state.itens.filter(
      (iten) => !(iten.start && iten.endLunch && iten.endLunch && iten.end)
    );
  }

  /**
   * This is the method dispatches find method
   *
   * @param ctx State context provided to the actions in the state.
   * @param action This action data
   */
  @Action(FindAllTimesheet)
  findAllTimesheet(ctx: StateContext<TimesheetStateModel>) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading + 1 });

    this.timesheetService
      .findAll()
      .toPromise()
      .then((res: TimesheetResponseDto) =>
        ctx.dispatch(new FindAllTimesheetSuccess(res.items))
      )
      .catch((err: any) => ctx.dispatch(new FindAllTimesheetError(err)));
  }

  /**
   * This is the method dispatches find method
   *
   * @param ctx State context provided to the actions in the state.
   * @param action This action data
   */
  @Action(FindAllTimesheetSuccess)
  async findAllTimesheetSuccess(
    ctx: StateContext<TimesheetStateModel>,
    action: FindAllTimesheetSuccess
  ) {
    ctx.patchState({
      ...ctx.getState(),
      itens: action.timesheet,
      loading: ctx.getState().loading - 1,
    });
  }

  /**
   * This is the method is dispatched when find is error
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(FindAllTimesheetError)
  async findAllTimesheetError(
    ctx: StateContext<TimesheetStateModel>,
    action: FindAllTimesheetError
  ) {
    console.log(`Error: ${action.error}`);
    ctx.patchState({
      ...ctx.getState(),
      itens: [],
      loading: ctx.getState().loading - 1,
    });
  }

  /**
   * This is the method dispatches create method
   *
   * @param ctx State context provided to the actions in the state.
   * @param action This action data
   */
  @Action(CreateTimesheet)
  createTimesheet(
    ctx: StateContext<TimesheetStateModel>,
    action: CreateTimesheet
  ) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading + 1 });

    this.timesheetService
      .create(action.timesheet)
      .toPromise()
      .then((res: any) => ctx.dispatch(new CreateTimesheetSuccess()))
      .catch((err: any) => ctx.dispatch(new CreateTimesheetError(err)));
  }

  /**
   * This is the method is dispatched when create is successfully
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(CreateTimesheetSuccess)
  async createTimesheetSuccess(ctx: StateContext<TimesheetStateModel>) {
    ctx.dispatch(new FindAllTimesheet());
    ctx.patchState({
      ...ctx.getState(),
      loading: ctx.getState().loading - 1,
    });
  }

  /**
   * This is the method is dispatched when create is error
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(CreateTimesheetError)
  async createTimesheetError(
    ctx: StateContext<TimesheetStateModel>,
    action: CreateTimesheetError
  ) {
    console.log(`Error: ${action.error}`);

    ctx.patchState({
      ...ctx.getState(),
      loading: ctx.getState().loading - 1,
    });
  }

  /**
   * This is the method dispatches Update method
   *
   * @param ctx State context provided to the actions in the state.
   * @param action This action data
   */
  @Action(UpdateTimesheet)
  updateTimesheet(
    ctx: StateContext<TimesheetStateModel>,
    action: UpdateTimesheet
  ) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading + 1 });

    this.timesheetService
      .update(action.timesheet.id, action.timesheet)
      .toPromise()
      .then((res: any) => ctx.dispatch(new UpdateTimesheetSuccess()))
      .catch((err: any) => ctx.dispatch(new UpdateTimesheetError(err)));
  }

  /**
   * This is the method is dispatched when login is successfully
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(UpdateTimesheetSuccess)
  async updateTimesheetSuccess(ctx: StateContext<TimesheetStateModel>) {
    ctx.dispatch(new FindAllTimesheet());
    ctx.patchState({
      ...ctx.getState(),
      loading: ctx.getState().loading - 1,
    });
  }

  /**
   * This is the method is dispatched when update is error
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(UpdateTimesheetError)
  async updateTimesheetError(
    ctx: StateContext<TimesheetStateModel>,
    action: UpdateTimesheetError
  ) {
    console.log(`Error: ${action.error}`);

    ctx.patchState({
      ...ctx.getState(),
      loading: ctx.getState().loading - 1,
    });
  }

  /**
   * This is the method dispatches logout method
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
