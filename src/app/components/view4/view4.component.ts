import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { count, map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-view4',
  templateUrl: './view4.component.html',
  styleUrls: ['./view4.component.css']
})
export class View4Component implements OnInit {

  constructor(private http: HttpClient) {
    for (var i in this.country_list) {
      this.country_list[i] = this.country_list[i].replace(" ", "_");
    }
    for (var i in this.country_list) {
      this.country_list[i] = this.country_list[i].replace(" ", "_");
    }
    this.country_list=this.country_list.map(name => name.toLowerCase())
   }

  ngOnInit(): void {
    this.filteredNations = this.myNation.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  url: string = "http://localhost:5000"

  myNation = new FormControl();
  nations: string[] = [];

  filteredNations?: Observable<string[]>;
  l:number=0;
  trends: any;
  country_list:string[] = ["Afghanistan","uae", "united_states","Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  trendingSearches(data:string) {
    console.log("sending ", data, "as input");
    this.http.post<any[]>(this.url + "/trending", data).subscribe(
      (data: any) => {
        console.log(data);
        this.setData(data);        
      },
      (err: any) => {
        console.log("error in getting trending", err);
      }

    )

  }
  value:string;
  trends_res:string[]=[];
  setData(a:any){
    this.trends=JSON.parse(a);
    console.log("Trends data:\n",this.trends);
    this.trends=this.trends[0];
    for(var i in this.trends){
      this.trends_res.push(this.trends[i]);
    }
    console.log("trends result",this.trends_res)
   this.l=Object.keys(this.trends).length
    console.log("Length",this.l);  
  }
copy(d:string){
  this.value=d;

}
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.country_list.filter(nation => nation.toLowerCase().indexOf(filterValue) === 0);
  }
}

