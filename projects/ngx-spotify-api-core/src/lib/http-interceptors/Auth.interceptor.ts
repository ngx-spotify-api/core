import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthorizationService} from "../services";
import {ApiConfig, AuthorizationConfig} from "../models/configs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthorizationService,
                private apiConfig: ApiConfig,
                private authConfig: AuthorizationConfig) {}

    private attachAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
      return req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authConfig.accessToken)
      });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.attachAuthorizationHeader(req));
    }
}
