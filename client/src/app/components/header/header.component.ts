import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { EventListenerService } from 'src/app/services/event-listener.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() signInEvent = new EventEmitter<boolean>();
  @Input() signInInput: boolean;
  public signInText = "Sign in / Join";
  public currentRoute = "";
  public routeSubscription;

  constructor(
    private router: Router,
    private networkService: NetworkService,
    private eventListener: EventListenerService) {

    this.routeSubscription = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = this.router.url;
      if (this.currentRoute === "/dashboard") {
        this.signInText = "Sign out";
      } else if (this.currentRoute !== "/dashboard" && this.networkService.isAuthenticated()) {
        this.signInText = "My Account";
      } else {
        this.signInText = "Sign in / Join";
      }
    });
  }

  ngOnInit() {
    this.eventListener.loginChange.subscribe(() => {
      if (this.networkService.isAuthenticated()) {
        this.router.navigate(['/dashboard']);
        this.signInInput = !this.signInInput;
        this.signInEvent.emit(this.signInInput);
      } else {
        this.signInText = "Sign in / Join";
      }
    });
  }

  toggleSignIn() {
    if (this.currentRoute === "/dashboard") {
      this.networkService.logout();
      this.router.navigate(['/']);
    } else if (!this.networkService.isAuthenticated()) {
      this.signInInput = !this.signInInput;
      this.signInEvent.emit(this.signInInput);
    } else {
      this.router.navigate(['dashboard']);
    }
  }

}
