import { Component } from '@angular/core';
import { LoggingService } from '../../../services/logging/logging.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../../shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
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
        .createNewUser(this.user)
        .subscribe({
          next: (user) => {
            this.isLoading = false;
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
