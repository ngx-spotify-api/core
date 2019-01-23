import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../models/configs/api.config';
import {AuthorizationConfig} from "../models/configs";

@Injectable()
export class UnderscoreToCamelcaseInterceptor implements HttpInterceptor {

    constructor(private apiConfig: ApiConfig, private authConfig: AuthorizationConfig) {}

    private transformObjectKeysToCamelCase(object: any): any {
        if (object == null || object === {}) {
            return object;
        }
        const ret = {};
        Object.keys(object).forEach((key: string) => {
            const newKey = key.replace(/[_]([^_])?/g, (v) => {
                return v.replace('_', '').toUpperCase();
            });
            if (object[key] instanceof Array) {
                ret[newKey] = object[key].map((value: any) => {
                    return this.transformObjectKeysToCamelCase(value);
                });
            } else if (object[key] instanceof Object) {
                ret[newKey] = this.transformObjectKeysToCamelCase(object[key]);
            } else {
                ret[newKey] = object[key];
            }
        });
        return ret;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map((res: HttpResponse<any>): HttpResponse<any> => {
            if (req && req.url && (req.url.includes(this.authConfig.authServerUrl) || req.url.includes(this.apiConfig.baseUrl)) && res.body) {
                return res.clone({
                    body: this.transformObjectKeysToCamelCase(res.body)
                });
            }
            return res;
        }));
    }
}
