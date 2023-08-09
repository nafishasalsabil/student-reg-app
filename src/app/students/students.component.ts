import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../shared/student.model';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  // students: Student[];
  // studentsDetails:any;
  // private subscription: Subscription;
 studentList:Student[];
  constructor(private studentService:StudentService,
    private httpclient: HttpClient,) { }
  
  ngOnInit(): void {
 

  //  this.studentList= this.studentService.getStudentlist()
  // this.studentService.studentsChanged.subscribe({
  //   next:(response:Student[])=>{
  //  this.studentList=response;
  //  console.log(response);
   
  //   },
  //   error:(err)=>{

  //   }
  // })
 
    
  this.httpclient.get<any>('http://localhost:9191/students').subscribe({
    next: (response:Student[]) => {
      this.studentList=response;
       console.log(response);
    },
  });  
  }
 
}
