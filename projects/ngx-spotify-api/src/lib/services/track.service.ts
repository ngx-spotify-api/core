import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Track} from '../models';
import {AudioFeatures} from '../models';
import {AudioAnalysis} from '../models';
import {map} from 'rxjs/operators';
import {ApiConfig} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public getTrack(id: string, market?: string): Observable<Track> {
    return this.http.get<Track>(this.config.baseUrl + `/v1/tracks/${id}`, {
      params: {
        market
      }
    });
  }

  public getAudioFeatures(id: string): Observable<AudioFeatures> {
    return this.http.get<AudioFeatures>(this.config.baseUrl + `/v1/audio-features/${id}`);
  }

  public getAudioAnalysis(id: string): Observable<AudioAnalysis> {
    return this.http.get<AudioAnalysis>(this.config.baseUrl + `/v1/audio-analysis/${id}`);
  }

  public getTracks(ids: string[], market?: string): Observable<Track[]> {
    if (ids === undefined || ids === null || ids.length === 0) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }

    return this.http.get<{tracks: Track[]}>(this.config.baseUrl + `/v1/tracks`, {
      params: {
        ids: ids.join(','),
        market: market || ''
      }
    }).pipe(map(({ tracks }): Track[] => tracks));
  }

  public getSeveralAudioFeatures(ids: string[]): Observable<AudioFeatures[]> {
    if (ids === undefined || ids === null || ids.length === 0) {
      return of([]);
    } else if (ids.length > 50) {
      return of(null);
    }

    return this.http.get<{audioFeatures: AudioFeatures[]}>(this.config.baseUrl + `/v1/audio-features`, {
      params: {
        ids: ids.join(',')
      }
    }).pipe(map(({ audioFeatures }): AudioFeatures[] => audioFeatures));
  }
}
