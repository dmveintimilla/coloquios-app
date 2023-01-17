import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentesModule } from '../../../app/componentes/componentes.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentesModule,
    NgxQRCodeModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
