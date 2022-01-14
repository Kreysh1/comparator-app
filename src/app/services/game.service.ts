import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { favGame } from '../models/favGame';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private db: AngularFireDatabase) { 
    this.gameRef = db.list(`/users`);
    this.gameObj = db.object(`/users`);
  }

  gameRef: AngularFireList<any>;
  gameObj: AngularFireObject<any>

  changeRef(path: any){
    this.gameRef = this.db.list(`/users/${path}/items`);
    this.gameObj = this.db.object(`/users/${path}/items`);
  }

  getObj(){
    return this.gameObj
  }

  //Obtener todos los datos
  getAll(){
    return this.gameRef
  }

  //Crear
  create(id: string, game: favGame): any{
    return this.gameRef.set(id, game)
  }

  //Actualizar
  update(id: string, value: any): Promise<void>{
    return this.gameRef.update(id, value);
  }

  //Eliminar
  delete(id: string): Promise<void>{
    return this.gameRef.remove(id);
  }

  //Eliminar Todo
  deleteAll(): Promise<void>{
    return this.gameRef.remove();
  }
}