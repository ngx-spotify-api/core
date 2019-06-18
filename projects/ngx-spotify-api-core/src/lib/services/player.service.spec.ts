import { TestBed, inject } from '@angular/core/testing';

import { PlayerService } from './player.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {HttpErrorResponse} from '@angular/common/http';
import {Device} from '../models';
import {CursorPaging} from '../models';
import {PlayHistory} from '../models';
import {Playback} from '../models';
import {TrackCurrent} from '../models';

describe('PlayerService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PlayerService,
        {
          provide: ApiConfig,
          useValue: { baseUrl: baseUrl }
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));

  describe('nextTrack()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const id = '1234';
        service.nextTrack(id).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/next`);
        });

        expect(req.request.method).toEqual('POST');
        expect(req.request.params.has('device_id')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const id = '1234';
        service.nextTrack(id).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/next`);
        });

        expect(req.request.method).toEqual('POST');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('previousTrack()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const id = '1234';
        service.previousTrack(id).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/previous`);
        });

        expect(req.request.method).toEqual('POST');

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const id = '1234';
        service.previousTrack(id).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/previous`);
        });

        expect(req.request.method).toEqual('POST');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('seekToPosition()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const position = 12000;
        service.seekToPosition(position).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/seek`);
        });

        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.get('position_ms')).toEqual(position.toString());

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const id = '1234';
        const position = 12000;
        service.seekToPosition(position, id).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/seek`);
        });

        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.get('position_ms')).toEqual(position.toString());
        expect(req.request.params.get('device_id')).toEqual(id);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getAvailableDevices()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        service.getAvailableDevices().subscribe((devices: Device[]) => {
          expect(devices).toBeDefined();
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/device`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({
          devices: []
        });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        service.getAvailableDevices().subscribe((devices: Device[]) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/device`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('toggleShuffle()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        service.toggleShuffle(true).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/shuffle`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('state')).toEqual(true);

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        service.toggleShuffle(false, '1234').subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/shuffle`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('state')).toEqual(true);
        expect(req.request.params.has('device_id')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('transferPlayback()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.transferPlayback(['1234'], true);
        req$.subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body['device_ids']).toBeDefined();
        expect(req.request.body['play']).toBeDefined();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.transferPlayback(['1234']);
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body['device_ids']).toBeDefined();
        expect(req.request.body['play']).toBeDefined();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getRecentlyPlayedTracks()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.getRecentlyPlayedTracks();
        req$.subscribe((ret: CursorPaging<PlayHistory>) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/recently-played`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);

        const body: CursorPaging<PlayHistory> = {
          items: [],
          total: 0,
          limit: 50,
          cursors: null,
          next: null,
          href: ''
        };
        req.flush(body);
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.getRecentlyPlayedTracks(50, 1200000, 120000000000000000);
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/recently-played`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('before')).toEqual(true);
        expect(req.request.params.has('after')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('startPlayback()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.startPlayback('1234', 'spotify:album:12234', undefined, { position: 5 }, 120000);
        req$.subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/play`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('device_id')).toEqual(true);
        expect(req.request.body['context_uri']).toBeDefined();
        expect(req.request.body['offset']).toBeDefined();
        expect(req.request.body['position_ms']).toBeDefined();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.startPlayback('1234', undefined, ['spotify:track:12234', 'spotify:track:12245']);
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/play`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('device_id')).toEqual(true);
        expect(req.request.body['uris']).toBeDefined();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('pausePlayback()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.pausePlayback('1234');
        req$.subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/pause`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('device_id')).toEqual(true);

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.pausePlayback();
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/pause`);
        });
        expect(req.request.method).toEqual('PUT');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('toggleRepeatMode()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.toggleRepeatMode('context', '1234');
        req$.subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/repeat`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('state')).toEqual(true);
        expect(req.request.params.has('device_id')).toEqual(true);

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.toggleRepeatMode('track');
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/repeat`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('state')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getPlayback()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.getPlayback('de');
        req$.subscribe((ret: Playback) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toEqual(true);

        const body: Playback = {
          context: null,
          currentlyPlayingType: 'track',
          device: null,
          isPlaying: true,
          item: null,
          progressMs: 12000,
          repeatState: 'off',
          shuffleState: false,
          timestamp: 1490252122574
        };
        req.flush(body);
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.getPlayback();
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getCurrentlyPlayingTrack()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.getCurrentlyPlayingTrack('de');
        req$.subscribe((ret: TrackCurrent) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/currently-playing`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toEqual(true);

        const body: TrackCurrent = {
          context: null,
          currentlyPlayingType: 'track',
          isPlaying: true,
          item: null,
          progressMs: 120000,
          timestamp: 173213897
        };
        req.flush(body);
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.getCurrentlyPlayingTrack();
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/currently-playing`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('setPlaybackVolume()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.setPlaybackVolume(90, '1234');
        req$.subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/volume`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('volume_percent')).toEqual(true);
        expect(req.request.params.has('device_id')).toEqual(true);

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([PlayerService], (service: PlayerService) => {
        const req$ = service.setPlaybackVolume(80);
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/player/volume`);
        });
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('volume_percent')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
});
