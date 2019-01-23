import {Injectable, Optional} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Artist} from '../models';
import {HttpClient} from '@angular/common/http';
import {Paging} from '../models';
import {Track} from '../models';
import {Album} from '../models';
import {map} from 'rxjs/operators';
import {ApiConfig} from '../models';
import {AlbumGroup} from '../models';
import {AlbumSimplified} from '../models';

class ArtistListResponse {
  artists: Artist[];
}

class TrackListResponse {
  tracks: Track[];
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(this.config.baseUrl + '/v1/artists/' + id, {
      params: {}
    });
  }

  getArtistsAlbums(id: string, includeGroups?: AlbumGroup[], market?: string, limit: number = 20, offset: number = 0): Observable<Paging<AlbumSimplified>> {
    return this.http.get<Paging<AlbumSimplified>>(this.config.baseUrl + '/v1/artists/' + id + '/albums', {
      params: {
        include_groups: includeGroups ? includeGroups.join(',') : null,
        market,
        limit: limit.toString(),
        offset: offset.toString()
      }
    });
  }

  getArtistsTopTracks(id: string, market: string): Observable<Track[]> {
    return this.http.get<TrackListResponse>(this.config.baseUrl + '/v1/artists/' + id + '/top-tracks', {
      params: {
        market: market
      }
    }).pipe(map((res: TrackListResponse): Track[] => {
      return res.tracks;
    }));
  }

  getArtistsRelatedArtists(id: string): Observable<Artist[]> {
    return this.http.get<ArtistListResponse>(this.config.baseUrl + '/v1/artists/' + id + '/related-artists', {
      params: {}
    }).pipe(map((res: ArtistListResponse): Artist[] => {
      return res.artists;
    }));
  }

  getArtists(ids: string[]): Observable<Artist[]> {
    if (ids == null || ids.length < 1) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }

    return this.http.get<ArtistListResponse>(this.config.baseUrl + '/v1/artists/', {
      params: {
        ids: ids.join(',')
      }
    }).pipe(map((res: ArtistListResponse): Artist[] => {
      return res.artists;
    }));
  }
}
