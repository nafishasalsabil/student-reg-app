import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class LoginInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
          }),
        });
        return next.handle(authReq);
    }

}