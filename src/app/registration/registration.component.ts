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
import { RegistrationService } from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Degree } from '../shared/degree.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
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
  sscSelected: Degree[];
  hscSelected: Degree[];
  studentId: any;
  constructor(
    private sLService: StudentService,
    private registrationService: RegistrationService,
    private httpclient: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    

    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
     
    });
    this.registrationService.getStudentbyId(this.studentId).subscribe(
      {
        next:(response)=>{
          this.editmode = true;
          this.student = response;
          console.log(response);
        }
      }
    )
    this.initRegistrationForm(this.student);
    this.getGrades();
    this.getHscSubject();
    this.getSscSubject();

  }

  initRegistrationForm(data:Student) {
    this.signUpForm = this.formbuilder.group({
      firstName: [data? data.firstName:'', Validators.required],
      lastName: [data? data.lastName:'', Validators.required],
      email: [data? data.email:'', [Validators.required, Validators.email]],
      dob: [data? data.dob:'', Validators.required],
      board: [data? data.board:'', Validators.required],
      contact: [data? data.contact:'', Validators.required],
      address: [data? data.address:'', Validators.required],
      password: [data? data.password:'', Validators.required],
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

    
    this.sscSelected = data? data.ssc:[{subject:'',gpa:''}];
    this.hscSelected = data? data.hsc:[{subject:'',gpa:''}];
    const sscFormArray = this.signUpForm.get('ssc') as FormArray;
    const hscFormArray = this.signUpForm.get('hsc') as FormArray;

    this.sscSelected.forEach((item) => {
      const sscFormGroup = this.formbuilder.group({
        subject: [item? item.subject:'', Validators.required],
        gpa: [item? item.gpa:'', Validators.required],
      });

      sscFormArray.push(sscFormGroup);
    });

    this.hscSelected.forEach((item) => {
      const hscFormGroup = this.formbuilder.group({
        subject: [item? item.subject:'', Validators.required],
        gpa: [item? item.gpa:'', Validators.required],
      });
      hscFormArray.push(hscFormGroup);
    });
  

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
    console.log('onsubmit');

    if (this.editmode) {
      this.registrationService
        .editStudent(this.signUpForm.value, this.student.id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/students']);
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
}
