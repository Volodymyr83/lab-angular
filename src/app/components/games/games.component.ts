import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/game';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  searchGames(data: string) {
    
  }

}
