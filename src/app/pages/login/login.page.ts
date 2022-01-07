import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewDidLeave } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from './login.actions';
import { LoginState, LoginStateModel } from './login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewDidLeave {
  @Select(LoginState.getState) state$!: Observable<LoginStateModel>;

  form!: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  /**
   * This is the method is fired when the component routing from is about to animate.
   */
  ionViewDidLeave(): void {
    this.form.reset();
    this.form = this.formBuilder.group({ email: [null], password: [null] });
  }

  /**
   * This is the method that triggers an action to login
   */
  login() {
    const form = this.form.getRawValue();

    if (this.form.valid) {
      this.store.dispatch(new Login(form.email, form.password));
    }
  }
}
