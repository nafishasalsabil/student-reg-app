import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { Degree } from "./shared/degree.model";
import { Student } from "./shared/student.model";
@Injectable()
export class StudentService{
  studentsChanged = new Subject<Student[]>();
  student:any;
    private students: Student[]=[
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
    ]
    
      
    constructor() {}

      getStudentlist(){
        return this.students;
      }      

      addStudent(student:any){
        this.students.push(student)
        this.studentsChanged.next(this.students)

      }
      // getLogin(status:boolean){
      //   return status;
      // }



}