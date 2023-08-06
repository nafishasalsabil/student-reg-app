import { EventEmitter, Injectable } from "@angular/core";
import { Student } from "./shared/student.model";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
@Injectable()
export class StudentService{
  studentsChanged = new Subject<Student[]>();
  student:any;
    private students: Student[] = [
      
      // {
      //   firstname:'zahir',
      //   lastname:'shozib',
      //   email:'abc@gmail.com',
      //   dob:'7/9/23',
      //   board:'dhaka',
      //   contact:'016756584983',
      //   address:'afsgsgs',

    
      // }
        //new Student('Zahir','shozib','m00@gmail.com','gsgs','eaaaa','fagag','gaggag','4.00','5.00'),
      //  new Student('shozib','zsd','m00@gmail.com','gsgs','eaaaa','fagag','gaggag','4.00','2.00')
      
    ];

    constructor() {}

      getStudentlist(){
        return this.students;
      }      

      addStudent(student:any){
        this.students.push(student)
        this.studentsChanged.next(this.students)

      }



}