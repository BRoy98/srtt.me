import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { EventListenerService } from 'src/app/services/event-listener.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() signInEvent = new EventEmitter<boolean>();
  @Input() signInInput: boolean;
  isSignedIn = false;

  constructor(
    private networkService: NetworkService,
    private eventListener: EventListenerService) { }

  ngOnInit() {
    if (this.networkService.isAuthenticated()) {
      this.isSignedIn = true;
    }
    this.eventListener.loginChange.subscribe(() => {
      if (this.networkService.isAuthenticated()) {
        this.isSignedIn = true;
        this.signInInput = !this.signInInput;
        this.signInEvent.emit(this.signInInput);
      }
    });
  }

  toggleSignIn() {
    if (!this.networkService.isAuthenticated()) {
      this.signInInput = !this.signInInput;
      this.signInEvent.emit(this.signInInput);
    } else { }
  }

}
