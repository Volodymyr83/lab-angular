import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/game';
import { GameService } from 'src/app/services/game.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  
  minimumPrice!: number;
  maximumPrice!: number;
  priceValue!: number;
  searchTerm: string = '';
  indieTag: boolean = true;
  actionTag: boolean = true;
  adventureTag: boolean = true;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private navService: NavigationService) { }

  ngOnInit(): void {
    this.navService.currentNavigationElement.next('games');

    this.gameService.getGames().subscribe(games => {      
      this.games = games;

      this.configureGamesState();
    });
  }

  configureGamesState() {
    const user = this.userService.currentUser;
    this.games = this.games.filter(game => !user?.library.includes(game.id));

    const prices = this.games.map(game => game.price);
    this.minimumPrice = Math.min(...prices);
    this.maximumPrice = Math.max(...prices);
    this.priceValue = this.maximumPrice;

    this.filterGames();
  }

  searchGames(data: string) {
    this.searchTerm = data.trim().toLowerCase();
    this.filterGames();
  }

  switchIndie() {
    this.indieTag = !this.indieTag;
    this.filterGames();
  }

  switchAction() {
    this.actionTag = !this.actionTag;
    this.filterGames();
  }

  switchAdventure() {
    this.adventureTag = !this.adventureTag;
    this.filterGames();
  }

  filterGames() {
    const filterTags: string[] = [];
    if (this.indieTag) {
      filterTags.push('Indie');
    }
    if (this.actionTag) {
      filterTags.push('Action');
    }
    if (this.adventureTag) {
      filterTags.push('Adventure');
    }    

    let resultArray = this.games.filter(game => {
      const containsTag = game.tags.some(tag => filterTags.includes(tag));
      return containsTag && game.price <= this.priceValue;
    })

    if(this.searchTerm) {
      resultArray = resultArray.filter(game => game.name.toLowerCase().includes(this.searchTerm));
    }

    this.filteredGames = resultArray;
  }

  AddGameToLibrary(game: Game) {
    const user = {...this.userService.currentUser} as User;
    user.library.push(game.id);

    this.userService.updateUser(user).subscribe(user => {
      this.userService.currentUser = user;
      this.configureGamesState();
    })
  }
}
