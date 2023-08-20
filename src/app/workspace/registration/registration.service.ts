import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  registerUser(userInfo: any) {
    return this.httpClient.post(`${environment.API_URL}/addStudent`, userInfo);
  }

  getGrades() {
    return this.httpClient.get<any>(`${environment.API_URL}/Grades`);
  }

  getSSCSubjects() {
    return this.httpClient.get<any>(`${environment.API_URL}/SSCSubjects`);
  }

  getHSCSubjects() {
    return this.httpClient.get<any>(`${environment.API_URL}/HSCSubjects`);
  }

  getStudentbyId(id: any) {
    return this.httpClient.get<any>(`${environment.API_URL}/student/${id}`);
  }
  editStudent(userInfo: any, id: any) {
    return this.httpClient.put(`${environment.API_URL}/update/${id}`, userInfo);
  }
}
