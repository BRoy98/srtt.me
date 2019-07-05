import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showSignIn = false;
  @Output() signInEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;
    this.signInEvent.emit(this.showSignIn);
  }

}
