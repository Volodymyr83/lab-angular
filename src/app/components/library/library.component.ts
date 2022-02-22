import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/game';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  myGames!: Game[];

  constructor(private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    const user = this.userService.currentUser;

    this.gameService.getGames().subscribe(games => {      
      this.myGames = games.filter(game => user?.library.includes(game.id));      
    });
  }

}
