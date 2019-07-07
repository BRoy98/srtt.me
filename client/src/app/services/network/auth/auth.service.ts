import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  googleLogin(login_data) {
    return this.http.post<any>('/auth/google/signin', login_data);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
