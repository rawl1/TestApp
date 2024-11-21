import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresorecetasPageRoutingModule } from './ingresorecetas-routing.module';

import { IngresorecetasPage } from './ingresorecetas.page';  // Nombre correcto de la clase

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresorecetasPageRoutingModule
  ],
  declarations: [IngresorecetasPage]  // Nombre correcto de la clase
})
export class IngresorecetasPageModule {}
