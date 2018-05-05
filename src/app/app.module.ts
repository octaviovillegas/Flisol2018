import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { SalaMensajesPage } from '../pages/sala-mensajes/sala-mensajes';
import { IngresoPage } from '../pages/ingreso/ingreso';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TiempoDesdeAhoraPipe} from '../pipes/tiempo-desde-ahora/tiempo-desde-ahora';

import {NavegadorUtnComponent} from '../components/navegador-utn/navegador-utn';

@NgModule({
  declarations: [
  TiempoDesdeAhoraPipe,
    MyApp,
    HomePage,
    ListPage,
    SalaMensajesPage,
    IngresoPage,
    NavegadorUtnComponent
  ],
  exports:[
    NavegadorUtnComponent
  ],
  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),// <=
    AngularFirestoreModule //<=
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage ,
    SalaMensajesPage,
    IngresoPage,
    NavegadorUtnComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
