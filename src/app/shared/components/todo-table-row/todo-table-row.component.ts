import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-table-row',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-table-row.component.html',
  styleUrl: './todo-table-row.component.scss',
})
export class TodoTableRowComponent {
  @Input({ required: true }) todo!: Todo;
  @Input() isEditable: boolean;
  @Output() onTodoChanged: EventEmitter<Todo> = new EventEmitter<Todo>();

  onTodoStatusChanged() {
    this.onTodoChanged.emit(this.todo);
  }
}
