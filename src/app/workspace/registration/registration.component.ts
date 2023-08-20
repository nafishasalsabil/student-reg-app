import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Student } from '../../shared/models/student.model';
import { StudentService } from '../../shared/services/student/student.service';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Degree } from '../../shared/models/degree.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  signUpForm: FormGroup;
  ssc: FormGroup;
  grades: String[];
  sscSubjects: String[];
  hscSubjects: String[];
  submitted = false;
  students: Student[];
  student: Student;
  editmode: boolean;
  hscSelected: Degree[];
  studentId: any;
  constructor(
    private sLService: StudentService,
    private registrationService: RegistrationService,
    private httpclient: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initRegistrationForm();
  }

  get sscFromControl(): FormArray {
    return this.signUpForm.get('ssc') as FormArray;
  }

  get formDataHSC() {
    return <FormArray>this.signUpForm.get('hsc');
  }

  ngOnInit(): void {
    this.initRegistrationForm();

    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
      if (!!this.studentId) {
        this.registrationService.getStudentbyId(this.studentId).subscribe({
          next: (response) => {
            this.editmode = true;
            this.student = response;
            this.initRegistrationForm(response);
            console.log('getStudentbyId:: ', response);
          },
        });
      }
    });

    /// DATA ???

    this.getGrades();
    this.getHscSubject();
    this.getSscSubject();
  }

  initRegistrationForm(data?: Student) {
    console.log('Form Value: ', data);

    this.signUpForm = this.formbuilder.group({
      firstName: [data?.firstName, Validators.required],
      lastName: [data?.lastName, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      dob: [data?.dob, Validators.required],
      board: [data ? data.board : '', Validators.required],
      contact: [data?.contact, Validators.required],
      address: [data?.address, Validators.required],

      ssc: this.formbuilder.array([]),
      hsc: this.formbuilder.array([]),
      // ssc: this.formbuilder.array([
      //   this.formbuilder.group({
      //     subject: ['', Validators.required],
      //     gpa: ['', Validators.required],
      //   }),
      // ]),
      // hsc: this.formbuilder.array([
      //   this.formbuilder.group({
      //     subject: ['', Validators.required],
      //     gpa: ['', Validators.required],
      //   }),
      // ]),
    });

    // const hscFormArray = this.signUpForm.get('hsc') as FormArray;

    if (data?.ssc?.length) {
      data.ssc.forEach((item) => {
        const sscFormGroup = this.formbuilder.group({
          subject: [item?.subject, Validators.required],
          gpa: [item?.gpa, Validators.required],
        });

        this.sscFromControl.push(sscFormGroup);
      });
    } else {
      this.onAddSubjectOfSSC();
    }

    if (data?.hsc?.length) {
      data.hsc.forEach((item) => {
        const hscFormGroup = this.formbuilder.group({
          subject: [item?.subject, Validators.required],
          gpa: [item?.gpa, Validators.required],
        });

        this.formDataHSC.push(hscFormGroup);
      });
    } else {
      this.onAddSubjectOfHSC();
    }

    // this.hscSelected.forEach((item) => {
    //   const hscFormGroup = this.formbuilder.group({
    //     subject: [item? item.subject:'', Validators.required],
    //     gpa: [item? item.gpa:'', Validators.required],
    //   });
    //   hscFormArray.push(hscFormGroup);
    // });
  }

  getGrades() {
    this.registrationService.getGrades().subscribe({
      next: (response) => {
        this.grades = response;
        console.log(this.grades);
      },
    });
  }

  getSscSubject() {
    this.registrationService.getSSCSubjects().subscribe({
      next: (response) => {
        this.sscSubjects = response;
        console.log(this.sscSubjects);
      },
    });
  }

  getHscSubject() {
    this.registrationService.getHSCSubjects().subscribe({
      next: (response) => {
        this.hscSubjects = response;
        console.log(this.hscSubjects);
      },
    });
  }

  // selectedSSCSub = '';
  //onSelected(value: string, index: any): void {
  //   this.selectedSSCSub = value;
  //   console.log(this.selectedSSCSub);

  //   // if(index!=0 && index>index-1){
  //   //     const subject=this.sscSubjects.findIndex(item=>{
  //   // return item===value})
  //   //   this.sscSubjects = this.sscSubjects.filter(s=>s!=value);
  //   // }

  //   // const subject=this.sscSubjects.findIndex(item=>{
  //   //   return item===value})
  //   //     this.sscSubjects.splice(subject, 1)
  // }
  onSubmit() {
    this.submitted = true;
    console.log(this.signUpForm.valid, this.signUpForm.value);

    if (this.editmode) {
      this.registrationService
        .editStudent(this.signUpForm.value, this.student.id)
        .subscribe({
          next: (data) => {
            console.log(data);
            if (localStorage.getItem('role') == 'Admin') {
              this.router.navigate(['/students']);
            } else {
              this.router.navigate([`/profile/${this.student.id}`]);
            }
          },
        });
    } else {
      this.registrationService.registerUser(this.signUpForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.sLService.addStudent(this.signUpForm.value);
          localStorage.setItem(
            'student',
            JSON.stringify(this.signUpForm.value)
          );
          if (localStorage.getItem('token')) {
            this.router.navigate(['/students']);
          } else {
            this.router.navigate(['/login']);
          }

          this.signUpForm.reset();
        },
      });
    }
  }

  onAddSubjectOfSSC() {
    this.sscFromControl.push(
      this.formbuilder.group({
        subject: ['', Validators.required],
        gpa: ['', Validators.required],
      })
    );
    console.log('added');
  }

  onAddSubjectOfHSC() {
    const control = <FormArray>this.signUpForm.controls['hsc'];
    control.push(
      this.formbuilder.group({
        subject: ['', Validators.required],
        gpa: ['', Validators.required],
      })
    );
    console.log('added');
  }

  removeSSC(index: any) {
    this.sscFromControl.removeAt(index);
  }
  removeHSC(index: any) {
    const control = <FormArray>this.signUpForm.controls['hsc'];
    control.removeAt(index);
  }
}
