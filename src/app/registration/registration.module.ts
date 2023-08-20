import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];
@NgModule({
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent],
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class RegistrationModule {}
