import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { config } from 'src/environments/config';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MainComponent } from './pages/main/main.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

// Configs
export function getAuthServiceConfigs() {
  const authConfig = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(config.GOOGLE_LOGIN_CLIENT_ID)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(config.FACEBOOK_APP_ID)
      },
    ]
  );
  return authConfig;
}
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    ContactUsComponent,
    MainComponent,
    PrivacyPolicyComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    SocialLoginModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
