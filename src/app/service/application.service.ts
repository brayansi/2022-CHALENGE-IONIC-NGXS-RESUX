import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private token = '';

  constructor() {}

  /**
   * This the method return the token
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * This the method set the token
   */
  public setToken(token: string): string {
    return (this.token = token);
  }
}
