  import { Component, OnInit, ViewChild} from '@angular/core';
  import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit{
    @ViewChild('f') loginForm: NgForm;
     loggedIn: boolean;
     show :boolean;
	   autohide = true;
    
    constructor(private router: Router, private loginService: LoginService){}
    ngOnInit(): void {
      // this.loggedIn = false;
      // this.studentService.getLogin(false);
    }
  
    
    onSubmit(){
      console.log("Hello");

      this.loginService.loginUser(this.loginForm.value).subscribe({
        next: (data) => {  
            console.log("Yayyyy");
            localStorage.setItem('token',data);
            this.router.navigate(["/students"]);
            
         
        },
          error:(err)=>{
            console.log("NOOOOOOOOOO");
            this.show =true;
            
            
          }
      })
      this.loginForm.reset();
      // this.studentService.getLogin(true);
      // this.router.navigate(["/students"]);
    }

    // showError() {
    //   this.loginService.show('Invalid username or password');
    // }
    // ngOnDestroy(): void {
    //   this.loginService.clear();
    // }

    // showT(){
    //   new bootstrap.Toast(document.querySelector('#basicToast')).show();
    // }
  }
