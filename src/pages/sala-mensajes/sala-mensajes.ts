import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { chat } from '../../clases/chat';
import { AlertController } from 'ionic-angular';
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
coleccionTipadaFirebase:AngularFirestoreCollection<chat>;
    ListadoDeChatsObservable:Observable<chat[]>;
  mostrarSpinner:any;

  constructor(public VentanaAlert:AlertController, private objFirebase: AngularFirestore) {
    this.mostrarSpinner=true;

  }
  ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection<chat>('chatTest', ref=> ref.orderBy('tiempo','desc'));
    this.ListadoDeChatsObservable=this.coleccionTipadaFirebase.valueChanges();
  this.ListadoDeChatsObservable.subscribe(x => {
        console.info("conexión correcta con Firebase",x);
      this.mostrarSpinner=false;
    })
     console.log("fin de ionViewDidEnter");

  }

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

  agregarMensaje(mensaje:string)
  {
     let nuevoMensaje:chat;
     nuevoMensaje= new chat(mensaje);     
     let objetoJsonGenerico= nuevoMensaje.dameJSON();
     console.log (objetoJsonGenerico );
      //this.objFirebase.collection<chat>('chatTest').add({mensaje:nuevoMensaje.mensaje,usuario:nuevoMensaje.usuario,tiempo:Date()}).then(
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

}
