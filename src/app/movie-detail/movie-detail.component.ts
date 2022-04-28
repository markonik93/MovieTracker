import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from '../movieDetails';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserCommentLs } from '../userCommentLs';
import { Movie } from '../movie';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetails;
  public id: string;
  private routeSub: Subscription;
  //exceptionResult: string;
  inputComment: string;
  commentFromLs: string;
  user: string = "Nikola";
  userCommentLs: UserCommentLs;
  userCommentsFromLs: UserCommentLs[]=[];//{user:"",id:"",comment:""}
  inputFromLs:Movie;
  movie1: MovieDetails;
  movie2: MovieDetails;
  movie3: MovieDetails;
  movie4: MovieDetails;


  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //position at the top of the page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      console.log(params['id']);
      this.id = params['id'];
      this.getMovieDetails(this.id);
      this.loadFromLs();
      this.loadSimilarMovies();
    });
   
    

  }
  async getMovieDetails(id_param: string) {
    try {
      const find_movie = await this.movieService.getMovieById(id_param);
      this.movie = find_movie;
      console.log(this.movie);
      if (this.movie.Poster == "N/A") {
        this.movie.Poster = "../../assets/no-poster.jpg";
      }
      // this.activatedRoute.queryParams.subscribe(params => {
      //   this.id = params[id_param];
      // });
    }
    catch (e) {
      console.log('Error getting data.', e as Error)

    }
  }
  saveComment() {
    console.log(this.inputComment);
      this.userCommentLs = new UserCommentLs();
      this.userCommentLs.user = this.user;
      this.userCommentLs.comment = this.inputComment;
      this.userCommentLs.id = this.id;
      console.log(this.userCommentLs);
      if(this.userCommentsFromLs==null){
        this.userCommentsFromLs=new Array();
      }
      this.userCommentsFromLs.push(this.userCommentLs);
      localStorage.setItem('usersComment', JSON.stringify(this.userCommentsFromLs));
      //this.userCommentsFromLs.push(this.userCommentLs);
      this.inputComment = "";
      this.loadFromLs();
     // window.location.reload();
    //console.log(this.userCommentsFromLs);

  }
  loadFromLs(){
    this.userCommentsFromLs = JSON.parse(localStorage.getItem('usersComment')!);

    // if(this.userCommentsFromLs===null){
    //   this.userCommentLs.user="";
    //   this.userCommentLs.id="";
    //   this.userCommentLs.comment="";
    // }

    // for(let i=0;i<=this.userCommentsFromLs.length;i++){
    //   this.userCommentLs.user=this.userCommentsFromLs[i].user ? this.userCommentLs.user : "";
    //   this.userCommentLs.id=this.userCommentsFromLs[i].id ? this.userCommentLs.id : "";
    //   this.userCommentLs.comment=this.userCommentsFromLs[i].comment ? this.userCommentLs.comment : "";
    // }
    console.log(this.userCommentsFromLs);
  }
  //dohvatanje 'myMovie' iz Local Storage-a
  async loadSimilarMovies(){
    this.inputFromLs = JSON.parse(localStorage.getItem('myMovie')!);
    console.log(this.inputFromLs.inputSearch);

    const find = await this.movieService.getMovieByTitle(this.inputFromLs);
    console.log(find);

    this.movie1 = find.Search[this.getRandomInt(0, 9)];
    this.movie2 = find.Search[this.getRandomInt(0, 9)];
    this.movie3 = find.Search[this.getRandomInt(0, 9)];
    this.movie4 = find.Search[this.getRandomInt(0, 9)];
    if (this.movie1 && this.movie1!==this.movie) {
      console.log(this.movie1);
    } else {
      this.movie1 = find.Search[this.getRandomInt(0, 9)];
      console.log(this.movie1)
    }
    if (this.movie2 && this.movie2 !== this.movie1) {
      console.log(this.movie2);
    } else {
      this.movie2 = find.Search[this.getRandomInt(0, 9)];
      console.log(this.movie2);
    }
    if (this.movie3 && this.movie3 !== this.movie1 && this.movie3 !== this.movie2) {
      console.log(this.movie3);
    } else {
      this.movie3 = find.Search[this.getRandomInt(0, 9)];
      console.log(this.movie3);
    }
    if (this.movie4 && this.movie4 !== this.movie3 && this.movie4 !== this.movie2 && this.movie4 !== this.movie1) {
      console.log(this.movie4);
    } else {
      this.movie3 = find.Search[this.getRandomInt(0, 9)];
      console.log(this.movie3);
    }
  }
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
