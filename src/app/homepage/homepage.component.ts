import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MovieDetails } from '../movieDetails';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  inputSearch: string = '';
  type: string = '';
  year: number;
  movie_id: string;

  // Title: string='';
  // Type:string='';
  // Year:number=0;
  // Poster:string='';
  // Genre: string='';
  // Runtime: string='';
  // Actors: string='';
  // Director: string='';
 
  totalMovies: number;
  moviesFoundMessage: string;

  movie: Movie;
  movies: any[] = [];

  movieDetails:MovieDetails;
  //API_KEY:'34fb9a13';
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  ngOnButtonClick() {
    this.movie = new Movie();
    this.movie.inputSearch = this.inputSearch;
    this.movie.type = this.type;
    this.movie.year = this.year;
    //console.log(this.movie); 
    //this.movieService.showMovie(this.movie);
  }

  async getMovieByInput() {
    this.ngOnButtonClick();

    const find = await this.movieService.getMovieByTitle(this.movie);
    console.log(find);
    this.movies = find.Search;
    //ukoliko nema postera prikazi alternativni
    this.movies.forEach(function (movie) {
      if (movie.Poster == "N/A") {
        movie.Poster = "../../assets/no-poster.jpg";
      }
    });
    //console.log(this.movies);
    //console.log('homepage --> ', find);

    //prikazi ukupan broj pronadjenih filmova
    this.totalMovies = find.totalResults;
    if (this.totalMovies === undefined) {
      this.moviesFoundMessage = " The film was not found";
    } else if (this.totalMovies == 1) {
      this.moviesFoundMessage = " YIFY Movie found";
    } else this.moviesFoundMessage = " YIFY Movies found";
  }
  
  async getMovieDetails(movie_id:string){
    // this.movieDetails=new MovieDetails();
    // this.movieDetails.Title=this.Title;
    // this.movieDetails.Type=this.Type;
    // this.movieDetails.Year=this.Year;
    // this.movieDetails.Poster=this.Poster;
    // this.movieDetails.Genre=this.Genre;
    // this.movieDetails.Runtime=this.Runtime;
    // this.movieDetails.Actors=this.Actors;
    // this.movieDetails.Director=this.Director;

    const find_movie = await this.movieService.getMovieById(movie_id);
    this.movieDetails=find_movie;
    //console.log(find_movie);
    console.log(this.movieDetails);
    //slanje detalja odabranog filma drugoj Sibling komponenti
    this.movieService.emit<MovieDetails>(this.movieDetails);
  }  

}
