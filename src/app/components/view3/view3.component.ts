import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { count, map, startWith } from 'rxjs/operators';
// import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.css']
})

export class View3Component implements OnInit {

  constructor(private http: HttpClient) {

  }
  trends: any;
  trend_view: boolean = true;
  analysis_view: boolean = false;

  //Activating tabs
  //trends
  trendBool() {
    this.analysis_view = false;

    this.trend_view = true;
  }
  analysisBool() {
    this.trend_view = false;
    this.analysis_view = true;
  }

  url: string = "http://localhost:5000"


  myControl = new FormControl();


  // options: string[] = ['One', 'Two', 'Three'];
  options: string[] = [];
  filteredOptions?: Observable<string[]>;

  sendValue(value: any) {
    this.http.post(this.url + "/suggest", value).subscribe(
      (data: any) => {
        console.log(data);
        this.setData(data);

      },
      error => {
        console.log("error", error)
      }
    )

  }
  ddd: any[] = [];
  setData(d:any) {
    var dd = d;
    this.ddd = []
    for (var i in dd) {
      this.ddd.push(dd[i].title);
    }
    this.options = this.ddd;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log("options:", this.options);


  }
  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
  }
  final_query:string="";
  show(dta: any) {
    console.log("supposed to be query data", dta)
    this.http.post<any[]>(this.url + "/data", dta).subscribe(
      (data: any) => {
        console.log(data);
        this.setFinal(data,dta);
        
      },
      (err) => {
        console.log("Error in fetching trends", err);
      }

    )


  }
  result:any;
  setFinal(d:any,dta:any){
    this.result=JSON.parse(d);
    this.forGraph(dta);

  }
  forGraph(dta:any){
      //A
      this.result=this.result[dta];
      console.log("Able to get Json:",this.result);
      console.log("getting all keys:\n",Object.keys(this.result))
      console.log("getting all values:\n",Object.values(this.result))


  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
