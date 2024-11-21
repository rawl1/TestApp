import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresorecetasPage } from './ingresorecetas.page';

const routes: Routes = [
  {
    path: '',
    component: IngresorecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresorecetasPageRoutingModule {}
