import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpCallsService } from '../http-calls.service'

export interface StateGroup {
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
 
  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });



  stateGroups: StateGroup[] = [{
    letter: 'A',
    values: [{"Id":1,"Name":"Tamil Nadu"}]
  }, {
    letter: 'C',
    values: [{"Id":2,"Name":"Andhra"}]
  }];

  stateGroupOptions: Observable<StateGroup[]>;
  rawStatesList: any;

  constructor(private fb: FormBuilder,private httpRequests : HttpCallsService ) {
 

  }

 ngOnInit() {

      this.httpRequests.getState().subscribe(
      data => {
        console.log(data);
        this.rawStatesList=data;
        this.stateGroups= this.group(data);
        this.stateGroups= this.group(data);
        this.loadDistricts(45);
      }
    );

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => 
        this._filterGroup(value)
        )
      );
       this.nameFlag=true;
       this.codeFlag=false;
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      console.log(value);
      return this.stateGroups
        .map(group => ({letter: group.letter, values: _filter(group.values, value)}))
        .filter(group => group.values.length > 0);
    }

    return this.stateGroups;
  }

  onToggle(){
    if(this.nameFlag == true){this.nameFlag=false;this.codeFlag=true;}
    else{this.nameFlag=true;this.codeFlag=false;}
    
  }

  loadDistricts(id){
    this.httpRequests.getDistrict(id).subscribe(
      data => console.log(data)
    )
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
      this.stateGroups=[{
    letter: 'D',
    values: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'E',
    values: ['California', 'Colorado', 'Connecticut']
  }];
  console.log(dataGroup);
  return dataGroup;
}

}
