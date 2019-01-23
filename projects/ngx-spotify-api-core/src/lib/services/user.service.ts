import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserPublic} from '../models';
import {UserPrivate} from '../models';
import {ApiConfig} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  getUser(id: string): Observable<UserPublic> {
    return this.http.get<UserPublic>(this.config.baseUrl + `/v1/users/${id}`);
  }

  getCurrentUser(): Observable<UserPrivate> {
    return this.http.get<UserPrivate>(this.config.baseUrl + `/v1/me`);
  }
}
