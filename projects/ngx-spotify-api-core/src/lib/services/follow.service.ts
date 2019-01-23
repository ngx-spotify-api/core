import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CursorPaging} from '../models';
import {Artist} from '../models';
import {ApiConfig} from '../models';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public isFollowingArtists(ids: string[]): Observable<boolean[]> {
    if (ids === null || ids.length === 0) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }
    return this.http.get<boolean[]>(this.config.baseUrl + '/v1/me/following/contains', {
      params: {
        type: 'artist',
        ids: ids.join(',')
      }
    });
  }

  public isFollowingUsers(ids: string[]): Observable<boolean[]> {
    if (ids === null || ids.length === 0) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }
    return this.http.get<boolean[]>(this.config.baseUrl + '/v1/me/following/contains', {
      params: {
        type: 'user',
        ids: ids.join(',')
      }
    });
  }

  public areFollowingPlaylist(playlistId: string, usersToCheck: string[]): Observable<boolean[]> {
    if (usersToCheck === null || usersToCheck.length === 0) {
      return of([]);
    } else if (usersToCheck.length > 5) {
      return of(null);
    }
    return this.http.get<boolean[]>(this.config.baseUrl + `/v1/playlists/${playlistId}/followers/contains`, {
      params: {
        ids: usersToCheck.join(',')
      }
    });
  }

  public followArtists(ids: string[]): Observable<boolean> {
    if (ids === null || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.put<void>(this.config.baseUrl + '/v1/me/following', {}, {
      params: {
        type: 'artist',
        ids: ids.join(',')
      }
    }).pipe(map((): boolean => {
      return true;
    }));
  }

  public followUsers(ids: string[]): Observable<boolean> {
    if (ids === null || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.put(this.config.baseUrl + '/v1/me/following', {}, {
      params: {
        type: 'user',
        ids: ids.join(',')
      }
    }).pipe(map(() => {
      return true;
    }));
  }

  public followPlaylist(id: string, isPublic: boolean = false): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/playlists/${id}/followers`, {
      public: isPublic
    }).pipe(map(() => {
      return true;
    }));
  }

  public getFollowedArtists(limit: number = 20, after?: string): Observable<CursorPaging<Artist>> {
    return this.http.get<CursorPaging<Artist>>(this.config.baseUrl + `/v1/me/following`, {
      params: {
        type: 'artist',
        limit: limit.toString(),
        after: after
      }
    });
  }

  public unfollowArtists(ids: string[]): Observable<boolean> {
    if (ids === null || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.delete(this.config.baseUrl + '/v1/me/following', {
      params: {
        type: 'artist',
        ids: ids.join(',')
      }
    }).pipe(map(() => true));
  }

  public unfollowUsers(ids: string[]): Observable<boolean> {
    if (ids === null || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.delete(this.config.baseUrl + '/v1/me/following', {
      params: {
        type: 'user',
        ids: ids.join(',')
      }
    }).pipe(map(() => true));
  }

  public unfollowPlaylist(id: string): Observable<boolean> {
    return this.http.delete(this.config.baseUrl + `/v1/playlists/${id}/followers`).pipe(map(() => true));
  }
}
