import { Injectable } from '@angular/core';
import {Movie} from './movie'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }
  
  showMovie(movie:Movie){
    console.log("Kriterijumi za pretragu su: \n Unos: "+movie.inputSearch+"\n Zanr: "+movie.genre+"\n Godina: "+movie.year);
  }
}
