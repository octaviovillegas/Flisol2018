import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngresoPage } from './ingreso';

@NgModule({
  declarations: [
    IngresoPage,
  ],
  imports: [
    IonicPageModule.forChild(IngresoPage),
  ],
})
export class IngresoPageModule {}
