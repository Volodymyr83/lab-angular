import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navIsHidden!: boolean;
  activeElement!: HTMLElement;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {    
    this.navIsHidden = this.userService.currentUser ? false : true;
    this.userService.userIsLoggedIn.subscribe(result => {
      this.navIsHidden = result ? false : true;
    });     
  }

  navClick(event: any) {    
    this.activeElement = event.target;
  }

  onLogout() {
    this.userService.currentUser = undefined;
    this.userService.userIsLoggedIn.next(false);
    this.router.navigate(['login']);
  }

}
