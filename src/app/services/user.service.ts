import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { 
    this.usersRef = db.list(`users`);
  }

  usersRef: AngularFireList<User>;

  //Obtener todos los datos
  getAll(): AngularFireList<User>{
    return this.usersRef;
  }

  //Crear
  create(user: User, uid: string): any{
    return this.usersRef.set(uid, user)
  }

  //Actualizar
  update(uid: string, value: any): Promise<void>{
    return this.usersRef.update(uid, value);
  }

  //Eliminar
  delete(uid: string): Promise<void>{
    return this.usersRef.remove(uid);
  }

  //Eliminar Todo
  deleteAll(): Promise<void>{
    return this.usersRef.remove();
  }

}
