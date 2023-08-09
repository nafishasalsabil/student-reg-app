import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Student } from '../shared/student.model';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from './registrationService/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  signUpForm: FormGroup;
  ssc: FormGroup;

  grades: String[];
  sscSubjects: String[];
  hscSubjects: String[];

  submitted = false;
  students: Student[];
  constructor(
    private sLService: StudentService,
    private registrationService: RegistrationService,
    private httpclient: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      board: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      ssc: this.formbuilder.array([
        this.formbuilder.group({
          subject: ['', Validators.required],
          gpa: ['', Validators.required],
        }),
      ]),
      hsc: this.formbuilder.array([
        this.formbuilder.group({
          subject: ['', Validators.required],
          gpa: ['', Validators.required],
        }),
      ]),
    });

    this.httpclient.get<any>('http://localhost:9191/Grades').subscribe({
      next: (response) => {
        this.grades = response;
        console.log(this.grades);
      },
    });

    this.httpclient.get<any>('http://localhost:9191/SSCSubjects').subscribe({
      next: (response) => {
        this.sscSubjects = response;
        console.log(this.sscSubjects);
      },
    });

    this.httpclient.get<any>('http://localhost:9191/HSCSubjects').subscribe({
      next: (response) => {
        this.hscSubjects = response;
        console.log(this.hscSubjects);
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('onsubmit');

    this.registrationService.registerUser(this.signUpForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
    });

    this.sLService.addStudent(this.signUpForm.value);
    localStorage.setItem('student', JSON.stringify(this.signUpForm.value));
    if(localStorage.getItem('token')){
      this.router.navigate(['/students']);
    }
    else{
      this.router.navigate(['/login']);
    }
    

    this.signUpForm.reset();
  }
  // onAddToList() {
  //   this.sLService.addStudent(this.signUpForm.value);
  //   localStorage.setItem('student', JSON.stringify(this.signUpForm.value));
  //   this.router.navigate(['/students']);
  // }

  onAddSubjectOfSSC() {
    const control = <FormArray>this.signUpForm.controls['ssc'];
    control.push(
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
    const control = <FormArray>this.signUpForm.controls['ssc'];
    control.removeAt(index);
  }
  removeHSC(index: any) {
    const control = <FormArray>this.signUpForm.controls['hsc'];
    control.removeAt(index);
  }

  get formDataSSC() {
    return <FormArray>this.signUpForm.get('ssc');
  }
  get formDataHSC() {
    return <FormArray>this.signUpForm.get('hsc');
  }

  // getVal(id:any){

  //   let sel = document.getElementById(id);

  //   console.log(sel);
  // }
}
