import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { Country } from 'src/app/interfaces/country';

@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.scss']
})
export class RegionDialogComponent {

  constructor(public dialogRef: MatDialogRef<HeaderComponent>, @Inject(MAT_DIALOG_DATA) public data: Country[]) {}

  actualCountry: Country = {img: "https://flagcdn.com/48x36/mx.png", name: "México", code: "mx"}
  countries: Array<Country> = this.data

  countrySelected(event:any){
    console.log('selected country: ' + event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}