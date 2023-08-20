import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllStudentsListDashboardComponent } from './workspace/all-students-list-dashboard/all-students-list-dashboard.component';
import { StudentService } from './shared/services/student/student.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './workspace/registration/registration.service';
import { LoginService } from './workspace/login/login.service';
import { LoginInterceptor } from './interceptor/login.interceptor';
import { StudentProfileComponent } from './workspace/student-profile/student-profile.component';
import { LoginModule } from './workspace/login/login.module';
import { RegistrationModule } from './workspace/registration/registration.module';
import { StudentProfileModule } from './workspace/student-profile/student-profile.module';
import { DatePipe } from '@angular/common';
import { AllStudentsListDashboardModule } from './workspace/all-students-list-dashboard/all-student-list-dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    RegistrationModule,
    StudentProfileModule,
    AllStudentsListDashboardModule
  ],
  providers: [
    StudentService,
    RegistrationService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
