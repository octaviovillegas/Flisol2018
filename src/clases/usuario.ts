export class Usuario{

  nombre:string;
  clave:string;
  id:string;
  foto:string;
  estado:string;
  perfil:string;

  constructor(nombre:string, clave:string,id:string,foto:string){
    this.nombre=nombre;
    this.clave=clave;
     this.id=id;
     this.foto=foto;
  }

  dameJSON(){
    return JSON.parse( JSON.stringify(this));
  }
}