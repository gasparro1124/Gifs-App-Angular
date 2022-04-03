import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse,Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey :string = 'atFMGTMxkyuWsDMpje5Md05pLkbuPQMW'
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
    private _historia: string[] = []


    public resultados: Gif[] = []

    get historial(){
      return[...this._historia]
    }

    constructor( private http: HttpClient ){

      if(localStorage.getItem('historial')){
        this._historia = JSON.parse(localStorage.getItem('historial')!) || []
      }
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []

    }

    buscarGifs(query:string){

      query = query.trim().toLowerCase();

      if( !this._historia.includes(query)){
        this._historia.unshift(query)
        this._historia = this._historia.splice(0,10)

        localStorage.setItem('historial',JSON.stringify(this._historia))
      }

      const params = new HttpParams().set('api_key', this.apiKey).set('limit','10').set('q',query);
      console.log(params.toString())

      this.http.get<SearchGifsResponse >(`${this.servicioUrl}/search`,{ params })
        .subscribe( (resp) =>{
          this.resultados = resp.data
          localStorage.setItem('resultados',JSON.stringify(this.resultados))
        })

      // fetch('https://api.giphy.com/v1/gifs/search?api_key=atFMGTMxkyuWsDMpje5Md05pLkbuPQMW&q=dragon ball z&limit=10')
      //   .then(resp =>{
      //     resp.json().then(data => {
      //       console.log(data)
      //     })
      // })
    }
}
