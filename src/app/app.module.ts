import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students/students.component';
import { StudentService } from './student.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './registration/registration.service';
import { LoginService } from './login/login.service';
import { LoginInterceptor } from './login/login.interceptor';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    StudentProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    RegistrationModule,
  ],
  providers: [
    StudentService,
    RegistrationService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
