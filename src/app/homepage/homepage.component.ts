import { Component, OnInit, Output } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MovieDetails } from '../movieDetails';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  inputSearch: string = "";
  type: string;
  year: number;
  movie_id: string;

  totalMovies: number;
  moviesFoundMessage: string;

  movie: Movie;
  movies: any[] = [];

  movieDetails: MovieDetails;
  //API_KEY:'34fb9a13';

  page: number = 1;
  count: number = 0;
  pageSize: number = 10;
  // pageSizes:any=[5,10,20];

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


    this.movie = JSON.parse(localStorage.getItem('myMovie')!);
    this.inputSearch = this.movie.inputSearch ? this.movie.inputSearch : "";//if exist
    this.type = this.movie.type ? this.movie.type : "";
    this.year = this.movie.year ? this.movie.year : 0;
    this.getMovieByInput();
    console.log(this.movie);


  }

  ngOnDestroy() {
    //localStorage.removeItem('lSinputSearch');
  }
  pageEvent(pageNumber: number): void {
    this.page = pageNumber;
    console.log(this.page);
    this.movie.page = pageNumber;
    this.getMovieByInput();
  }
  // onPageDataChange(event: any) {
  //   this.page = event;
  //   console.log(this.page);
  //   //this.movie.page=event;
  //   this.getMovieByInput();
  // }
  // onPageSizeChange(event:any): void{
  //   this.pageSize=event.target.value;
  //   this.page=1;
  //   this.getMovieByInput();  

  // }

  removeItem() {
    localStorage.removeItem('myMovie');
    this.inputSearch = "";
    this.type = "";
    this.year = 0;
    window.location.reload();
  }

  ngOnButtonClick() {
    this.movie = new Movie();
    this.movie.inputSearch = this.inputSearch;
    //localStorage.setItem('lSinputSearch', JSON.stringify(this.movie.inputSearch));
    this.movie.type = this.type;
    //localStorage.setItem('lStype', JSON.stringify(this.movie.type));
    this.movie.year = this.year;
    //localStorage.setItem('lSyear', JSON.stringify(this.movie.year));
    this.movie.page = this.page;
    //localStorage.setItem('lSpage', JSON.stringify(this.movie.page));
    localStorage.setItem('myMovie', JSON.stringify(this.movie));
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
    if (this.totalMovies <= 0) {
      this.moviesFoundMessage = " The film was not found";
    } else if (this.totalMovies == 1) {
      this.moviesFoundMessage = " YIFY Movie found";
    } else this.moviesFoundMessage = " YIFY Movies found";

    //count=totalItems
    this.count = this.totalMovies;
    //console.log(find.Search[this.getRandomInt(1,10)]);
    // let movie1: Movie = find.Search[this.getRandomInt(1, 10)];
    // let movie2: Movie = find.Search[this.getRandomInt(1, 10)];
    // let movie3: Movie = find.Search[this.getRandomInt(1, 10)];
    // let movie4: Movie = find.Search[this.getRandomInt(1, 10)];
    // if (movie1) {
    //   console.log(movie1);
    // } else {
    //   movie1 = find.Search[this.getRandomInt(1, 10)];
    //   console.log(movie1);
    // }
    // if (movie2 && movie2 != movie1) {
    //   console.log(movie2);
    // } else {
    //   movie2 = find.Search[this.getRandomInt(1, 10)];
    //   console.log(movie2);
    // }
    // if (movie3 && movie3 != movie1 && movie3 != movie2) {
    //   console.log(movie3);
    // } else {
    //   movie3 = find.Search[this.getRandomInt(1, 10)];
    //   console.log(movie3);
    // }
    // if (movie4 && movie4 != movie3 && movie4 != movie2 && movie4 != movie1) {
    //   console.log(movie4);
    // } else {
    //   movie3 = find.Search[this.getRandomInt(1, 10)];
    //   console.log(movie3);
    // }


  }

  // getRandomInt(min: number, max: number): number {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }
  // getSimilarFilms(): void {
  //   this.movie = new Movie();
  //   this.movie.inputSearch = this.inputSearch;
  //   this.movie.type = this.type;
  //   this.movie.year = this.year;
  //   this.movie.page = this.page;
  // }

}
