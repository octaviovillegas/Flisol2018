FRISoL 2018 UTN FRA

#14º Festival Latinoamericano de Instalación de Software Libre el 28 de abril 2018 

========================================
Aplicaciones Híbridas 
========================================
Prof. Octavio villegas  

##Objetivo
El objetivo de esta taller es la instalación del software libre necesario para desarrollar una aplicacion híbrida, que se conecte con un servidor de tiempo real en la web 

## Instalación
Vamos a necesitar instalar el siguiente sortware libre.

A. nodejs
```
https://nodejs.org/es/
```
B. Ionic cordova https://ionicframework.com/docs/intro/installation/
```
$ npm install -g ionic cordova
```
## Inicio clonando el repositorio de github

1. Clonamos  :
```
git clone https://github.com/octaviovillegas/Flisol2018.git
```
2. Instalamos dependencias  dentro de la carpeta /Flisol2018:
```
npm install
```
si hay error...
en el archivo en node_module/angularfire2/ firebase.app.module.d.ts  del node modules, agregar la linea marcada

```
import { InjectionToken } from '@angular/core';
import { FirebaseAppConfig } from './';
import { FirebaseApp as FBApp } from '@firebase/app-types';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
export declare const FirebaseAppConfigToken: InjectionToken<FirebaseAppConfig>;
export declare class FirebaseApp implements FBApp {
    name: string;
    options: {};
    automaticDataCollectionEnabled: boolean; // <=esta linea
    auth: () => FirebaseAuth;
    database: () => FirebaseDatabase;
    messaging: () => FirebaseMessaging;
    storage: () => FirebaseStorage;
    delete: () => Promise<any>;
    firestore: () => FirebaseFirestore;
}
export declare function _firebaseAppFactory(config: FirebaseAppConfig, appName?: string): FirebaseApp;
```
3. Mostramos la aplicacion en el servidor:
```
ionic serve
```

## Inicio desde cero

1. iniciamos  :
```
ionic start
```
2. Instalamos en el proyecto firebase https://github.com/angular/angularfire2
```
npm install firebase@latest angularfire2@latest --save
```
3. en app.module.ts
```
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
 ```
si hay error...
en el archivo en node_module/angularfire2/ firebase.app.module.d.ts  del node modules, agregar la linea marcada

```
import { InjectionToken } from '@angular/core';
import { FirebaseAppConfig } from './';
import { FirebaseApp as FBApp } from '@firebase/app-types';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
export declare const FirebaseAppConfigToken: InjectionToken<FirebaseAppConfig>;
export declare class FirebaseApp implements FBApp {
    name: string;
    options: {};
    automaticDataCollectionEnabled: boolean; // <=esta linea
    auth: () => FirebaseAuth;
    database: () => FirebaseDatabase;
    messaging: () => FirebaseMessaging;
    storage: () => FirebaseStorage;
    delete: () => Promise<any>;
    firestore: () => FirebaseFirestore;
}
export declare function _firebaseAppFactory(config: FirebaseAppConfig, appName?: string): FirebaseApp;
```

4. creamos  el archivo environment.ts con las siguientes líneas
```

export const environment = {
      production: false,
      firebase: {
        apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        authDomain: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        databaseURL: 'https://ionic.firebaseio.com',
        projectId: 'aionic-64375',
        storageBucket: '',
        messagingSenderId: 'xxxxxxxxxxxxxxxxx'
      }
    };
```
adicional a esto  vamos y habilitamos la app en:
```
https://console.developers.google.com/projectselector/apis/enabled?pli=1
```
esto nos devuelve el storageBucket.
Por ultimo lo importamos en app.module.ts 
```
import { environment } from '../environments/environment';
```

5.  colocamos los imports en app.module.ts
```
imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  AngularFireModule.initializeApp(environment.firebase),// <=
  AngularFirestoreModule //<=
],
 ```


## Traer datos desde firebase
Vamos a tipar los datos para facilitar la tranferencia de informacion entre nuestra aplicacón y la base de datos.

1.  creo una clase para tipar los datos:
```
export class chat{
      usuario:string;
      mensaje: string;
      tiempo:string;
      id:string;

      constructor(mensaje:string){
        this.mensaje=mensaje;
        this.tiempo=Date();
        this.usuario="yo";
      }

      dameJSON(){
        return JSON.parse( JSON.stringify(this));
      }
    }
```
2.Creo el page donde voy a mostrar los datos:
```
 ionic g page salaChat
```
3. Lo incluimos en el app.module.ts:
Hacemos el import
```
import { SalaChatPage } from '../pages/sala-chat/sala-chat';//<= aca
```
y lo incluimos en el @NgModule
```
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SalaChatPage//<= aca
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SalaChatPage //<= aca
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

```



4. En el page.ts:
Hacemos el import
```
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';
```
Completamos el componente ...
```
//difino los atributos
coleccionTipadaFirebase:AngularFirestoreCollection<chat>;
ListadoDeChatsObservable:Observable<chat[]>;
mostrarSpinner:bool;


// en el constructor instancio el objeto AngularFireStore
constructor(private objFirebase: AngularFirestore) {   
     this.mostrarSpinner=true;
}

//enlazo los datos con firebase 
ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection<chat>('chatTest', ref=> ref.orderBy('tiempo')); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeChatsObservable.subscribe(x => {
        console.info("conexión correcta con Firebase",x);
         this.mostrarSpinner=false;
    })
     console.log("fin de ionViewDidEnter");
}//fin ionViewDidEnter

```


5. En el page.HTML:
```
<ion-content padding>
    <ion-list>
        <ion-item *ngFor="let chat of ListadoDeChatsObservable  | async;let i = index">
            {{i}}-{{chat.usuario }} dice: {{chat.mensaje }} <sup> {{chat.tiempo }} </sup>
        </ion-item>
    </ion-list>
</ion-content>

<ion-spinner *ngIf="mostrarSpinner" name="dots"></ion-spinner>
```


 ## Agregar un nuevo mensaje,Subir datos a la WEB. 

1. Para la ventana emergente,en el page.ts:

Importamos el AlertController
```
import { AlertController } from 'ionic-angular';

```
Modificamos el constructor
```
constructor(public VentanaAlert:AlertController, private objFirebase: AngularFirestore) {
this.mostrarSpinner=true;

} 
```

2. La función que agrega un mensaje a firebase.
En el page.ts:
Creo el método agregarMensaje.
```
agregarMensaje(mensaje:string)
{
   let nuevoMensaje:chat;
   nuevoMensaje= new chat(mensaje);     
   let objetoJsonGenerico= nuevoMensaje.dameJSON();
   console.log (objetoJsonGenerico );
   this.objFirebase.collection<chat>('chatTest').add(objetoJsonGenerico).then(
    Retorno=>
    {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
      console.log(`id= ${Retorno.id} ,  mensaje= ${mensaje}`);
    }
    ).catch( error=>{
      console.error(error);
    });
}


```
3. La función que pide un mensaje al usuario.
En el page.ts:
Creo el método nuevoMensaje.
```    
nuevoMensaje()
{
let prompt= this.VentanaAlert.create({
    title: "Nuevo mensaje",
    message:"ingrese un nuevo mensaje",
    inputs:[{
        name : 'mensaje',
        placeholder:' aqui va el mensaje...'
    }],
    buttons:[{
      text:'Cancelar'
      },{
      text:'Enviar',
      handler:data=>{
        this.agregarMensaje(data.mensaje);
      }
    }]
});
prompt.present();
}
```

 ## Habilitar la persistencia de datos. 

en el module.ts

Importamos el AlertController
```
 imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence() //<==

],

```

## Modificamos la UX por medio de PIPE. 

1. Creamos el PIPE
```
 ionic g pipe tiempoDesdeAhora

```

2. En app.module
lo importamos.
```
 import { TiempoDesdeAhoraPipe} from '../pipes/tiempo-desde-ahora/tiempo-desde-ahora';

```
lo incluimos en la declaracion.
```
declarations: [
  TiempoDesdeAhoraPipe,
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
```
3. Hacer el pipe

```
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TiempoDesdeAhoraPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tiempoDesdeAhora',
})
export class TiempoDesdeAhoraPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    
     //return value.toLowerCase();
    let ahora=Date.now();
    let antes= Date.parse(value);
    let milisegundo=ahora- antes;
    let segundos:any=Math.floor(milisegundo/1000);
    let minutos:any=0;
    let horas=0
    let dias=Math.floor(horas/24);
    let mensaje="hace: ";
    if(segundos>60)
    {
      minutos=Math.floor(segundos/60);
      segundos= segundos %minutos;
    

      if(minutos>60)
      {
        horas=Math.floor(minutos/60);
        minutos= minutos %horas;
      }     

    if(horas>24)
    {
      dias=Math.floor(horas/24);
        horas= horas %dias;
    }
    
    if(dias!=0)
    {
        mensaje=mensaje+dias+" días ";
    }else
    {
      mensaje="Hoy "+mensaje;
    }
    if(minutos<10)
      minutos ="0"+minutos;
    if(segundos<10)
      segundos="0"+segundos;

    mensaje=mensaje+horas+":"+minutos+":"+segundos;
  } else{
    mensaje ="Recien ";
  }  
    return mensaje;
  }
}

```
3. Usar el pipe

```
{{chat.tiempo| tiempoDesdeAhora  }}
```


## Estandarizar estilos con SASS. 


Archivos
```
  app.scss
  tupágina.scss
  variables.scss
```
1.En theme/variables.scss:
en este archivo podemos crear, modificar o importar varibles y funciones de  scss que van a modificar toda la aplicación.

2. Modificar variables:

  Aca estan nuestras variables
```
  https://ionicframework.com/docs/theming/overriding-ionic-variables/
```

modificamos los valores de algunas
```
$text-color:         blue !default;
$link-color:         color($colors, light) !default;
$toolbar-background: transparent !default;
```


3. Creamos variables:
```
https://ionicframework.com/docs/theming/sass-variables/
https://github.com/ionic-team/ionic/blob/master/src/themes/ionic.theme.default.scss
```
  ej:

```
$control-height: 40px;
```
Despúes la usamos así:

```
  .header {
    height: $control-height;
  }

  .sub-header {
    height: $control-height;
  }
```


4. Modificamos valores predeterminados de colores
```
https://ionicframework.com/docs/theming/theming-your-app/
```

Modificamos...
```
   $colors: (
    primary:    #488aff,
    secondary:  #32db64,
    danger:     #f53d3d,
    light:      #f4f4f4,
    dark:       #222,
    UTNFRA:   #00ffff,
    UTNFRACmp: (
        base:  #00ffff,
        contrast: white
      )
    );
```

 después la usamos así:
```
<button ion-fab mini color ="UTNFRA" (click)="nuevoUsuario($event)"><ion-icon name="add"  ></ion-icon></button>
```

o así en el archivo scss de cualquier componente
```
tupágina
  {
  background: color($colors, UTNFRACmp, base);
}
```