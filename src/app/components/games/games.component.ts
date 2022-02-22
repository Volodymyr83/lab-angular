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
  filteredGames: Game[] = [];
  
  minimumPrice!: number;
  maximumPrice!: number;
  priceValue!: number;
  searchTerm: string = '';
  indieTag: boolean = true;
  actionTag: boolean = true;
  adventureTag: boolean = true;

  constructor(private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      this.filteredGames = games;
      const prices = games.map(game => game.price);
      this.minimumPrice = Math.min(...prices);
      this.maximumPrice = Math.max(...prices);
      this.priceValue = this.maximumPrice;
    });
  }

  // configurePriceFilter() {
  //   const prices = this.filteredGames.map(game => game.price);
  //   this.minimumPrice = Math.min(...prices);
  //   this.maximumPrice = Math.max(...prices);
  //   this.priceValue = this.maximumPrice;
  // }

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
    console.log(filterTags);

    let resultArray = this.games.filter(game => {
      const containsTag = game.tags.some(tag => filterTags.includes(tag));
      return containsTag && game.price <= this.priceValue;
    })

    if(this.searchTerm) {
      resultArray = resultArray.filter(game => game.name.toLowerCase().includes(this.searchTerm));
    }

    this.filteredGames = resultArray;
  }
}
