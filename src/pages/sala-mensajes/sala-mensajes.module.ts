import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaMensajesPage } from './sala-mensajes';

@NgModule({
  declarations: [
    SalaMensajesPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaMensajesPage),
  ],
})
export class SalaMensajesPageModule {}
