import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { favGame } from 'src/app/models/favGame';
import { GameService } from 'src/app/services/game.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fav-sheet',
  templateUrl: './fav-sheet.component.html',
  styleUrls: ['./fav-sheet.component.scss']
})
export class FavSheetComponent implements OnInit{

  constructor(private _bottomSheetRef: MatBottomSheetRef<MatBottomSheet>, private gameService: GameService, private authService: AuthService ) {}
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }

    UID: string | undefined;
    gamesList: favGame[] = [];
    games: AngularFireList<any>
    items: Observable<any[]>
    objeto: any

    changeRef(){
      this.gameService.changeRef(this.UID)
    }

    getUserLogged(){
      this.authService.getUserLogged().subscribe(res =>{
        this.UID = res?.uid
        //console.log(`Email:${res?.email} Name:${res?.displayName}`);
      });
      //this.changeRef()
    }

    getObj(){
      let x = this.gameService.getObj().snapshotChanges
      console.log(x.toString)
    }

    loadAll(){
      this.gameService.getAll().snapshotChanges().subscribe( res => {
        res.forEach( item => {
          const todo = item.payload.toJSON();
          let key = item.key
          console.log(`JSON: ${todo}`)
          console.log(key)
          console.log(item)
          this.objeto = todo
          if(todo != null && key != null){
            this.gamesList.push(todo)
          }
        })
      })

      console.log(`Lista: ${this.gamesList[0]}`)
    }

    ngOnInit(): void {
      this.getUserLogged();
      //this.changeRef()
      this.loadAll()
    }

}
