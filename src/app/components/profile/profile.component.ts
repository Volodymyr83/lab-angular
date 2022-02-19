import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { EMAIL_REG_EXP } from 'src/email-validation-regExp';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {  
  emailIsValid: boolean = true;  
  alertIsHidden: boolean = true;
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {    
    this.initiateUser();
  }
  
  initiateUser() {
    this.user = {...this.userService.currentUser} as User;  
  }

  onSubmit() {
    console.log('Form is submitted!');
    this.user.age = Math.floor(this.user.age);
    this.user.username = this.user.username.trim();

    this.userService.updateUser(this.user)
    .subscribe(user => {
      this.userService.currentUser = user;
      this.initiateUser();
    });
  }
}
