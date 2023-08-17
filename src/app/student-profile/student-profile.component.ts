import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { Student } from '../shared/student.model';
import { Degree } from '../shared/degree.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private slService: StudentService,
    private activatedRoute: ActivatedRoute,
    private registrationService: RegistrationService,
    private router:Router
  ) {}

  studentId: any;
  studentInfo: Student;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
      this.registrationService.getStudentbyId(this.studentId).subscribe({
        next: (response) => {
          if(response){
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
}
