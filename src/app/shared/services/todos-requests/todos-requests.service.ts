import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';

const baseUrl = 'https://jsonplaceholder.typicode.com/';

@Injectable({
  providedIn: 'root',
})
export class TodosRequestsService {
  constructor(private http: HttpClient) {}

  getTodosByUserId(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseUrl}/users/${userId}/todos`);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };

    return this.http.put<Todo>(
      `${baseUrl}/todos/${todo.id}`,
      todo,
      httpOptions
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };

    return this.http.post<Todo>(`${baseUrl}/todos`, todo, httpOptions);
  }

  // fetch('https://jsonplaceholder.typicode.com/posts', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1,
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
}
