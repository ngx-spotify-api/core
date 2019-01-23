import { TestBed, inject } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {Artist} from '../models';
import {HttpErrorResponse} from '@angular/common/http';
import {Paging} from '../models';
import {Album} from '../models';
import {mockAlbums} from './album.service.spec';
import {mockTracks} from './track.service.spec';
import {AlbumSimplified} from '../models';
import {Track} from '../models';
import {Observable} from 'rxjs';

export const mockArtists: Artist[] = [
  {
    id: '123456',
    name: 'MockArtist01',
    externalUrls: null,
    followers: null,
    genres: [],
    href: '',
    images: [],
    populariy: 100,
    type: 'artist',
    uri: ''
  }
];

describe('ArtistService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ArtistService,
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

  it('should be created', inject([ArtistService], (service: ArtistService) => {
    expect(service).toBeTruthy();
  }));

  describe('getArtist()', () => {
    it('return Artists with given id', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtist(mockArtists[0].id);
        ret$.subscribe((artist: Artist) => {
          expect(artist).toEqual(mockArtists[0]);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}`));
        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull('not empty body');
        req.flush(mockArtists[0]);
      })();
    });

    it('return Error if api returns error', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtist(mockArtists[0].id);
        ret$.subscribe((artist: Artist) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400);
          expect(error.error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}`));
        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toBeNull('not empty body');
        req.flush({
          'error': 400,
          'error_description': 'Some invalid request'
        }, { status: 400, statusText: 'BAD REQUEST'});
      })();
    });
  });

  describe('getArtistsAlbums()', () => {
    it('return Paging of Album of Artist', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsAlbums(mockArtists[0].id);
        ret$.subscribe((albums: Paging<AlbumSimplified>) => {
          expect(albums).toBeDefined();
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/albums`));
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('offset')).toBeTruthy();

        const body: Paging<Album> = {
          items: mockAlbums,
          total: mockAlbums.length,
          limit: 20,
          offset: 0,
          previous: null,
          next: null,
          href: ''
        };
        req.flush(body);
      })();
    });

    it('should apply parameters if given', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsAlbums(mockArtists[0].id, ['album', 'single'], 'de', 42,  42);
        ret$.subscribe((albums: Paging<AlbumSimplified>) => {
          expect(albums).toBeDefined();
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/albums`));
        expect(req.request.method).toEqual('GET');

        expect(req.request.params.has('include_groups')).toBeTruthy();
        expect(req.request.params.has('market')).toBeTruthy();
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('offset')).toBeTruthy();

        expect(req.request.params.get('include_groups')).toEqual('album,single');
        expect(req.request.params.get('market')).toEqual('de');
        expect(req.request.params.get('limit')).toEqual('42');
        expect(req.request.params.get('offset')).toEqual('42');


        const body: Paging<Album> = {
          items: mockAlbums,
          total: mockAlbums.length,
          limit: 42,
          offset: 42,
          previous: null,
          next: null,
          href: ''
        };
        req.flush(body);
      })();
    });

    it('return Error if api returns error', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsAlbums(mockArtists[0].id, ['album', 'single'], 'de', 42,  42);
        ret$.subscribe((albums: Paging<AlbumSimplified>) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400);
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/albums`));
        expect(req.request.method).toEqual('GET');
        req.flush({
          'error': 400,
          'error_description': 'Some invalid request'
        }, { status: 400, statusText: 'BAD REQUEST'});
      })();
    });
  });

  describe('getArtistsTopTracks()', () => {
    it('return Array of Tracks', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsTopTracks(mockArtists[0].id, 'de');
        ret$.subscribe((tracks: Track[]) => {
          expect(tracks).toBeDefined();
          expect(tracks.length).toEqual(mockTracks.length);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/top-tracks`));
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toBeTruthy();
        expect(req.request.params.get('market')).toEqual('de');

        const body = {
          tracks: mockTracks
        };
        req.flush(body);
      })();
    });

    it('return Error if api returns error', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsTopTracks(mockArtists[0].id, 'de');
        ret$.subscribe((tracks: Track[]) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400);
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/top-tracks`));
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toBeTruthy();
        expect(req.request.params.get('market')).toEqual('de');

        req.flush({
          'error': 400,
          'error_description': 'Some invalid request'
        }, { status: 400, statusText: 'BAD REQUEST'});
      })();
    });
  });

  describe('getArtistsRelatedArtists()', () => {
    it('return Array of Artists', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsRelatedArtists(mockArtists[0].id);
        ret$.subscribe((artists: Artist[]) => {
          expect(artists).toBeDefined();
          expect(artists.length).toEqual(mockArtists.length);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/related-artists`);
        });
        expect(req.request.method).toEqual('GET');

        const body = {
          artists: mockArtists
        };
        req.flush(body);
      })();
    });

    it('return Error if api returns error', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtistsRelatedArtists(mockArtists[0].id);
        ret$.subscribe((artists: Artist[]) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400);
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/artists/${mockArtists[0].id}/related-artists`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({
          'error': 400,
          'error_description': 'Some invalid request'
        }, { status: 400, statusText: 'BAD REQUEST'});
      })();
    });
  });

  describe('getArtists()', () => {
    it('returns Artist[] when successful http request', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtists(mockArtists.map((a: Artist) => a.id));
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((artists: Artist[]): void => {
          expect(artists).not.toBeNull();
          expect(artists.length).toEqual(mockArtists.length);
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists`));
        expect(req.request.params.has('ids')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush({
          artists: mockArtists
        });
      })();
    });

    it('returns not when not successful http request', (done: DoneFn) => {
      inject([ArtistService], (service: ArtistService) => {
        const ret$ = service.getArtists(mockArtists.map((a: Artist) => a.id));
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe(
          (artist: Artist[]): void => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/artists`));
        expect(req.request.params.has('ids')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });

    it('returns null when more than 50 ids given, without sending a request',
      (done: DoneFn) => {
        inject([ArtistService], (service: ArtistService) => {
          const ids: string[] = [];
          for (let i = 0; i <= 50; i++) {
            ids.push((i + 1).toString());
          }

          const ret$ = service.getArtists(ids);
          expect(ret$ instanceof Observable).toEqual(true);
          ret$.subscribe((artists: Artist[]): void => {
            expect(artists).toBeNull();
            done();
          }, () => {
            fail();
            done();
          });

          httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/artists`));
        })();
      }
    );

    it('returns [] when no ids given, without sending a request',
      (done: DoneFn) => {
        inject([ArtistService], (service: ArtistService) => {
          const ids: string[] = [];
          const ret$ = service.getArtists(ids);
          expect(ret$ instanceof Observable).toEqual(true);
          ret$.subscribe((artists: Artist[]): void => {
            expect(artists).toEqual([]);
            done();
          }, () => {
            fail();
            done();
          });

          httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/artists`));
        })();
      }
    );
  });
});
