import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students/students.component';
import { StudentService } from './student.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrationService } from './registration/registration.service';
import { LoginService } from './login/login.service';
import { LoginInterceptor } from './login/login.interceptor';
import { StudentProfileComponent } from './student-profile/student-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    StudentsComponent,
    LoginComponent,
    StudentProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [StudentService, RegistrationService, LoginService,
  {provide:HTTP_INTERCEPTORS, useClass:LoginInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
