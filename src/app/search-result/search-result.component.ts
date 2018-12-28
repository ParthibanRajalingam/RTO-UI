import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../http-calls.service'
import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
panelOpenState = false;
searchResults : any =[];
error : string = "loading...";
  constructor( private httpRequests : HttpCallsService , private searchResult : SearchResultsService) { }

  ngOnInit() {

    this.searchResults = this.searchResult.getOption();

    if(!this.searchResults.length){
      this.error = 'No data Found';
    }

    /*
    this.httpRequests.getSearchResults('stateId=1').subscribe(
      result =>{
        
        this.searchResults=result;
        console.log('Search Resultsss'+this.searchResults);
      },(err) => {
        console.log('error in get search Results'+err);
        this.error='error--'+JSON.stringify(err);
      }
    )
    */

  }

}
