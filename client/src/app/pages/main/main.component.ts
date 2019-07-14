import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { NetworkService } from 'src/app/services/network.service';
import { EventListenerService } from 'src/app/services/event-listener.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  @ViewChild(HeaderComponent, { static: false }) header;
  showSignIn = false;

  googleSigningIn = false;
  fbSigningIn = false;
  emailSigningIn = false;

  constructor(private socialAuthService: AuthService,
    private eventListener: EventListenerService,
    private appAuthService: NetworkService) { }

  ngAfterViewInit() {
  }

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;
    if (!this.showSignIn) {
      this.googleSigningIn = false;
      this.fbSigningIn = false;
      this.emailSigningIn = false;
    }
  }

  public socialSignIn(socialPlatform: string) {
    if (this.googleSigningIn || this.fbSigningIn || this.emailSigningIn) {
      return;
    }
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      this.googleSigningIn = true;
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'facebook') {
      this.fbSigningIn = true;
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        switch (socialPlatform) {
          case 'google':
            this.appAuthService.socialLogin({ signinData: userData }, 'google').subscribe(
              res => {
                if (res.status === 'success') {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('name', res.name);
                  localStorage.setItem('email', res.email);
                  this.googleSigningIn = false;
                  this.eventListener.loginChanged();
                }
              },
              err => {
                this.googleSigningIn = false;
              }
            );
            break;
          case 'facebook':
            this.appAuthService.socialLogin({ signinData: userData }, 'facebook').subscribe(
              res => {
                if (res.status === 'success') {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('name', res.name);
                  localStorage.setItem('email', res.email);
                  this.fbSigningIn = false;
                  this.eventListener.loginChanged();
                }
              },
              err => {
                this.fbSigningIn = false;
              }
            );
            break;
        }
      }
    );
  }

}
