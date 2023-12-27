import { Injectable } from '@angular/core';
import { TodosRequestsService } from '../todos-requests/todos-requests.service';
import { Todo } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private todosRequestsService: TodosRequestsService) {}

  getTodosByUserId(userId: number) {
    return this.todosRequestsService.getTodosByUserId(userId);
  }

  updateTodo(todo: Todo) {
    return this.todosRequestsService.updateTodo(todo);
  }

  createTodo(todo: Todo) {
    return this.todosRequestsService.createTodo(todo);
  }
}
