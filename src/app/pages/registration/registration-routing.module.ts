import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationPage } from './registration.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}
