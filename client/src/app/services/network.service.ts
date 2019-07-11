import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    jwtHelper = new JwtHelperService();

    constructor(
        private http: HttpClient,
        private router: Router) { }

    /**
     * Url related queries
     */

    newUrl(url) {
        return this.http.post<any>('/api/url/new', url);
    }

    /**
     * Auth related queries
     */

    googleLogin(login_data) {
        return this.http.post<any>('/api/auth/google/signin', login_data);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}
