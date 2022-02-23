import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { EMAIL_REG_EXP } from 'src/email-validation-regExp';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailValue: string = '';
  passwordValue: string = '';
  confirmValue: string = '';
  emailIsValid: boolean = false;
  isSignIn: boolean = true;
  loginFormIsHidden = false;
  alertIsHidden = true;
  alertMessage: string = '';
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.currentUser) {
      this.router.navigate(['games']);
    }
    this.getUsers();    
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;      
    });
  }

  onSubmit() {    
    const registeredUser = this.users.find(user => user.email === this.emailValue);

    if(this.isSignIn) {
      this.signIn(registeredUser);
    } else {
      this.signUp(registeredUser);
    }    
  }

  signIn(user: User | undefined) {
    if (user && user.password === this.passwordValue) {       
      this.userService.currentUser = user;
      this.userService.userIsLoggedIn.next(true);
      this.router.navigate(['games']);
    } else {
      this.showAlertMessage('Email or login is not valid!');
    }
  }

  signUp(user: User | undefined) {    
    if (user) {
      this.showAlertMessage('User has already been registered!');
    } else if (this.passwordValue.length < 8) {
      this.showAlertMessage('Password has to be at least 8 characters long!');
    } else if (this.passwordValue !== this.confirmValue) {
      this.showAlertMessage('Passwords are not equal! Please try again.');
      this.passwordValue = '';
      this.confirmValue = '';
    } else {
      this.userService.addUser(this.emailValue, this.passwordValue)
      .subscribe(user => {
        this.users.push(user);
        this.showAlertMessage('NEW USER REGISTERED!');
        this.passwordValue = '';
        this.confirmValue = '';
      });
    }
  }

  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.alertIsHidden = false;
  }

  onEmailChange() {    
    const validEmail: boolean = EMAIL_REG_EXP.test(this.emailValue);    

    if (validEmail) {
      this.emailIsValid = true;      
    } else {
      this.emailIsValid = false;      
    }
  }

  switchLogin() {
    this.isSignIn = !this.isSignIn;
    this.passwordValue = '';
    this.confirmValue = '';
    this.alertIsHidden = true;
  }
}