import {Component, OnInit} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CountriesService } from '../services/flags.service';
import { SheetComponent } from '../sheet/sheet.component';
import { Country } from '../country';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private _bottomSheet: MatBottomSheet, private CountriesService: CountriesService) {}

  countryTry: Country | any;

  countries: Array<Country> = []
  country: string = "mx"
  language : string = "es"
  size: string = "48x36"

  openBottomSheet(): void {
    this._bottomSheet.open(SheetComponent);
  }

  loadCountries(){
    this.CountriesService.getCountries(this.language).subscribe(countryTry => this.countryTry = countryTry);
  }
  

  ngOnInit(){
    this.loadCountries()
  }


}
