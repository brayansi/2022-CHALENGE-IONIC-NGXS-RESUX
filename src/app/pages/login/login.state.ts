import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AccountResponseDto } from 'src/app/model/AccountResponseDto';
import { ApplicationService } from 'src/app/service/application.service';
import { LoginService } from 'src/app/service/login.service';
import { Login, LoginError, LoginSuccess } from './login.actions';

export interface LoginStateModel {
  loading: number;
}

@State<LoginStateModel>({
  name: 'LoginModel',
  defaults: {
    loading: 0,
  },
})
@Injectable()
export class LoginState {
  constructor(
    private loginService: LoginService,
    private applicationService: ApplicationService,
    private navController: NavController
  ) {}

  /**
   * This is the selector that return timesheet page state
   *
   * @param state Timesheet page state
   * @returns state
   */
  @Selector()
  static getState(state: LoginStateModel): LoginStateModel {
    return state;
  }

  /**
   * This is the method dispatches login method
   *
   * @param ctx State context provided to the actions in the state.
   * @param action This action data
   */
  @Action(Login)
  login(ctx: StateContext<LoginStateModel>, action: Login) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading + 1 });

    this.loginService
      .login(action.email, action.password)
      .toPromise()
      .then((res: AccountResponseDto) => ctx.dispatch(new LoginSuccess(res)))
      .catch((err: any) => ctx.dispatch(new LoginError(err)));
  }

  /**
   * This is the method is dispatched when login is successfully
   *
   * @param ctx State context provided to the actions in the state.
   * @param action This action data
   */
  @Action(LoginSuccess)
  async loginSuccess(ctx: StateContext<LoginStateModel>, action: LoginSuccess) {
    this.applicationService.setToken(action.accountResponseDto);
    await this.navController.navigateRoot('/timesheet');
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading - 1 });
  }

  /**
   * This is the method is dispatched when login failed
   *
   * @param ctx State context provided to the actions in the state.
   */
  @Action(LoginError)
  async loginError(ctx: StateContext<LoginStateModel>, action: LoginError) {
    ctx.patchState({ ...ctx.getState(), loading: ctx.getState().loading - 1 });
  }
}
