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
			minutos	="0"+minutos;
		if(segundos<10)
			segundos="0"+segundos;

		mensaje=mensaje+horas+":"+minutos+":"+segundos;
	} else{
		mensaje	="Recien ";
	}  
    return mensaje;
  }
}
