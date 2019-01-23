import {Injectable, Optional} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, ObservableInput, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthorizationConfig} from '../models';

class RequestAccessTokenResponse {
  accessToken: string;
  tokenType: 'Bearer';
  scope: string;
  expiresIn: number;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private storage: Storage;
  private authorizing: boolean;
  private authorizedSuccess: boolean;

  constructor(@Optional() private config: AuthorizationConfig,
              private router: Router,
              private http: HttpClient,
              private location: Location) {
    this.storage = localStorage;
    if (this.storage.getItem(this.getAccessTokenStorageKey()) == null) {
      this.storage.removeItem('accessToken');
    } else {
      this.authorizedSuccess = true;
    }
  }

  public requestAuthorization(): void {
    this.authorizing = true;
    this.authorizedSuccess = false;
    const href = '' +
      'https://accounts.spotify.com/authorize' +
      '?client_id=' + this.config.clientId +
      '&response_type=' + 'code' +
      '&redirect_uri=' + encodeURIComponent(this.config.redirectUri) +
      '&state=' + 'login' +
      '&scope=' + encodeURIComponent(this.config.scopes.join(' '));

    window.location.href = href;
  }
  public abortAuthorization(): void {
    this.authorizing = false;
    this.authorizedSuccess = false;
    this.clearToken();
  }
  public requestAccessToken(code: string): Observable<boolean> {
    return this.http.post<RequestAccessTokenResponse>(this.config.authServerUrl, {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.config.redirectUri
    }).pipe(
      map((res: RequestAccessTokenResponse): boolean => {
      this.storeToken(res.accessToken, res.refreshToken);
      this.authorizing = false;
      this.authorizedSuccess = true;
      return true;
      })
    );
  }
  public refreshAccesToken(): Observable<boolean> {
    return this.http.post<RequestAccessTokenResponse>(this.config.authServerUrl, {
      grant_type: 'refresh_token',
      refresh_token: this.getRefreshToken()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        // this.abortAuthorization();
        return of(false);
      }),
      map((res: RequestAccessTokenResponse): boolean => {
        this.updateToken(res.accessToken);
        this.authorizedSuccess = true;
        this.authorizing = false;
        return true;
      })
    );
  }

  public isAuthorized(): boolean {
    return this.authorizing === false && this.authorizedSuccess === true;
  }
  public getAccessToken(): string {
    return this.storage.getItem(this.getAccessTokenStorageKey()) || '';
  }

  private getRefreshToken(): string {
    return this.storage.getItem(this.getRefreshTokenStorageKey()) || null;
  }
  private getAccessTokenStorageKey(): string {
    return this.config.storagePrefix + 'access-token';
  }
  private getRefreshTokenStorageKey(): string {
    return this.config.storagePrefix + 'refresh-token';
  }

  private storeToken(accessToken: string, refreshToken: string) {
    this.storage.setItem(this.getAccessTokenStorageKey(), accessToken);
    this.storage.setItem(this.getRefreshTokenStorageKey(), refreshToken);
  }
  private updateToken(accessToken: string): void {
    this.storage.setItem(this.getAccessTokenStorageKey(), accessToken);
  }
  private clearToken(): void {
    this.storage.removeItem(this.getAccessTokenStorageKey());
    this.storage.removeItem(this.getRefreshTokenStorageKey());
  }

}
