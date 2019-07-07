import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppAuthService } from 'src/app/services/network/auth/auth.service';
import { EventListenerService } from 'src/app/services/event-listener/event-listener.service';

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
    private authService: AppAuthService,
    private eventListener: EventListenerService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isSignedIn = true;
    }
    this.eventListener.loginChange.subscribe(() => {
      if (this.authService.isAuthenticated()) {
        this.isSignedIn = true;
        this.signInInput = !this.signInInput;
        this.signInEvent.emit(this.signInInput);
      }
    });
  }

  toggleSignIn() {
    if (!this.authService.isAuthenticated()) {
      this.signInInput = !this.signInInput;
      this.signInEvent.emit(this.signInInput);
    } else { }
  }

}
