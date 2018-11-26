import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../http-calls.service'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
panelOpenState = false;
searchResults : any;
  constructor( private httpRequests : HttpCallsService) { }

  ngOnInit() {

    this.httpRequests.getSearchResults(45).subscribe(
      result =>{
        console.log(result);
        this.searchResults=result;
      } 
    )

  }

}
