import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-fav-sheet',
  templateUrl: './fav-sheet.component.html',
  styleUrls: ['./fav-sheet.component.scss']
})
export class FavSheetComponent{

  constructor(private _bottomSheetRef: MatBottomSheetRef<MatBottomSheet>) {}
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
}
