import { Injectable } from '@angular/core';
import { AccountResponseDto } from '../model/AccountResponseDto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private token = localStorage.getItem('accessToken');
  private userName = localStorage.getItem('name');

  constructor() {}

  /**
   * This the method return the token
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * This the method return the user name
   */
  public getUserName(): string {
    return this.userName;
  }

  /**
   * This the method set the token
   *
   * @param accountResponseDto
   */
  public setToken(accountResponseDto: AccountResponseDto): void {
    const { name, accessToken, refreshToken, expiresIn } = accountResponseDto;

    localStorage.setItem('name', name);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());

    this.token = accessToken;
    this.userName = name;
  }

  /**
   * This the method set the token
   */
  public removeToken() {
    localStorage.removeItem('name');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');

    this.token = null;
    this.userName = null;
  }
}
