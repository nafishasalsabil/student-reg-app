import { Student } from './../shared/student.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  // students: Student[];
  // studentsDetails:any;
  // private subscription: Subscription;
  studentList: Student[];
  constructor(
    private studentService: StudentService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.showStudents().subscribe({
      next: (response: Student[]) => {
        this.studentList = response;
        console.log(response);
      },
    });
  }

  deleteStudent(id: any) {
    console.log(id);

    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        const indexId = this.studentList.findIndex((item) => {
          return item.id === id;
        });
        this.studentList.splice(indexId, 1);
      },
    });
  }

  editStudent(id: any) {
    // this.studentService.editStudent(id);
    this.router.navigate([`/edit/${id}`]);
  }
}
