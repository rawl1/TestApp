import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login0Page } from './login0.page';

const routes: Routes = [
  {
    path: '',
    component: Login0Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Login0PageRoutingModule {}
