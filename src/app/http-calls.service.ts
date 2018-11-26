import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

booksBaseUrl:string='https://openlibrary.org/searchjson?';
  booksDefaultUrl:string='http://openlibrary.org/search.json?title=murder';
 imageBaseUrl:string='https://covers.openlibrary.org/b/olid/';
 tempUrl : string='http://192.168.1.4/api/values/';
dat :any;
 
  constructor(private http:Http) { }
 getState(){
   return this.http.get(this.tempUrl+'states').pipe(map((response: Response) =>response.json()));
}

getDistrict(id){
return this.http.get(this.tempUrl+'districts/'+id).pipe(map((response: Response) =>response.json()));
}

getSearchResults(id){
return this.http.get(this.tempUrl+'regdata/'+id).pipe(map((response: Response) =>response.json()));
}

}
