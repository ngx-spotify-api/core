import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Paging} from '../models';
import {Album} from '../models';
import {Track} from '../models';
import {ApiConfig} from '../models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public areSavedAlbums(ids: string[]): Observable<boolean[]> {
    if (ids === null || ids === undefined || ids.length === 0) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }

    return this.http.get<boolean[]>(this.config.baseUrl + `/v1/me/albums/contains`, {
      params: {
        ids: ids.join(',')
      }
    });
  }

  public areSavedTracks(ids: string[]): Observable<boolean[]> {
    if (ids === null || ids === undefined || ids.length === 0) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }

    return this.http.get<boolean[]>(this.config.baseUrl + `/v1/me/tracks/contains`, {
      params: {
        ids: ids.join(',')
      }
    });
  }

  public getSavedAlbums(limit: number = 20, offset: number = 0, market?: string): Observable<Paging<Album>> {
    return this.http.get<Paging<Album>>(this.config.baseUrl + `/v1/me/albums`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
        market
      }
    });
  }

  public getSavedTracks(limit: number = 20, offset: number = 0, market?: string): Observable<Paging<Track>> {
    return this.http.get<Paging<Track>>(this.config.baseUrl + `/v1/me/tracks`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
        market
      }
    });
  }

  public saveAlbums(ids: string[]): Observable<boolean> {
    if (ids === null || ids === undefined || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.put(this.config.baseUrl + `/v1/me/albums`, {}, {
      params: {
        ids: ids.join(',')
      }
    }).pipe(map(() => true));
  }

  public removeAlbums(ids: string[]): Observable<boolean> {
    if (ids === null || ids === undefined || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.delete(this.config.baseUrl + `/v1/me/albums`, {
      params: {
        ids: ids.join(',')
      }
    }).pipe(map(() => true));
  }

  public saveTracks(ids: string[]): Observable<boolean> {
    if (ids === null || ids === undefined || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.put(this.config.baseUrl + `/v1/me/tracks`, {}, {
      params: {
        ids: ids.join(',')
      }
    }).pipe(map(() => true));
  }

  public removeTracks(ids: string[]): Observable<boolean> {
    if (ids === null || ids === undefined || ids.length === 0) {
      return of(false);
    } else if (ids.length > 50) {
      return of(false);
    }
    return this.http.delete(this.config.baseUrl + `/v1/me/tracks`, {
      params: {
        ids: ids.join(',')
      }
    }).pipe(map(() => true));
  }
}
