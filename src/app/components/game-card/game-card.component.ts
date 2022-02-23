import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() cardType!: string;
  @Input() game!: Game;
  @Output() onAddClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addToLibrary() {
    this.onAddClick.emit();
  }
}
