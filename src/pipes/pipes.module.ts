import { NgModule } from '@angular/core';
import { TiempoDesdeAhoraPipe } from './tiempo-desde-ahora/tiempo-desde-ahora';
@NgModule({
	declarations: [TiempoDesdeAhoraPipe],
	imports: [],
	exports: [TiempoDesdeAhoraPipe]
})
export class PipesModule {}
