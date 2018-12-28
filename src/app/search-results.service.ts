import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private data ;  
  
 setOption( value) {    

    this.data = value;  
  }  
  
  getOption() {  
    return this.data;  
  } 
  constructor() { }
}
