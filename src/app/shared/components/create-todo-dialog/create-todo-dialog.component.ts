import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss',
})
export class CreateTodoDialogComponent implements OnInit {
  @Input({ required: true }) userId: number;
  @Output() todoCreated: EventEmitter<Todo> = new EventEmitter();

  public todo: Todo;
  ngOnInit(): void {
    this.todo = { userId: this.userId, title: '', completed: false };
  }

  onSubmit(createTodoForm: NgForm) {
    this.todoCreated.emit(this.todo);
  }
}
