import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { RegionDialogComponent } from '../region-dialog/region-dialog.component';
import { CountryService } from 'src/app/services/country.service';
import { FavSheetComponent } from '../fav-sheet/fav-sheet.component';
import { Country } from 'src/app/interfaces/country';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private countryService: CountryService, private _bottomSheet: MatBottomSheet, public _dialog: MatDialog) {}

  actualCountry: Country = {img: "https://flagcdn.com/48x36/mx.png", name: "México", code: "mx"}
  actualCurrency: string = "MXN"
  actualLanguage: string = "es"

  countryCode: any
  countries: Array<Country> = []
  
  loadCountries(language: string){
    this.countryService.getCountries(language).subscribe((data:any)=>{

      //GET Country flag, name and code from API
      for (const KEY in data){
        let img = `https://flagcdn.com/48x36/${KEY}.png`
        let name = data[KEY]
        let code = KEY

        let test: Country = {img: img, name: name, code: code}

        this.countries.push(test)
      }
      // Sort By Name
      this.countries.sort((v1,v2) => {
        if (v1.name > v2.name){
          return 1;
        }

        if (v1.name < v2.name){
          return -1;
        }

        return 0;
      });
      console.log(this.countries)
    });
  }

  openFavSheet(): void {
    this._bottomSheet.open(FavSheetComponent);
  }

  openRegionDialog(): void {
    const dialogRef = this._dialog.open(RegionDialogComponent, {
      width: '500px',
      data: this.countries
    });

    dialogRef.afterOpened().subscribe(() => {
      console.log("The dialog was opened successfully.");
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(){
    this.loadCountries(this.actualLanguage)
  }

}