import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SetColoquiosComponent } from './set-coloquios/set-coloquios.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SetColoquiosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class BackendModule { }
