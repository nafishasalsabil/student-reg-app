import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AllStudentsListDashboardComponent } from './all-students-list-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  {
    path: '',
    component: AllStudentsListDashboardComponent,
  },
];
@NgModule({
  declarations: [AllStudentsListDashboardComponent],
  exports: [AllStudentsListDashboardComponent],
  imports: [CommonModule, HttpClientModule,RouterModule.forChild(routes)],
})
export class AllStudentsListDashboardModule {}
