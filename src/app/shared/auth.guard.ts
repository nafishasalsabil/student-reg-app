import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 
  // if (this.authService.isLoggedIn()) {
  //   return true;
  // } else {
  //   // Redirect to login page if not logged in
  //   return this.router.parseUrl('/login');
  // }
  return true;
};
