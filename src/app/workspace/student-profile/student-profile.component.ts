import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../shared/services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { Student } from '../../shared/models/student.model';
import { Degree } from '../../shared/models/degree.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private slService: StudentService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegistrationService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  studentId: any;
  studentInfo: Student;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
      this.registrationService.getStudentbyId(this.studentId).subscribe({
        next: (response) => {
          if (response) {
            this.studentInfo = response;
          }
        },
        error: (err) => {},
      });
    });
  }

  editStudent(id: any) {
    // this.studentService.editStudent(id);
    this.router.navigate([`/edit/${id}`]);
  }
  formatDate(dateString: string) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return this.datePipe.transform(date, 'E, d MMM, y', 'en-US');
  }
}
