import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NetworkService } from '../network.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: NetworkService, public router: Router) { }
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
