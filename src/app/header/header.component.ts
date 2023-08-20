import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showLogin: boolean;
  showReg: boolean;
  admin: boolean;
  student: boolean;
  loggedIn: boolean = false;
  showDashboard: boolean;
  role: any;

  constructor(private router: Router, private loginservice: LoginService) {}
  login: boolean;

  ngOnInit(): void {
    // this.loggedIn = this.loginservice.getLoginStatus();
    // this.role = this.loginservice.getRoleStatus();
    // this.loginservice.loginStatusChanged.subscribe((status) => {
    //   this.loggedIn = status;
    //   console.log(this.role);

    // });
    // // throw new Error('Method not implemented.');
    // // this.login = this.studentService.getLogin();
    // // console.log(this.login);
    // // this.loggedIn=false;

    // console.log(localStorage.getItem('token'));
    // // if(localStorage.getItem('token')){
    // //   this.loggedIn = true;
    // //   console.log("QQQQQQQQQQQQQQQQQQQQQQ");

    // // }

    // this.role = localStorage.getItem('role');
    // console.log("Hi-----------------",this.role);

    // this.router.events.subscribe(
    //   (val)=>{
    //     if(val instanceof NavigationEnd){
    //       // console.log(val.url);
    //       // console.log(this.showMe);
    //       console.log(this.role);
    //       if(localStorage.getItem('token') && this.role=='Admin'){
    //         // this.showLogin=false;
    //         // this.showReg = false;
    //         // this.showDashboard = true;
    //          this.loggedIn = true;
    //         console.log(this.loggedIn +" for "+this.role);

    //       }
    //       else  if(localStorage.getItem('token') && this.role=='Student'){
    //         // this.showLogin=false;
    //         // this.showReg = false;
    //         // this.showDashboard = false;
    //         this.loggedIn = true;
    //         console.log(this.loggedIn +" for "+this.role);

    //       }
    //       else{
    //         // this.showLogin=true;
    //         // this.showReg = true;
    //         // this.showDashboard = false;
    //         this.loggedIn = false;
    //       }

    //     }

    //   }
    // )
    this.router.events.subscribe((val) => {
      console.log(localStorage.getItem('role'));

      if (localStorage.getItem('token')) {
        this.loggedIn = true;
        this.admin = true;
      }
    });
  }
  logout() {
    // console.log(localStorage.getItem('token'));
    this.loggedIn = false;

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('role'));
    this.router.navigate(['/login']);
    // this.showLogin = true;
    // this.showReg = true;
    // this.loggedIn = false;
  }
}
