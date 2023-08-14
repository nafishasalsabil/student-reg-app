import { EventEmitter, Injectable, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  loginUser(userInfo: any) {
    return this.httpClient.post(`${environment.API_URL}/authenticate`, userInfo, {responseType: 'text'});
  }

  getRole() {
    return this.httpClient.get<any>(`${environment.API_URL}/getRole`);
  }


}
