import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

booksBaseUrl:string='https://openlibrary.org/searchjson?';
  booksDefaultUrl:string='http://openlibrary.org/search.json?title=murder';
 imageBaseUrl:string='https://covers.openlibrary.org/b/olid/';
 tempUrl : string='http://localhost:3000/';
 
  constructor(private http:Http) { }
getState(){
return this.http.get(this.tempUrl+'getAllBooks');
}

getDistrict(){
return this.http.get(this.tempUrl+'getAllBooks');
}

getSearchResults(){
return this.http.get(this.tempUrl+'getAllBooks');
}
}
