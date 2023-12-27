import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos/todos.service';
import { Subscription } from 'rxjs';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoTableRowComponent } from '../todo-table-row/todo-table-row.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { PagginatorComponent } from '../pagginator/pagginator.component';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-todos-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TodoTableRowComponent,
    PieChartComponent,
    PagginatorComponent,
    CreateTodoDialogComponent,
  ],
  templateUrl: './todos-view.component.html',
  styleUrl: './todos-view.component.scss',
})
export class TodosViewComponent implements OnInit {
  @Input({ required: true }) userId!: number;

  public todosList: Todo[];
  public numOfCompletedTodos: number;
  public numOfNotCompletedTodos: number;
  public showCompleted: boolean;
  public isLoading: boolean;

  // paggination
  public todosPerPageOptionsList = [5, 10, 15, 20, 25];
  public numOfTodosPerPage: number;
  public currentPage: number;
  public filteredTodoList: Todo[];
  public pageTodos: Todo[];

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.showCompleted = true;
    this.isLoading = false;
    this.todosList = [];
    this.numOfTodosPerPage = 5;
    this.currentPage = 1;
    this.filteredTodoList = [];

    this.todosService.getTodosByUserId(this.userId).subscribe({
      next: (todos: Todo[]) => {
        this.todosList = todos;
        this.filteredTodoList = this.getTodosByFilters(this.todosList);
        this.setpageTodos();
        this.setNumberOfTodosByStatus(this.todosList);
      },
      error: (err) => {
        this.filteredTodoList = this.getTodosByFilters(this.todosList);
        this.setpageTodos();
        this.setNumberOfTodosByStatus(this.todosList);
      },
    });
  }

  setNumberOfTodosByStatus(todosList: Todo[]) {
    this.numOfCompletedTodos = todosList.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0
    );

    this.numOfNotCompletedTodos = todosList.reduce(
      (acc, todo) => (!todo.completed ? acc + 1 : acc),
      0
    );
  }

  onTodoChanged(changedTodo: Todo) {
    this.isLoading = true;

    if (changedTodo.completed) {
      changedTodo.completionDate = new Date();
    } else {
      delete changedTodo.completionDate;
    }

    this.todosService.updateTodo(changedTodo).subscribe({
      next: (updatedTodo: Todo) => {
        const todoIndex = this.todosList.findIndex(
          (todo) => updatedTodo.id === todo.id
        );
        if (typeof todoIndex === 'number') {
          this.todosList[todoIndex] = updatedTodo;
          // todo check if by reference
        }
        this.setNumberOfTodosByStatus(this.todosList);
        this.isLoading = false;
      },
      error: (err) => {
        this.setNumberOfTodosByStatus(this.todosList);
        this.isLoading = false;
      },
    });
  }

  onNumOfTodosPerPageChanged(option: number) {
    this.numOfTodosPerPage = option;
    this.currentPage = 1;
    this.setpageTodos();
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.setpageTodos();
  }

  onTodoShowCompleted() {
    this.filteredTodoList = this.getTodosByFilters(this.todosList);
    this.currentPage = 1;
    this.setpageTodos();
  }

  onTodoCreated(todo: Todo) {
    this.todosService.createTodo(todo).subscribe({
      next: (createdTodo: Todo) => {
        this.todosList.unshift(createdTodo);
        this.filteredTodoList = this.getTodosByFilters(this.todosList);
        this.setpageTodos();
        this.setNumberOfTodosByStatus(this.todosList);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  private setpageTodos() {
    const startPosition = (this.currentPage - 1) * this.numOfTodosPerPage;
    const endPosition =
      startPosition + this.numOfTodosPerPage >= this.filteredTodoList.length
        ? this.filteredTodoList.length
        : startPosition + this.numOfTodosPerPage;

    this.pageTodos = this.filteredTodoList.slice(startPosition, endPosition);
  }

  private getTodosByFilters(todosList: Todo[]) {
    return todosList.filter((todo) =>
      this.showCompleted ? todo : !todo.completed
    );
  }
}
