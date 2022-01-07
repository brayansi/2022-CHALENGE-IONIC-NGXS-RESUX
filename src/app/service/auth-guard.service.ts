import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  /**
   * This is the method what validate ionic router
   *
   * @param route application router
   * @param state Snapshot router
   * @returns if the route validates
   */
  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = this.applicationService.getToken();

    if (state.url === '/login' && token) {
      this.router.navigateByUrl('/timesheet');
      return false;
    } else if (state.url === '/login' && !token) {
      return true;
    } else if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
