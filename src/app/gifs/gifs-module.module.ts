import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPagesComponent } from './gifs-pages/gifs-pages.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [GifsPagesComponent, BusquedaComponent, ResultadosComponent],
  imports: [
    CommonModule
  ],
  exports:[
    GifsPagesComponent
  ]
})
export class GifsModule { }
