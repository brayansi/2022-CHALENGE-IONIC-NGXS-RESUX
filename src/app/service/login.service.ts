import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../model/Account';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private endpoint = '/Accounts';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const account: Account = new Account(email, password, 'password');
    return this.http.post<Account>(
      `${environment.api}/${this.endpoint}`,
      account
    );
  }

  logout() {
    //
  }
}
