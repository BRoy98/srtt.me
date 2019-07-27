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

    newUrl(formData) {
        return this.http.post<any>('/api/url/new', formData);
    }

    contactSubmit(formData) {
        return this.http.post<any>('/api/util/contact', formData);
    }

    /**
     * Auth related queries
     */

    socialLogin(loginData, provider) {
        return this.http.post<any>('/api/auth/' + provider + '/signin', loginData);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}
