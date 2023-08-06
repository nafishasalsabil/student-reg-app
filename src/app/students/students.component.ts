import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../shared/student.model';
import { StudentService } from '../student.service';

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
  constructor(private studentService:StudentService) { }
  
  ngOnInit(): void {
 

   this.studentList= this.studentService.getStudentlist()
  this.studentService.studentsChanged.subscribe({
    next:(response:Student[])=>{
   this.studentList=response;
   console.log(response);
   
    },
    error:(err)=>{

    }
  })
 
    
      
  }
 
}
