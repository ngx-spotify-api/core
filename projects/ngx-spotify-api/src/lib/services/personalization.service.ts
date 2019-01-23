import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {Paging} from '../models';
import {Artist} from '../models';
import {HttpClient} from '@angular/common/http';
import {Track} from '../models';
import {ApiConfig} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PersonalizationService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public getTopArtists(limit: number = 20, offset: number = 0, timeRange?: 'long_term' | 'medium_term' | 'short_term'): Observable<Paging<Artist>> {
    return this.http.get<Paging<Artist>>(this.config.baseUrl + `/v1/me/top/artists`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
        time_range: timeRange
      }
    });
  }
  public getTopTracks(limit: number = 20, offset: number = 0, timeRange?: 'long_term' | 'medium_term' | 'short_term'): Observable<Paging<Track>> {
    return this.http.get<Paging<Track>>(this.config.baseUrl + `/v1/me/top/tracks`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
        time_range: timeRange
      }
    });
  }
}
