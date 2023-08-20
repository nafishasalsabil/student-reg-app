import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile.component';
const routes: Routes = [
  {
    path: '',
    component: StudentProfileComponent,
  },
];
@NgModule({
  declarations: [StudentProfileComponent],
  exports: [StudentProfileComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class StudentProfileModule {}
