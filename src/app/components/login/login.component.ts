import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { EMAIL_REG_EXP } from 'src/email-validation-regExp';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailValue: string = '';
  passwordValue: string = '';
  emailIsValid: boolean = false;
  loginFormIsHidden = false;
  alertIsHidden = true;
  users: User[] = [];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onSubmit() {
    console.log('Form is submitted!');
    const registeredUser = this.users.find(user => user.email === this.emailValue);

    if (registeredUser && registeredUser.password === this.passwordValue) {
      this.loginFormIsHidden = true;
      console.log('log in!')
    } else {
      this.alertIsHidden = false;
    }


  }

  onEmailChange() {
    console.log('Email is changed!');
    const validEmail: boolean = EMAIL_REG_EXP.test(this.emailValue);    

    if (validEmail) {
      this.emailIsValid = true;
      console.log('Email is TRUE!');
    } else {
      this.emailIsValid = false;
      console.log('Email is FALSE!');
    }
  }

}
