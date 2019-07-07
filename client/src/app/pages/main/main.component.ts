import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular-6-social-login';
import { AppAuthService } from 'src/app/services/network/auth/auth.service';
import { EventListenerService } from 'src/app/services/event-listener/event-listener.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  @ViewChild(HeaderComponent) header;
  showSignIn = false;

  googleSigningIn = false;
  fbSigningIn = false;
  emailSigningIn = false;

  constructor(private socialAuthService: AuthService,
    private eventListener: EventListenerService,
    private appAuthService: AppAuthService) { }

  ngAfterViewInit() {
  }

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;
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
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        switch (socialPlatform) {
          case 'google':
            this.appAuthService.googleLogin({ id_token: userData.idToken }).subscribe(
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
                console.log('error', err);
              }
            );
            break;
        }
      },
      err => {
        console.log('errorrrrr' + err);
      }
    );
  }

}
