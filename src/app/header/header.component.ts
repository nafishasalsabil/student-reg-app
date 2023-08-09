import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  showLogin:boolean;
  showReg:boolean;
  loggedIn:boolean;
  
  constructor(private router:Router){}
  login:boolean;
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.login = this.studentService.getLogin();
    // console.log(this.login);
    // this.loggedIn=false;
    
    console.log(localStorage.getItem('token'));
    this.router.events.subscribe(
      (val)=>{
        if(val instanceof NavigationEnd){
          // console.log(val.url);
          // console.log(this.showMe);
          if(localStorage.getItem('token')){
            this.showLogin=false;
            this.showReg = false;
            this.loggedIn = true;
          }
          else{
            this.showLogin=true;
            this.showReg = true;
            this.loggedIn = false;
          }
          
          
          // if(val.url=='/students'){
          //   this.showLogin=false;
          //   this.showReg = false;
          //   this.loggedIn = true;
          // }
          // else if(val.url=='/login'){
          //   this.showLogin = true;
          //   this.showReg = true;
          //   this.loggedIn = false;
          //   // console.log(this.showMe);
          // }
          // else if(val.url=='/register' && this.loggedIn == true){
          //   this.showLogin=false;
          //   this.showReg = false;
          //   // console.log(this.showMe);
          // }
          // else if(val.url=='/register' && this.loggedIn == false){
          //   this.showLogin = true;
          //   this.showReg = true;
          // }
        }
        
      }
    )

    
  }
  logout(){
    // console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    // console.log(localStorage.getItem('token'));
    this.router.navigate(["/login"]);
    // this.showLogin = true;
    // this.showReg = true;
    // this.loggedIn = false;
  }
  
  

}
