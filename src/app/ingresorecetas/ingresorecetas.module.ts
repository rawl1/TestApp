import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresorecetasPageRoutingModule } from './ingresorecetas-routing.module';

import { IngresorecetasPage } from './ingresorecetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresorecetasPageRoutingModule
  ],
  declarations: [IngresorecetasPage]
})
export class IngresorecetasPageModule {}
