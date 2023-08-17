import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { StudentsComponent } from './students/students.component';
import { LoginComponent } from './login/login.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',

    loadChildren: () =>
      import('../app/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  { path: 'edit/:id', component: RegistrationComponent },
  { path: 'profile/:id', component: StudentProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
