import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, first} from 'rxjs/operators';
import {AuthorizationService} from '../services/authorization.service';
import {flatMap} from 'rxjs/internal/operators';
import {ApiConfig} from '../models/configs/api.config';
import {AuthorizationConfig} from '../models/configs/authorization.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthorizationService,
                private apiConfig: ApiConfig,
                private authConfig: AuthorizationConfig) {}

    private attachAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
      if (req.url.includes(this.authConfig.authServerUrl)) {
        return req;
      }

      return req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken())
      });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.attachAuthorizationHeader(req)).pipe(
          catchError((res: HttpErrorResponse): Observable<any> => {
              if ((res.status === 401) && req.url.includes(this.apiConfig.baseUrl)) {
                  return this.authService.refreshAccesToken().pipe(
                    first(),
                    flatMap((success: boolean) => {
                    if (success) {
                      return next.handle(this.attachAuthorizationHeader(req));
                    } else {
                      return throwError({error: 'renew failed'});
                    }
                  }));
              }
              return throwError(res);
          })
        );
    }
}
