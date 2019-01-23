import { TestBed, inject } from '@angular/core/testing';

import { AlbumService } from './album.service';
import {Observable} from 'rxjs';
import {Album} from '../models';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {HttpErrorResponse} from '@angular/common/http';
import {Track} from '../models';
import {Paging} from '../models';
import {AlbumSimplified} from '../models';
import {mockTracks} from './track.service.spec';

let httpTestingController: HttpTestingController;
const albumIds: string[] = ['ihadkshkdhakd', 'jskjassjasn'];
const market = 'de';

export const mockAlbums: Album[] = [
  {
    id: albumIds[0],
    artists: [],
    albumType: 'album',
    availableMarkets: [market],
    copyrights: [],
    externalIds: null,
    externalUrls: null,
    genres: [],
    href: '',
    images: [],
    label: '',
    name: '',
    popularity: 100,
    releaseDate: '',
    releaseDatePrecision: 'year',
    restrictions: {
      reason: ''
    },
    tracks: {
      href: '',
      items: [],
      limit: 20,
      offset: 0,
      previous: '',
      next: '',
      total: 20
    },
    type: 'album',
    uri: ''
  },
  {
    id: albumIds[1],
    artists: [],
    albumType: 'album',
    availableMarkets: [market],
    copyrights: [],
    externalIds: null,
    externalUrls: null,
    genres: [],
    href: '',
    images: [],
    label: '',
    name: '',
    popularity: 100,
    releaseDate: '',
    releaseDatePrecision: 'year',
    restrictions: {
      reason: ''
    },
    tracks: {
      href: '',
      items: [],
      limit: 20,
      offset: 0,
      previous: '',
      next: '',
      total: 20
    },
    type: 'album',
    uri: ''
  }
];

export const mockSimplifiedAlbums: AlbumSimplified[] = [
  {
    id: '1234',
    artists: [],
    albumGroup: 'album',
    albumType: 'album',
    availableMarkets: [],
    externalUrls: null,
    href: '',
    images: [],
    name: 'Album01',
    releaseDate: '',
    releaseDatePrecision: 'year',
    restrictions: null,
    type: 'album',
    uri: ''
  },
  {
    id: '1235',
    artists: [],
    albumGroup: 'album',
    albumType: 'album',
    availableMarkets: [],
    externalUrls: null,
    href: '',
    images: [],
    name: 'Album02',
    releaseDate: '',
    releaseDatePrecision: 'year',
    restrictions: null,
    type: 'album',
    uri: ''
  }
];

describe('AlbumService', () => {
  const baseUrl = 'http://localhost:4200';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AlbumService,
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

  it('should be created', inject([AlbumService], (service: AlbumService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAlbum() ', () => {
    it('returns Album when successful http request', (done: DoneFn) => {
      inject([AlbumService], (service: AlbumService) => {
        const ret$ = service.getAlbum(albumIds[0], market);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((album: Album): void => {
          expect(album).not.toBeNull();
          expect(album.id).toEqual(albumIds[0]);
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/albums/${albumIds[0]}`));
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush(mockAlbums[0]);
      })();
    });

    it('returns not when not successful http request', (done: DoneFn) => {
      inject([AlbumService], (service: AlbumService) => {
        const ret$ = service.getAlbum(albumIds[0], market);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe(
          (album: Album): void => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/albums/${albumIds[0]}`));
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getAlbumTracks()', () => {
    it('returns Paging of Track when successful http request', (done: DoneFn) => {
      inject([AlbumService], (service: AlbumService) => {
        const tracks$ = service.getAlbumTracks(albumIds[1]);
        expect(tracks$ instanceof Observable).toEqual(true);

        tracks$.subscribe((ret: Paging<Track>) => {
          expect(ret.items.length).toEqual(mockTracks.length);
          expect(ret.offset).toEqual(0);
          expect(ret.limit).toEqual(20);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/albums/${albumIds[1]}/tracks`));
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('market')).toEqual(undefined);
        expect(req.request.params.get('limit')).toEqual('20');
        expect(req.request.params.get('offset')).toEqual('0');
        const body: Paging<Track> = {
          items: mockTracks,
          total: mockTracks.length,
          limit: 20,
          offset: 0,
          next: null,
          previous: null,
          href: ''
        };
        req.flush(body);
      })();
    });

    it('returns not when not successful http request', (done: DoneFn) => {
      inject([AlbumService], (service: AlbumService) => {
        const ret$ = service.getAlbumTracks(albumIds[1]);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe(
          (album: Paging<Track>): void => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/albums/${albumIds[1]}/tracks`));
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getAlbums()', () => {
    it('returns Album[] when successful http request', (done: DoneFn) => {
      inject([AlbumService], (service: AlbumService) => {
        const ret$ = service.getAlbums(albumIds, market);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((albums: Album[]): void => {
          expect(albums).not.toBeNull();
          expect(albums.length).toEqual(albumIds.length);
          for (let i = 0; i < albums.length; i++) {
            expect(albums[i].id).toEqual(albumIds[i]);
          }
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/albums`));
        expect(req.request.params.has('ids')).toEqual(true);
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush({
          albums: mockAlbums
        });
      })();
    });

    it('returns not when not successful http request', (done: DoneFn) => {
      inject([AlbumService], (service: AlbumService) => {
        const ret$ = service.getAlbums(albumIds, market);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe(
          (album: Album[]): void => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/albums`));
        expect(req.request.params.has('ids')).toEqual(true);
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });

    it('returns null when more than 20 ids given, without sending a request', (done: DoneFn) => {
        inject([AlbumService], (service: AlbumService) => {
          const ids: string[] = [
            'foo', 'bar', 'foo', 'bar', 'foo', 'bar', 'foo', 'bar', 'foo', 'bar',
            'foo', 'bar', 'foo', 'bar', 'foo', 'bar', 'foo', 'bar', 'foo', 'bar',
            'foo'
          ];

          const ret$ = service.getAlbums(ids, market);
          expect(ret$ instanceof Observable).toEqual(true);
          ret$.subscribe((albums: Album[]): void => {
            expect(albums).toBeNull();
            done();
          });

          httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/albums`));
        })();
      });

    it('returns [] when no ids given, without sending a request',(done: DoneFn) => {
        inject([AlbumService], (service: AlbumService) => {
          const ids: string[] = [];
          const ret$ = service.getAlbums(ids, market);
          expect(ret$ instanceof Observable).toEqual(true);
          ret$.subscribe((albums: Album[]): void => {
            expect(albums).toEqual([]);
            done();
          });

          httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/albums`));
        })();
      });
  });
});
