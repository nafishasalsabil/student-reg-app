  import { Component, OnInit, ViewChild } from '@angular/core';
  import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
  import { Student } from '../shared/student.model';
  import { StudentService } from '../student.service';

  @Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
  })
  export class FormComponent implements OnInit{
    signUpForm: FormGroup;
    ssc: FormGroup;

    submitted = false;
    students: Student[];
    constructor(private sLService: StudentService) { }
    ngOnInit(): void {
      
      this.signUpForm = new FormGroup({
        firstname:new FormControl(null,Validators.required),
        lastname:new FormControl(null,Validators.required),
        email:new FormControl(null,[Validators.required,Validators.email]),
        dob:new FormControl(null,Validators.required),
        board:new FormControl("",Validators.required),
        contact:new FormControl(null,Validators.required),
        address:new FormControl(null,Validators.required),
        ssc:new FormArray([
          new FormGroup({
            subject:new FormControl("",Validators.required),
            gpa:new FormControl("",Validators.required)
          })
        ]),
        hsc:new FormArray([
          new FormGroup({
            subject:new FormControl("",Validators.required),
            gpa:new FormControl("",Validators.required)
          })
        ])
        
      });
      // this.signUpForm.valueChanges.subscribe(
      //   (value)=>console.log(value)
      // )

      // this.sLService.studentAdded.subscribe((
      //   students:Student[])=>{
      //     this.submitted=true;
      //     this.students = students;
      //     console.log("studentssssss:",students);
      //     this.signUpForm.reset();
          
      //   });
    }

    onSubmit(){
      this.submitted=true;
      console.log(this.signUpForm);
      
      
      this.signUpForm.reset();
    }
    onAddToList()
    {
      // const firstname = this.signUpForm.get('userData.firstname')?.value;
      // const lastname = this.signUpForm.get('userData.lastname')?.value;
      // const email = this.signUpForm.get('userData.email')?.value;
      // const dob = this.signUpForm.get('userData.dob')?.value;
      // const board = this.signUpForm.get('userData.board')?.value;
      // const contact = this.signUpForm.get('userData.contact')?.value;
      // const address = this.signUpForm.get('userData.address')?.value;
      // const result1 = this.signUpForm.get('userData.result1')?.value;
      // const result2 = this.signUpForm.get('userData.result2')?.value;

      console.log(this.signUpForm.value);
      // console.log(this.signUpForm.get('ssc')?.value);

      this.sLService.addStudent(this.signUpForm.value);
      localStorage.setItem('student',JSON.stringify(this.signUpForm.value));
    }

    onAddSubjectOfSSC(){
      const control = <FormArray>this.signUpForm.controls['ssc'];
      control.push(
        new FormGroup(
          {subject:new FormControl("",Validators.required),
          gpa:new FormControl("",Validators.required)
        }
        )
      )
      console.log("added");
    }

    
    onAddSubjectOfHSC(){
      const control = <FormArray>this.signUpForm.controls['hsc'];
      control.push(
        new FormGroup(
          {subject:new FormControl("",Validators.required),
          gpa:new FormControl("",Validators.required)
        }
        )
      )
      console.log("added");
    }

    removeSSC(index:any){
      const control = <FormArray>this.signUpForm.controls['ssc'];
      control.removeAt(index);
    }
    removeHSC(index:any){
      const control = <FormArray>this.signUpForm.controls['hsc'];
      control.removeAt(index);
    }

    get formDataSSC() { return <FormArray>this.signUpForm.get('ssc'); }
    get formDataHSC() { return <FormArray>this.signUpForm.get('hsc'); }
  }


