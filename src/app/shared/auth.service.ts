import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInFlag: boolean = false;

  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  login() {
    // Perform actual login logic
    this.isLoggedInFlag = true;
  }

  logout() {
    // Perform actual logout logic
    this.isLoggedInFlag = false;
  }
}
