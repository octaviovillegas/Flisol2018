
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