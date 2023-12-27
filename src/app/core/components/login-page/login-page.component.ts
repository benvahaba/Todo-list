import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginMethodType } from '../../models/login-method-type';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup/signup.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  public selectedLoginMethod;
  public loginMethodType = LoginMethodType;

  constructor() {
    this.selectedLoginMethod = LoginMethodType.SignIn;
  }

  ngOnInit(): void {}

  public onLoginMethodChanged(loginoginMethod: LoginMethodType) {
    this.selectedLoginMethod = loginoginMethod;
  }
}
