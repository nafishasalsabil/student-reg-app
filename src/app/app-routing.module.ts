import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './workspace/registration/registration.component';
import { AllStudentsListDashboardComponent } from './workspace/all-students-list-dashboard/all-students-list-dashboard.component';
import { LoginComponent } from './workspace/login/login.component';
import { StudentProfileComponent } from './workspace/student-profile/student-profile.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'students',

    loadChildren: () =>
      import(
        './workspace/all-students-list-dashboard/all-student-list-dashboard.module'
      ).then((m) => m.AllStudentsListDashboardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./workspace/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',

    loadChildren: () =>
      import('./workspace/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'edit/:id',

    loadChildren: () =>
      import('./workspace/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },

  {
    path: 'profile/:id',
    loadChildren: () =>
      import('./workspace/student-profile/student-profile.module').then(
        (m) => m.StudentProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
