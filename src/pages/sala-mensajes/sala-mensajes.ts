import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';
/**
 * Generated class for the SalaMensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sala-mensajes',
  templateUrl: 'sala-mensajes.html',
})
export class SalaMensajesPage {
//difino los atributos
coleccionTipadaFirebase:AngularFirestoreCollection<chat>;
ListadoDeChatsObservable:Observable<chat[]>;
mostrarSpinner:boolean;


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


}
