import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToDo } from "src/models/Todo";


@Injectable({ providedIn: 'root' })
export class TodosService {

  public todosSubject = new BehaviorSubject<ToDo[]>([])
  todoLocal: ToDo[] = []

  constructor(private http: HttpService) { }

  getTodos() {
    this.http.getData<ToDo>("/api/tasks").subscribe((todos) => {
      this.todoLocal = todos
      this.todosSubject.next(todos)
    })
  }

  sendToDo(todo: FormData) {
    return this.http.sendData("/api/tasks", todo)
  }

  updateToDo(newTask: ToDo) {    
    this.todoLocal.map((todo) => {
      if (todo.id === newTask.id) {
        return newTask;
      }
      return todo
    })

    console.log(this.todoLocal)

    const data = new FormData()
    data.append("done", "1")
    console.log(newTask.id)
    this.http.updateData("/api/tasks/" + newTask.id, data).subscribe((e) =>{console.log(e)})
  }

  delete(index: number) {

    const local = this.todoLocal.filter((todo) => +todo.id !== index)
    this.todoLocal = local
    this.todosSubject.next(local)


    this.http.deleteData("/api/tasks/" + index).subscribe(() => { })
  }
}
