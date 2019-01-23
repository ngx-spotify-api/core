import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../models/configs/api.config';

@Injectable()
export class RemoveNullParamsInterceptor implements HttpInterceptor {
  constructor(private apiConfig: ApiConfig) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone();
    if (req.url.indexOf(this.apiConfig.baseUrl) > -1) {
      req.params.keys().forEach((key: string) => {
        const param = newReq.params.get(key);
        if (param == null) {
          newReq.params.delete(key);
        }
      });
    }
    return next.handle(newReq);
  }
}
