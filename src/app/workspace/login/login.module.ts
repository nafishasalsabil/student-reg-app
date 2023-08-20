import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "src/app/shared/components/loader/loader.component";
const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    }
  ];
@NgModule({
    declarations:[
        LoginComponent,
        LoaderComponent
    ],
    exports:[
        LoginComponent,
        LoaderComponent
    ],
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),

    ]
})

export class LoginModule{

}