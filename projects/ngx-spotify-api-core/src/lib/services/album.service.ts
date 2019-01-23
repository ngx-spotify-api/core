import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Album} from '../models';
import {map, tap} from 'rxjs/operators';
import {Paging} from '../models';
import {Track} from '../models';
import {ApiConfig} from '../models';

class AlbumsResponse {
  albums: Album[];
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) {
  }

  getAlbum(id: string, market?: string): Observable<Album> {
    return this.http.get<Album>(this.config.baseUrl + '/v1/albums/' + id, {
      params: {
        market: market
      }
    });
  }

  getAlbumTracks(id: string, limit: number = 20, offset: number = 0, market?: string): Observable<Paging<Track>> {
    return this.http.get<Paging<Track>>(this.config.baseUrl + '/v1/albums/' + id + '/tracks', {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
        market: market
      }
    });
  }

  getAlbums(ids: string[], market?: string): Observable<Album[]> {
    if (ids == null || ids.length < 1) {
      return of([]);
    } else if (ids.length > 20) {
      return of(null);
    }

    return this.http.get<AlbumsResponse>(this.config.baseUrl + '/v1/albums', {
      params: {
        ids: ids.join(','),
        market: market
      }
    }).pipe(map((res: AlbumsResponse): Album[] => {
      return res.albums;
    }));
  }
}
