import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../models/configs/api.config';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
    constructor(private apiConfig: ApiConfig) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers;

        if (req.url.indexOf(this.apiConfig.baseUrl) > -1) {
            headers = headers.set('Accept', 'application/json');
            headers = headers.set('Content-Type', 'application/json');
        } else if (req.url.indexOf('authorize')) {
            // headers = req.headers.set('Access-Control-Allow-Origin', '*');
        }

        const newReq = req.clone({
            headers: headers
        });
        return next.handle(newReq);
    }
}
