import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/Account';
import { AccountResponseDto } from '../model/AccountResponseDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private endpoint = '/Accounts';

  constructor(private http: HttpClient) {}

  /**
   * This is the method by which the user logs in.
   *
   * @param email user email
   * @param password user password
   */
  login(email: string, password: string): Observable<any> {
    const account: Account = new Account(email, password, 'password');
    return this.http.post<any>(`${environment.api}${this.endpoint}`, account);
  }
}
