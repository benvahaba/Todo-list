import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './core/components/login-page/login-page.component';
import { LoggingService } from './core/services/logging/logging.service';
import { Subject, Subscription } from 'rxjs';
import { User } from './shared/models/user';
import { TodosViewComponent } from './shared/components/todos-view/todos-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, LoginPageComponent, TodosViewComponent],
})
export class AppComponent {
  title = 'todos';

  public user: User;
  private userSubject: Subscription;

  constructor(private loggingService: LoggingService) {
    this.userSubject = loggingService.userSubscribe().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        this.user = undefined;
      },
    });
  }
}
