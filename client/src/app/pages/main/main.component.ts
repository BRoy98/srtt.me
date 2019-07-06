import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  @ViewChild(HeaderComponent) header;
  showSignIn = false;

  constructor(private socialAuthService: AuthService) { }

  ngAfterViewInit() {
  }

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ', userData);
      }
    );
  }

}
