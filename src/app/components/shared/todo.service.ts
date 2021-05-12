import { SUPER_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { timestamp } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;
  toDoListDone: AngularFireList<any>;
  itemToUpdate: AngularFireDatabase;
  constructor(private firebasedb: AngularFireDatabase) { }

getToDoList() {
  this.toDoList = this.firebasedb.list('tittle');
  return this.toDoList;
}

addTittle(tittle:string) {
  this.toDoList.push({
    tittle:tittle,
    isChecked: false
  });
}

addTittleDone(tittle: string){
  const aux = new Date();
  const timestamp = aux.getTime();
  this.toDoListDone.push({
    tittle: tittle,
    timestamp,
  });
}

getItemFirebase(itemKey,item){
  const itemUpdate = this.firebasedb.list('tittle');
  itemUpdate.update(itemKey,{tittle:item.tittle});
}

checkingTittle($key: string, flag:boolean) {
  this.toDoList.update($key,{isChecked:flag});
}

removeTittle($key:string) {
  this.toDoList.remove($key);
}
removeTittleDone($key:string) {
  this.toDoListDone.remove($key);
}

removeAllTittle(){
  this.toDoList.remove();
}

removeAllTittleDone(){
  this.toDoListDone.remove();
}

getToDoListDone(){
  this.toDoListDone = this.firebasedb.list('tittleDone');
  return this.toDoListDone;
}


}