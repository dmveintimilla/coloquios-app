import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColoquioComponent } from './coloquio/coloquio.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ColoquioComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ColoquioComponent,
  ]
  
})
export class ComponentesModule { }
