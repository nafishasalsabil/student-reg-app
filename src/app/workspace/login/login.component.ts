import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  loggedIn: boolean;
  show: boolean;
  autohide = true;
  user: any;
  isLoading:boolean;

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    // this.loggedIn = false;
    // this.studentService.getLogin(false);
  }

  onSubmit() {
    console.log('Hello');
    this.isLoading = true;
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', data);
        this.loginService.getRole(data).subscribe({
          next: (role) => {
            this.user = role;
            this.isLoading = false;
            // console.log(this.user[0].authority);
            localStorage.setItem('role', this.user[0].authority);
            this.loginService.setLogin(this.user[0].authority);

            if (this.user[0].authority == 'Admin') {
              this.router.navigate(['/students']);
            } else if (this.user[0].authority == 'Student') {
              this.loginService.getId().subscribe({
                next: (id) => {
                  console.log(id);
                  // localStorage.setItem('role', this.user[0].authority);
                  this.router.navigate([`/profile/${id}`]);
                },
              });
            }
          },
          error: (err) => {
            // this.router.navigate(["/students"]);
          },
        });
      },
      error: (err) => {
        console.log('NOOOOOOOOOO');
        this.show = true;
      },
    });
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
