import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from '../../../shared/models/user';
import { LoggingRequestsService } from '../loggingRequests/loggingRequests.service';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private usersList: User[];
  private userSubject: Subject<User>;
  constructor(private loggingRequestsService: LoggingRequestsService) {
    this.userSubject = new Subject<User>();
  }

  public loggInExistingUser(user: User) {
    return new Observable<User>((observer) => {
      this.loggingRequestsService.getUsers().subscribe({
        next: (usersList) => {
          this.usersList = usersList;
          const existingUser = this.usersList?.find(
            (us) => us.username === user.username && us.email === user.email
          );
          if (existingUser) {
            observer.next(existingUser);
          } else {
            observer.error('User does not exists');
          }
          this.userSubject.next(existingUser);
          observer.complete();
        },
        error: (error) => {
          observer.error('Opss something went wrong');
          observer.complete();
        },
      });
    });
  }

  public createNewUser(user: User) {
    //can't create using API
    return new Observable<User>((observer) => {
      this.userSubject.next(user);
    });
  }

  public userSubscribe(): Subject<User> {
    return this.userSubject;
  }
}
