import { TestBed, inject } from '@angular/core/testing';

import { TrackService } from './track.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Track} from '../models';
import {AudioFeatures} from '../models';
import {AudioAnalysis} from '../models';

function getIds(count: number): string[] {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push((i + 1).toString());
  }
  return ids;
}

export const mockTracks: Track[] = [
  {
    id: '1',
    album: null,
    isPlayable: true,
    artists: [],
    name: 'Track01',
    availableMarkets: [],
    discNumber: 1,
    durationMs: 2465,
    explicit: false,
    externalIds: null,
    externalUrls: null,
    href: '',
    isLocal: false,
    linkedFrom: null,
    popularity: 100,
    previewUrl: '',
    restrictions: null,
    trackNumber: 1,
    type: 'track',
    uri: ''
  },
  {
    id: '2',
    album: null,
    isPlayable: true,
    artists: [],
    name: 'Track02',
    availableMarkets: [],
    discNumber: 1,
    durationMs: 2465,
    explicit: false,
    externalIds: null,
    externalUrls: null,
    href: '',
    isLocal: false,
    linkedFrom: null,
    popularity: 100,
    previewUrl: '',
    restrictions: null,
    trackNumber: 2,
    type: 'track',
    uri: ''
  }
];

describe('TrackService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TrackService,
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

  it('should be created', inject([TrackService], (service: TrackService) => {
    expect(service).toBeTruthy();
  }));

  describe('getTrack()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const id = '1234';
        const req$ = service.getTrack(id, 'DE');
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/tracks/${id}`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toEqual(true);

        const body: Track = mockTracks[0];
        req.flush(body);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const id = '1234';
        const req$ = service.getTrack(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/tracks/${id}`);
        });

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getAudioFeatures()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const id = '1234';
        const req$ = service.getAudioFeatures(id);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-features/${id}`);
        });

        expect(req.request.method).toEqual('GET');

        const body: AudioFeatures = {
          'durationMs' : 255349,
          'key' : 5,
          'mode' : 0,
          'timeSignature' : 4,
          'acousticness' : 0.514,
          'danceability' : 0.735,
          'energy' : 0.578,
          'instrumentalness' : 0.0902,
          'liveness' : 0.159,
          'loudness' : -11.840,
          'speechiness' : 0.0461,
          'valence' : 0.624,
          'tempo' : 98.002,
          'id' : '06AKEBrKUckW0KREUWRnvT',
          'uri' : 'spotify:track:06AKEBrKUckW0KREUWRnvT',
          'trackHref' : 'https://api.spotify.com/v1/tracks/06AKEBrKUckW0KREUWRnvT',
          'analysisUrl' : 'https://api.spotify.com/v1/audio-analysis/06AKEBrKUckW0KREUWRnvT',
          'type' : 'audio_features'
        };
        req.flush(body);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const id = '1234';
        const req$ = service.getAudioFeatures(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-features/${id}`);
        });

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getAudioAnalysis()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const id = '1234';
        const req$ = service.getAudioAnalysis(id);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-analysis/${id}`);
        });

        expect(req.request.method).toEqual('GET');

        const body: AudioAnalysis = {
          'bars': [],
          'beats': [],
          'sections': [],
          'segments': [],
          'tatums': [],
          'track': null
        };
        req.flush(body);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const id = '1234';
        const req$ = service.getAudioAnalysis(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-analysis/${id}`);
        });

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getTracks()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(mockTracks.length);
        const req$ = service.getTracks(ids, 'de');
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/tracks`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toEqual(true);
        expect(req.request.params.has('market')).toEqual(true);

        req.flush({
          tracks: mockTracks
        });
      })();
    });
    it('should return null if 0 uris given, without sending request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(0);
        const req$ = service.getTracks(ids);
        req$.subscribe((ret: any) => {
          expect(ret).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/tracks`);
        });
      })();
    });
    it('should return null if >50 ids given, without sending request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(51);
        const req$ = service.getTracks(ids);
        req$.subscribe((ret: any) => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/tracks`);
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(mockTracks.length);
        const req$ = service.getTracks(ids);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/tracks`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toEqual(true);
        expect(req.request.params.has('market')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getSeveralAudioFeatures()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(mockTracks.length);
        const req$ = service.getSeveralAudioFeatures(ids);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-features`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toEqual(true);

        req.flush({
          audioFeatures: []
        });
      })();
    });
    it('should return null if 0 uris given, without sending request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(0);
        const req$ = service.getSeveralAudioFeatures(ids);
        req$.subscribe((ret: any) => {
          expect(ret).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-features`);
        });
      })();
    });
    it('should return null if >100 ids given, without sending request', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(51);
        const req$ = service.getSeveralAudioFeatures(ids);
        req$.subscribe((ret: any) => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-features`);
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([TrackService], (service: TrackService) => {
        const ids = getIds(mockTracks.length);
        const req$ = service.getSeveralAudioFeatures(ids);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/audio-features`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
});
