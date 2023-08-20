import { Student } from '../../shared/models/student.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../shared/services/student/student.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-students-list-dashboard',
  templateUrl: './all-students-list-dashboard.component.html',
  styleUrls: ['./all-students-list-dashboard.component.scss'],
})
export class AllStudentsListDashboardComponent implements OnInit {
  // students: Student[];
  // studentsDetails:any;
  // private subscription: Subscription;
  studentList: Student[];
  constructor(
    private studentService: StudentService,
    private httpclient: HttpClient,
    private router: Router,
    private datePipe: DatePipe
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

  formatDate(dateString: string){
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return this.datePipe.transform(date, 'E, d MMM, y', 'en-US');
  }
}
