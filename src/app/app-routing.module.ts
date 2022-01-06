import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'timesheet',
    pathMatch: 'full',
  },
  {
    path: 'timesheet',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/timesheet/timesheet.module').then(
        (m) => m.TimesheetPageModule
      ),
  },
  {
    path: 'login',
    canActivate: [AuthGuardService],

    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
