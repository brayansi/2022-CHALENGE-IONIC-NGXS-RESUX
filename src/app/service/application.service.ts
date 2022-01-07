import { Injectable } from '@angular/core';
import { AccountResponseDto } from '../model/AccountResponseDto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor() {}

  /**
   * This is the method return the token
   */
  public getToken(): string {
    return localStorage.getItem('accessToken');
  }

  /**
   * This is the method return the user name
   */
  public getUserName(): string {
    return localStorage.getItem('name');
  }

  /**
   * This is the method set the token
   *
   * @param accountResponseDto
   */
  public setToken(accountResponseDto: AccountResponseDto): void {
    const { name, accessToken, refreshToken, expiresIn } = accountResponseDto;

    localStorage.setItem('name', name);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresIn', expiresIn.toString());
  }

  /**
   * This is the method remove the token to storage
   */
  public removeToken(): boolean {
    localStorage.removeItem('name');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');

    return true;
  }

  /**
   * This is the method that validates the token and renews it
   *
   * @returns
   */
  public validateToken(): Promise<void> {
    return new Promise((resolve) => {
      const token = this.getToken();
      if (token) {
        const expiresIn = localStorage.getItem('expiresIn');
        // Validar token
        // Quando a data estiver perto de expirar, renovar um novo token
        console.log('Data do token: ' + expiresIn);
      }

      resolve(null);
    });
  }
}
