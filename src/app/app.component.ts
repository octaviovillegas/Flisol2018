import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { SalaMensajesPage } from '../pages/sala-mensajes/sala-mensajes';
import { IngresoPage } from '../pages/ingreso/ingreso';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pagesApp: Array<{title: string, component: any}>;
  pagesUser: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pagesApp = [
      { title: 'Inicio', component: HomePage },
      { title: 'Listado', component: ListPage },
      { title: 'Ingreso', component: IngresoPage },
      { title: 'Mensajes', component: SalaMensajesPage },
      { title: 'Funciones', component: SalaMensajesPage }
    ];
    this.pagesUser = [
      { title: 'Perfil', component: HomePage },
      { title: 'Notificaciones', component: ListPage },
      { title: 'Preferencias', component: IngresoPage },
      { title: 'Agenda', component: IngresoPage },
      { title: 'Tareas', component: IngresoPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
