import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../http-calls.service'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
panelOpenState = false;
searchResults : any =[];
error : string = "loading...";
  constructor( private httpRequests : HttpCallsService) { }

  ngOnInit() {

    this.httpRequests.getSearchResults('tn46').subscribe(
      result =>{
        
        this.searchResults=result;
        console.log('Search Resultsss'+this.searchResults);
      },(err) => {
        console.log('error in get search Results'+err);
        this.error='error--'+JSON.stringify(err);
      }
    )

  }

}
