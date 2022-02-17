import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navIsHidden: boolean = true;
  activeElement!: HTMLElement;

  constructor() { }

  ngOnInit(): void {
  }

  navClick(event: any) {
    console.log(event.currentTarget);
    this.activeElement = event.target;
  }

}
