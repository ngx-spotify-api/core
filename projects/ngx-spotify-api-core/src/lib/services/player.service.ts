import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../models';
import {map, take} from 'rxjs/operators';
import {CursorPaging} from '../models';
import {PlayHistory} from '../models';
import {Playback} from '../models';
import {TrackCurrent} from '../models';
import {ApiConfig} from '../models';

class DeviceList {
  devices: Device[];
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public nextTrack(deviceId?: string): Observable<boolean> {
    return this.http.post(this.config.baseUrl + `/v1/me/player/next`, {}, {
      params: {
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public previousTrack(deviceId?: string): Observable<boolean> {
    return this.http.post(this.config.baseUrl + `/v1/me/player/previous`, {}, {
      params: {
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public seekToPosition(positionMs: number, deviceId?: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player/seek`, {}, {
      params: {
        position_ms: positionMs.toString(),
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public getAvailableDevices(): Observable<Device[]> {
    return this.http.get<DeviceList>(this.config.baseUrl + `/v1/me/player/devices`).pipe(map((list: DeviceList) => list.devices));
  }

  public toggleShuffle(shuffle: boolean, deviceId?: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player/shuffle`, {}, {
      params: {
        state: shuffle.toString(),
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  /**
   *
   * @param deviceIds Although an array is accepted, only a single deviceId is currently supported
   * @param forcePlay
   */
  public transferPlayback(deviceIds: string[], forcePlay: boolean = false): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player`, {
      device_ids: deviceIds.join(','),
      play: forcePlay
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public getRecentlyPlayedTracks(limit: number = 20, before?: number, after: number = 0): Observable<CursorPaging<PlayHistory>> {
    return this.http.get<CursorPaging<PlayHistory>>(this.config.baseUrl + `/v1/me/player/recently-played`, {
      params: {
        limit: limit.toString(),
        before: (before ? before.toString() : undefined),
        after: after.toString(),
      }
    });
  }

  public startPlayback(deviceId?: string, context?: string, uris?: string[], offset?: any, positionMs?: number): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player/play`, {
      context_uri: context,
      uris: uris,
      offset: offset,
      position_ms: positionMs
    }, {
      params: {
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public pausePlayback(deviceId?: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player/pause`, {}, {
      params: {
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public toggleRepeatMode(mode: 'track' | 'context' | 'off', deviceId?: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player/repeat`, {}, {
      params: {
        state: mode,
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }

  public getPlayback(market?: string): Observable<Playback> {
    return this.http.get<Playback>(this.config.baseUrl + `/v1/me/player`, {
      params: {
        market: market
      }
    });
  }

  public getCurrentlyPlayingTrack(market?: string): Observable<TrackCurrent> {
    return this.http.get<TrackCurrent>(this.config.baseUrl + `/v1/me/player/currently-playing`, {
      params: {
        market: market
      }
    });
  }

  public setPlaybackVolume(volume: number, deviceId?: string): Observable<boolean> {
    return this.http.put(this.config.baseUrl + `/v1/me/player/volume`, {}, {
      params: {
        volume_percent: volume.toString(),
        device_id: deviceId
      }
    }).pipe(
      take(1),
      map(() => {
        return true;
      })
    );
  }
}
