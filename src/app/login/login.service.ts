import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LoginInterceptor } from './login.interceptor';

@Injectable()
export class LoginService {
  private isLoggedIn: boolean = false;
  private role: any;
  loginStatusChanged = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  loginUser(userInfo: any) {
    return this.httpClient.post(
      `${environment.API_URL}/authenticate`,
      userInfo,
      { responseType: 'text' }
    );
  }

  getRole(token: any) {
    return this.httpClient.get(`${environment.API_URL}/getRole`);
  }
  getId() {
    return this.httpClient.get(`${environment.API_URL}/getId`);
  }
  setLogin(role: any) {
    this.isLoggedIn = true;
    this.role = role;
    this.loginStatusChanged.emit(true);
  }
  getLoginStatus() {
    return this.isLoggedIn;
  }
  getRoleStatus() {
    return this.role;
  }
}
