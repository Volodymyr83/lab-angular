import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() label!: string;
  @Output() onSearchResult = new EventEmitter();
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    //if (this.searchValue) {
      this.onSearchResult.emit(this.searchValue);
    //}
  }
}
