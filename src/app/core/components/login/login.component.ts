import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../../services/logging/logging.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public user: User;
  public isLoading: boolean;
  public errorMessage: string;
  private userSubscription: Subscription;

  constructor(private logginService: LoggingService) {
    this.isLoading = false;
    this.errorMessage = '';
  }
  ngOnInit(): void {
    this.user = {};
  }

  onSubmit(signinForm: NgForm) {
    if (signinForm?.valid) {
      this.isLoading = true;
      if (this.userSubscription && !this.userSubscription.closed) {
        this.userSubscription.unsubscribe;
      }

      this.userSubscription = this.logginService
        .loggInExistingUser(this.user)
        .subscribe({
          next: (user) => {
            this.isLoading = false;
            this.errorMessage = undefined;
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err;
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe;
    }
  }
}
