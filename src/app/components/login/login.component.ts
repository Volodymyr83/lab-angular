import { Component, OnInit } from '@angular/core';
import { EMAIL_REG_EXP } from 'src/email-validation-regExp';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailValue: string = '';
  passwordValue: string = '';
  emailIsValid: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Form is submitted!');
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
