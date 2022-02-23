import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  searchTerm: string = '';
  users!: User[];
  searchedUsers!: User[];
  friendUsers!: User[];

  constructor(
    private userService: UserService,
    private navService: NavigationService) { }

  ngOnInit(): void {
    this.navService.currentNavigationElement.next('friends');
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.friendUsers = users.filter(user => this.userService
        .currentUser?.friends.includes(user.id!));           
    });
  }

  searchFriends(data: string) {
    this.searchTerm = data.toLowerCase();
    this.searchedUsers = this.users.filter(user => {
      const notCurrentUser = user !== this.userService.currentUser;
      const notFriend = !this.friendUsers.includes(user);
      const isSearchTermInUserName = user.username.toLowerCase().includes(this.searchTerm);

      return notCurrentUser && notFriend && isSearchTermInUserName;
    })
  }

  addFriend(friend: User) {    
    const user = {...this.userService.currentUser} as User;
    user.friends.push(friend.id!);

    this.userService.updateUser(user).subscribe(user => {
      this.userService.currentUser = user;
      this.friendUsers.push(friend);
      this.searchFriends(this.searchTerm);
    })
    
  }

  removeFriend(friend: User) {    
    const user = {...this.userService.currentUser} as User;
    user.friends = user.friends?.filter(id => id !== friend.id);

    this.userService.updateUser(user).subscribe(user => {
      this.userService.currentUser = user;
      this.friendUsers = this.friendUsers.filter(user => user !== friend);
      this.searchFriends(this.searchTerm);
    })    
  }
}