import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Degree } from '../../models/degree.model';
import { Student } from '../../models/student.model';
import { environment } from 'environments/environment';
@Injectable()
export class StudentService {
  studentsChanged = new Subject<Student[]>();
  student: any;
  private students: Student[] = [
    // {
    //   firstName:'nafisha',
    //   lastName:'salsabil',
    //   email:'abc@gmail.com',
    //   dob:'12/2/2034',
    //   board:'Dhaka',
    //   contact:'01556384933',
    //   address:'mirpur',
    //   ssc:[{
    //     subject:'math',
    //     gpa:'4.77'
    //   }],
    //   hsc:[
    //     {
    //       subject:'math',
    //       gpa:'4.77'
    //     }
    //   ]
    // }
  ];

  constructor(private httpClient: HttpClient) {}

  getStudentlist() {
    return this.students;
  }

  addStudent(student: any) {
    this.students.push(student);
    this.studentsChanged.next(this.students);
  }

  showStudents() {
    return this.httpClient.get<any>(`${environment.API_URL}/students`);
  }

  deleteStudent(id: any) {
    return this.httpClient.delete(`${environment.API_URL}/delete/${id}`);
  }
  editStudent(id: any) {
    return id;
  }
  getStudent(){
    
  }
}
