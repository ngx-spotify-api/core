/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from './Auth.interceptor';
import {CorsInterceptor} from './Cors.interceptor';
import {RemoveNullParamsInterceptor} from './RemoveNullParams.interceptor';
import {UnderscoreToCamelcaseInterceptor} from './UnderscoreToCamelcase.interceptor';

export * from './Auth.interceptor';
export * from './Cors.interceptor';
export * from './RemoveNullParams.interceptor';
export * from './UnderscoreToCamelcase.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RemoveNullParamsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UnderscoreToCamelcaseInterceptor, multi: true }
];
