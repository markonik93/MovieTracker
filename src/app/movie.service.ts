import { Injectable } from '@angular/core';
import {Movie} from './movie'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  // public subject=new BehaviorSubject<any>('');
  URL='http://www.omdbapi.com';

  constructor(private http: HttpClient) { }
  
  // emit<T>(data:T){
  //   this.subject.next(data);
  // }
  // on<T>():Observable<T>{
  //   return this.subject.asObservable();
  // }
  
  showMovie(movie:Movie){
    console.log("Kriterijumi za pretragu su: \n Unos: "+movie.inputSearch+"\n Zanr: "+movie.type+"\n Godina: "+movie.year);
  }
  getMovieById(id: string):Promise<any>{
    let data :any={
      apikey:'34fb9a13',
      i: id
    }
    console.log(data);
    return this.http.get(this.URL, {params:data}).toPromise();
  }
  getMovieByTitle(movie:Movie):Promise<any>{
    let data:any={
      apikey:'34fb9a13',
      s:movie.inputSearch,
    }
    //console.log(movie.year);
    if(movie.year){
      data['y']=movie.year;
    }
    if(movie.type){
      data['type']=movie.type;
    }
    if(movie.page){
      data['page']=movie.page;
    }
    console.log(data);
    return this.http.get(this.URL, {params:data}).toPromise();
    // .subscribe((response)=>{
    //   this.response=response;
    //   filmovi=this.response.Search;
    //   //this.ngOnButtonClick();
    //   console.log(this.response);
    // })
    // return filmovi;
  } 
}


