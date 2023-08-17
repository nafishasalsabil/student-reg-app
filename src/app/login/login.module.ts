import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    }
  ];
@NgModule({
    declarations:[
        LoginComponent
    ],
    exports:[
        LoginComponent
    ],
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),

    ]
})

export class LoginModule{

}