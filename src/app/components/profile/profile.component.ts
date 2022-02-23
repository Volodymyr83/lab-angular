import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {  
  emailIsValid: boolean = true;  
  alertIsHidden: boolean = true;
  user!: User;

  constructor(
    private userService: UserService,
    private navService: NavigationService) {}

  ngOnInit(): void {
    this.navService.currentNavigationElement.next('profile');    
    this.initiateUser();
  }
  
  initiateUser() {
    this.user = {...this.userService.currentUser} as User;  
  }

  onSubmit() {    
    this.user.age = Math.floor(this.user.age);
    this.user.username = this.user.username.trim();

    this.userService.updateUser(this.user)
    .subscribe(user => {
      this.userService.currentUser = user;
      this.initiateUser();
    });
  }
}
