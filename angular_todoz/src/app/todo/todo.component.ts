import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from 'src/models/Todo';
import { TodosService } from 'src/services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input("todo") todo!: ToDo
  @Input("index") index!: number
  priorityColor = ""

  constructor(private todoService:TodosService) {}

  ngOnInit(): void {
    switch (this.todo.attributes.priority) {
      case "low":
        this.priorityColor = "#14F06F"
        break;
      case "medium":
        this.priorityColor = "#F0A727"
        break;
      case "high":
        this.priorityColor = "#E60158"
        break;
    }
  }

  delete() {
    this.todoService.delete(+this.todo.id)
  }

  done() {
    if (this.todo.attributes.done) this.todo.attributes.done = 0;
    else this.todo.attributes.done = 1;
    this.todoService.updateToDo(this.todo)
  }
}
