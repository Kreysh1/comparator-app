import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { favGame } from 'src/app/models/favGame';
import { GameService } from 'src/app/services/game.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'app-fav-sheet',
  templateUrl: './fav-sheet.component.html',
  styleUrls: ['./fav-sheet.component.scss']
})
export class FavSheetComponent implements OnInit{

  constructor(private _bottomSheetRef: MatBottomSheetRef<MatBottomSheet>, 
    private gameService: GameService, 
    private authService: AuthService,
    private db: AngularFireDatabase) {
      //this.db.object(`users/${this.UID}/items`).set({id: 1, name: 'somethins'})
    }
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }

    UID: string | undefined;
    public _itemsList: favGame[];
    itemsLenght: number;

    getUserLogged(){
      return new Promise((resolve, reject) => {
        this.authService.getUserLogged().subscribe(res =>{
          this.UID = res?.uid
          resolve(this.UID)
          console.log(`Email:${res?.email} Name:${res?.displayName} UID: ${this.UID}`);
        });
      })
    }

    async getItemsRealTime(){
      return new Promise((resolve, reject) => {
        this.db.list(`users/${this.UID}/items`).valueChanges().subscribe(value => {
          resolve(value);
        })
      })
    }

    async getStarted(){
      var items: favGame[] = [];
      await this.getItemsRealTime().then(value => {
        items = value as favGame[];
      });

      this._itemsList = items;
      this.itemsLenght = this._itemsList.length
      console.log(this._itemsList)
    }

    reload(){
      this.reload()
    }

    loadAll(){
      // this.gameService.getAll().snapshotChanges().subscribe( res => {
      //   res.forEach( item => {
      //     const todo = item.payload.toJSON();
      //     let key = item.key
      //     console.log(`JSON: ${todo}`)
      //     console.log(key)
      //     console.log(item)
      //     this.objeto = todo
      //     if(todo != null && key != null){
      //       this.gamesList.push(todo)
      //     }
      //   })
      // })
      
    }

    ngOnInit(): void {
      //this.getUserLogged();
      //this.changeRef()
      this.getUserLogged().then( x => {
        this.getStarted()
      })
    }

}
