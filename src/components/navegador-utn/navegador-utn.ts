import { Component ,Input} from '@angular/core';

/**
 * Generated class for the NavegadorUtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navegador-utn',
  templateUrl: 'navegador-utn.html'
})
export class NavegadorUtnComponent {
	@Input() titulo;
	@Input()mostrarToggle;

  constructor() {
    console.log('Hello NavegadorUtnComponent Component');
    this.titulo = 'UTN-FRA';
    this.mostrarToggle=false;
  }

}
