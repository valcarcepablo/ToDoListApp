import { timestamp } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers : [TodoService]
})
export class TodosComponent implements OnInit {
  toDoListArray: any[];
  toDoListArrayDone: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit(){
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      this.toDoListArray.sort((a,b) =>{
        return a.isChecked - b.isChecked;
      })
    });

    this.toDoService.getToDoListDone().snapshotChanges()
    .subscribe(item => {
      this.toDoListArrayDone = [];
      console.log(item)
      item.forEach(element => {
        console.log(x)
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArrayDone.push(x);
      })
      console.log(this.toDoListArrayDone);
    });
  }
  
  addTask(itemTittle) {
    this.toDoService.addTittle(itemTittle.value);
    itemTittle.value = null;
    for (let i of this.toDoListArray) {
      console.log (this.toDoListArray[i]);
    }
  }

  alterCheck($key: string,isChecked,item) {
    this.toDoService.checkingTittle($key,isChecked+1);
    if(isChecked == 1){
      this.toDoService.addTittleDone(item.tittle);
      this.delete($key);
    }
    item = null;
  }

  delete($key : string){
    this.toDoService.removeTittle($key);
  }

  deleteDone($key : string){
    this.toDoService.removeTittleDone($key);
  }

  deleteAll(){
    this.toDoService.removeAllTittle();
  }

  deleteAllDone(){
    this.toDoService.removeAllTittleDone();
  }

  editItem($key: string,item,itemTittle){
    item.tittle = itemTittle.value;
    this.toDoService.getItemFirebase($key,item);
    itemTittle.value = null;
  }

  //Variables usadas para orden 
  arriba: boolean;
  orden: boolean;
  //Ordenación de lista normal
  sortTaskNombre(arriba: boolean = true){
    this.toDoListArray = this.toDoListArray.sort( (a, b) => {
      if(a.tittle.toLocaleLowerCase() < b.tittle.toLocaleLowerCase()) {
        if (arriba) {
          return -1;
        } else {
          return 1
        }
      }else if (a.tittle.toLocaleLowerCase() > b.tittle.toLocaleLowerCase()){
        if (arriba) {
          return 1;
        } else {
          return -1
        }
      }
      else return 0
    });
    this.orden = true;
    this.arriba = arriba;
  }

  
  sortTaskFecha(arriba: boolean = true){
    this.toDoListArray = this.toDoListArray.sort( (a, b) => {
      return a.timestamp - b.timestamp;
    })
  }

  ordenPorPrioridad(){
    this.toDoListArray = this.toDoListArray.sort((a,b) =>{
      return a.isChecked - b.isChecked;
    })
  }
  
  //Ordenación de la lista de tareas hechas
  sortTaskNombreDone(arriba: boolean = true){
    this.toDoListArrayDone = this.toDoListArrayDone.sort( (a, b) => {
      if(a.tittle.toLocaleLowerCase() < b.tittle.toLocaleLowerCase()) {
        if (arriba) {
          return -1;
        } else {
          return 1
        }
      }else if (a.tittle.toLocaleLowerCase() > b.tittle.toLocaleLowerCase()){
        if (arriba) {
          return 1;
        } else {
          return -1
        }
      }
      else return 0
    });
    this.orden = true;
    this.arriba = arriba;
  }

  
  sortTaskFechaDone(arriba: boolean = true){
    this.toDoListArrayDone = this.toDoListArrayDone.sort( (a, b) => {
      return a.timestamp - b.timestamp;
    })
  }
  
}
