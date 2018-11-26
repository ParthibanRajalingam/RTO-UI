import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpCallsService } from '../http-calls.service'

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
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
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  }, {
    letter: 'D',
    names: ['Delaware']
  }, {
    letter: 'F',
    names: ['Florida']
  }, {
    letter: 'G',
    names: ['Georgia']
  }, {
    letter: 'H',
    names: ['Hawaii']
  }, {
    letter: 'I',
    names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
  }, {
    letter: 'K',
    names: ['Kansas', 'Kentucky']
  }, {
    letter: 'L',
    names: ['Louisiana']
  }, {
    letter: 'M',
    names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
      'Minnesota', 'Mississippi', 'Missouri', 'Montana']
  }, {
    letter: 'N',
    names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota']
  }, {
    letter: 'O',
    names: ['Ohio', 'Oklahoma', 'Oregon']
  }, {
    letter: 'P',
    names: ['Pennsylvania']
  }, {
    letter: 'R',
    names: ['Rhode Island']
  }, {
    letter: 'S',
    names: ['South Carolina', 'South Dakota']
  }, {
    letter: 'T',
    names: ['Tennessee', 'Texas']
  }, {
    letter: 'U',
    names: ['Utah']
  }, {
    letter: 'V',
    names: ['Vermont', 'Virginia']
  }, {
    letter: 'W',
    names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  }];

  stateGroupOptions: Observable<StateGroup[]>;
  StatesList: any;

  constructor(private fb: FormBuilder,private httpRequests : HttpCallsService ) {
    this.httpRequests.getState().subscribe(
      data => {
        console.log(data);
        this.group(data);
        this.loadDistricts(45);
      }
    )

  }

 ngOnInit() {

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
       this.nameFlag=true;
       this.codeFlag=false;
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      console.log(value);
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
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

 async group(data){
  var byName = data.slice(0);
  console.log('b4 Sorting......'+JSON.stringify(byName));
 await byName.sort(function(a,b) {
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
  await byName.forEach(element => {
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
}

}
