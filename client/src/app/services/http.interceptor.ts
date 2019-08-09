import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NetworkService } from './network.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public inj: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authService = this.inj.get(NetworkService);

        if (authService.getAccessToken()) {
            request = request.clone({ headers: request.headers.set('Authorization', authService.getAccessToken()) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((err: HttpErrorResponse) => {
                // if (err.status === 403) {
                //     // authService.logout();
                // }
                return throwError(err);
            }));
    }
}