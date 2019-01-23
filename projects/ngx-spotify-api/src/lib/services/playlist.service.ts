import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Playlist} from '../models';
import {Paging} from '../models';
import {PlaylistTrack} from '../models';
import {Image} from '../models';
import {ApiConfig} from '../models';

class Snapshot {
  snapshotId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public addTracksToPlaylist(id: string, uris: string[], position: number): Observable<string> {
    if (typeof uris !== typeof [] || uris.length < 1 || uris.length > 100) {
      return of(null);
    }
    return this.http.post<Snapshot>(this.config.baseUrl + `/v1/playlists/${id}/tracks`, {
      uris: uris,
      position: position
    }).pipe(map(({ snapshotId }) => {
      return snapshotId;
    }));
  }

  public removeTracksFromPlaylist(id: string, uris: string[]): Observable<string> {
    if (typeof uris !== typeof [] || uris.length < 1 || uris.length > 100) {
      return of(null);
    }
    return this.http.request<Snapshot>('DELETE', this.config.baseUrl + `/v1/playlists/${id}/tracks`, {
      body: {
        tracks: uris.map((uri: string) => {
          return { uri: uri };
        })
      }
    }).pipe(map(({ snapshotId }) => {
      return snapshotId;
    }));
  }

  public getPlaylist(id: string, market?: string): Observable<Playlist> {
    return this.http.get<Playlist>(this.config.baseUrl + `/v1/playlists/${id}`, {
      params: {
        market: market || ''
      }
    });
  }

  public getPlaylistTracks(id: string, market: string, limit: number = 100, offset: number = 0): Observable<Paging<PlaylistTrack>> {
    return this.http.get<Paging<PlaylistTrack>>(this.config.baseUrl + `/v1/playlists/${id}/tracks`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
        market: market
      }
    });
  }

  public getPlaylistCover(id: string): Observable<Image[]> {
    return this.http.get<Image[]>(this.config.baseUrl + `/v1/playlists/${id}/images`);
  }

  /**
   *
   * @param id id of playlist
   * @param image base64 encoded jpeg (max. 256KB)
   */
  public uploadPlaylistCover(id: string, image: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/playlists/${id}/images`, image, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    }).pipe(map((res: HttpResponse<any>) => {
      return true;
    }));
  }

  /**
   *
   * @param limit min=1, default=20, max=50
   * @param offset min=0, default=0, max=100000
   */
  public getOwnPlaylists(limit: number = 20, offset: number = 0): Observable<Paging<Playlist>> {
    return this.http.get<Paging<Playlist>>(this.config.baseUrl + `/v1/me/playlists`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString()
      }
    });
  }

  public updateDetails(id: string, name?: string, isPublic?: boolean, isCollaborative?: boolean, description?: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/playlists/${id}`, {
      name,
      public: isPublic,
      collaborative: isCollaborative,
      description: description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(map((res: HttpResponse<any>): boolean => {
      return true;
    }));
  }

  public getUsersPlaylists(id: string, limit: number = 20, offset: number = 0): Observable<Paging<Playlist>> {
    return this.http.get<Paging<Playlist>>(this.config.baseUrl + `/v1/users/${id}/playlists`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString()
      }
    });
  }

  public replacePlaylistTracks(id: string, uris: string[]): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/playlists/${id}/tracks`, {
      uris: uris
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(map((res: HttpResponse<any>): boolean => {
      return true;
    }));
  }

  public createPlaylists(userid: string, name: string, isPublic: boolean, isCollaborative: boolean, description: string = ''): Observable<Playlist> {
    return this.http.post<Playlist>(this.config.baseUrl + `/v1/users/${userid}/playlists`, {
      name,
      public: isPublic,
      collaborative: isCollaborative,
      description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public reorderPlaylistTracks(id: string, rangeStart: number, rangeLength: number, insertBefore: number, snapshot?: string): Observable<string> {
    return this.http.put<Snapshot>(this.config.baseUrl + `/v1/playlists/${id}/tracks`, {
      range_start: rangeStart,
      insert_before: insertBefore,
      range_length: rangeLength,
      snapshot_id: snapshot
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(map((s: Snapshot) => s.snapshotId));
  }
}
