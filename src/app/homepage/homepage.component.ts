import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  inputSearch:string='';
  genre:string='';
  year:number=0;

  movie : Movie;
  
  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    
  }
  ngOnButtonClick(){
    this.movie=new Movie();
    this.movie.inputSearch=this.inputSearch;
    this.movie.genre=this.genre;
    this.movie.year=this.year;
    console.log(this.movie);

    this.movieService.showMovie(this.movie);

  }

  
  

  
  // sendparam(){
  //   var movieInput=(<HTMLInputElement>document.getElementById("inputSearch")).value;
  //   var genre=(<HTMLInputElement>document.getElementById("selectGenre")).value;
  //   var year:number=document.getElementById("selectYear");
  //   var myMovie : Movie= new Movie (movieInput,genre,year);

  //   this.moviService.showMovie(myMovie);
  // }
  
}
