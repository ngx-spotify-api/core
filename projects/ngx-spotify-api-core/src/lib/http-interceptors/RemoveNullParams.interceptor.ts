import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../models/configs';

@Injectable()
export class RemoveNullParamsInterceptor implements HttpInterceptor {
  constructor(private apiConfig: ApiConfig) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params: HttpParams = new HttpParams();
    if (req.url.indexOf(this.apiConfig.baseUrl) > -1) {
      params.keys().forEach((key: string) => {
        const param = params.get(key);
        if (param != null && param !== 'null' && param !== 'undefined' && param !== '') {
          params.set(key, param);
        }
      });
    }
    const newReq = req.clone({
      'params': params
    });
    return next.handle(newReq);
  }
}
