import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() signInEvent = new EventEmitter<boolean>();
  @Input() signInInput: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleSignIn() {
    this.signInInput = !this.signInInput;
    this.signInEvent.emit(this.signInInput);
  }

}
