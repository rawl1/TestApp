import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Login0PageRoutingModule } from './login0-routing.module';

import { Login0Page } from './login0.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Login0PageRoutingModule
  ],
  declarations: [Login0Page]
})
export class Login0PageModule {}
