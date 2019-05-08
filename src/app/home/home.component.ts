import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpCallsService } from '../http-calls.service';
import { SearchResultsService } from '../search-results.service'
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';

export interface StateAndDistrictGroup {
  letter: string;
  values: any;
}

export const _filter = (opt: any, value: string): any[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>{
   return (item.Name).toLowerCase().indexOf(filterValue) === 0;
  }) ;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 nameFlag : boolean;
  codeFlag : boolean;
  districtBoxDisabled : boolean = true;
  stateId : String;
  districtId : String;
 
  stateForm: FormGroup = this.stateFb.group({
    stateGroup: '',
  });

   districtForm: FormGroup = this.districtFb.group({
    districtGroup: '',
  });

   stateCode: FormGroup = this.stateCodeFb.group({
    stateCode: '',
  });



  stateGroups: StateAndDistrictGroup[] =[];
  districtGroups :StateAndDistrictGroup[]=[];

  stateGroupOptions: Observable<StateAndDistrictGroup[]>;
  districtGroupOptions: Observable<StateAndDistrictGroup[]>;


  constructor(private stateFb: FormBuilder,
  private districtFb: FormBuilder,private stateCodeFb: FormBuilder,
  private httpRequests : HttpCallsService,private searchResult : SearchResultsService,
  private router: Router ) {

         this.districtForm.get('districtGroup').disable();
         this.districtBoxDisabled = true;
         this.httpRequests.getState().subscribe(
      data => {
        console.log(data);
        this.stateGroups= this.group(data);
        this.stateForm.get('stateGroup').enable();
      }
    );


  }

 ngOnInit() {

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => 
        this._filterStateGroup(value)
        )
      );

      this.districtGroupOptions = this.districtForm.get('districtGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => 
        this._filterDistrictGroup(value)
        )
      );
 
       this.nameFlag=true;
       this.codeFlag=false;
  }

  private _filterStateGroup(value: string): StateAndDistrictGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, values: _filter(group.values, value)}))
        .filter(group => group.values.length > 0);
    }

    return this.stateGroups;
  }

    private _filterDistrictGroup(value: string): StateAndDistrictGroup[] {
    if (value) {
      return this.districtGroups
        .map(group => ({letter: group.letter, values: _filter(group.values, value)}))
        .filter(group => group.values.length > 0);
    }

    return this.districtGroups;
  }

  onToggle(){
    if(this.nameFlag == true){this.nameFlag=false;this.codeFlag=true;}
    else{this.nameFlag=true;this.codeFlag=false;}
    
  }

setDistrictId(disId){
this.districtId = disId.trim();
}

onSearchSD(){
  alert(this.stateId +'----'+this.districtId);
  let param ='';
  if(this.stateId && this.districtId){
   param= 'districtname='+this.districtId+'&stateId='+this.stateId;
  }
  else if(this.stateId){
    param = 'stateId='+this.stateId;
  }
  else{
    alert("Please select any");
    return;
  }

   this.httpRequests.getSearchResults(param).subscribe(
      data => {
        console.log('Searched..................');
        console.log(data);
        this.searchResult.setOption(data);
         this.router.navigate(['/searchResults']);
      }
    );
  
}

onSearchRegCode(regcode){

}

  loadDistricts(stateId){
    this.stateId = stateId;
      this.httpRequests.getDistrict(stateId).subscribe(
      data => {
        console.log(data);
        this.districtGroups= this.group(data);
        this.districtForm.get('districtGroup').enable();
        this.districtBoxDisabled = false;
      }
    );

  }

  group(data){
  var byName = data.slice(0);
  console.log('b4 Sorting......'+JSON.stringify(byName));
  byName.sort(function(a,b) {
   console.log('sorting.....');
	var x = a.Name.toLowerCase();
	var y = b.Name.toLowerCase();
	return x < y ? -1 : x > y ? 1 : 0;
});
console.log('after Sorting......'+JSON.stringify(byName));
  var dataGroup = []
  var letter  = (byName[0].Name).charAt(0);
     var values = [];
     var i =0;
   byName.forEach(element => {
    console.log('Grouping.....'+letter);
    if(letter == (element.Name).charAt(0)){
        values.push(element);
    }
    else{
       var x = { 
        'letter' : letter,
        'values' : values
      }
      dataGroup.push(x);
      letter  = (byName[i].Name).charAt(0);
       values = [];
       values.push(element);
    }
    i++;
  });
      var lastElement = { 
        'letter' : letter,
        'values' : values
      }
      dataGroup.push(lastElement);
  console.log(dataGroup);
  return dataGroup;
}

}
