import { Injectable } from '@angular/core';
import { Response,Headers } from '@angular/http';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { envUrl } from './config/env.config'
import { api } from './config/api.config'

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

 tempUrl : String= envUrl; //Setting env URL here
 
  constructor(private http:HttpClient) { }
 getState(){
   return this.http.get(this.tempUrl+api.getStates);
}

getDistrict(id){
return this.http.get(this.tempUrl+api.getDistricts+id);
}

getSearchResults(id){
  console.log(JSON.stringify(api))
return this.http.get(this.tempUrl+api.getSearchResults+id);
}

}
