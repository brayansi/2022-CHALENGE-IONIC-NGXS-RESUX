import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from './login.actions';
import { LoginState, LoginStateModel } from './login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Select(LoginState.getState) state$!: Observable<LoginStateModel>;

  constructor(private store: Store) {}

  ngOnInit() {
    // this.store.dispatch(new Login('v.brayansantos@gmail.com', '123456'));
  }
}
