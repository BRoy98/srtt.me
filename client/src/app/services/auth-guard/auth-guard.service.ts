import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppAuthService } from '../network/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AppAuthService, public router: Router) { }
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
