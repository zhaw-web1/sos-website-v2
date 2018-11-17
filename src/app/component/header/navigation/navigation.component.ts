import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggleNavigation() {
    this.isOpen = !this.isOpen;
  }

}
