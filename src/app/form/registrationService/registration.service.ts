import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable()
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  registerUser(userInfo: any) {
    console.log('testing');

    return this.httpClient.post(`${environment.API_URL}/addStudent`, userInfo);
  }
}