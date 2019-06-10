import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApiConfig, AuthorizationConfig} from '../models/configs';
import {flatMap, map} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private apiConfig: ApiConfig,
                private authConfig: AuthorizationConfig) {}

    private attachAuthorizationHeader(req: HttpRequest<any>): Observable<HttpRequest<any>> {
      return  this.authConfig.accessToken().pipe(map((token: string): HttpRequest<any> => {
        return req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
      }));
    }

    intercept(origReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.attachAuthorizationHeader(origReq).pipe(flatMap((req: HttpRequest<any>): Observable<HttpEvent<any>> => {
          return next.handle(req);
        }));
    }
}
