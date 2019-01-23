import { TestBed, inject } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {Playlist} from '../models';
import {PlaylistSimplified} from '../models';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Paging} from '../models';
import {PlaylistTrack} from '../models';
import {Image} from '../models';

function getIds(count: number): string[] {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push((i + 1).toString());
  }
  return ids;
}

export const mockPlaylists: Playlist[] = [
  {
    id: '1234',
    name: 'Playlist01',
    images: [],
    owner: null,
    collaborative: false,
    public: false,
    externalUrls: null,
    href: '',
    snapshotId: '',
    tracks: null,
    type: 'playlist',
    uri: '',
    followers: null,
    description: ''
  }
];
export const mockSimplifiedPlaylists: PlaylistSimplified[] = [
  {
    id: '1234',
    name: 'Playlist01',
    images: [],
    owner: null,
    collaborative: false,
    public: false,
    externalUrls: null,
    href: '',
    snapshotId: '',
    tracks: null,
    type: 'playlist',
    uri: ''
  },
  {
    id: '1235',
    name: 'Playlist02',
    images: [],
    owner: null,
    collaborative: false,
    public: false,
    externalUrls: null,
    href: '',
    snapshotId: '',
    tracks: null,
    type: 'playlist',
    uri: ''
  },
  {
    id: '1236',
    name: 'Playlist03',
    images: [],
    owner: null,
    collaborative: false,
    public: false,
    externalUrls: null,
    href: '',
    snapshotId: '',
    tracks: null,
    type: 'playlist',
    uri: ''
  }
];

describe('PlaylistService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PlaylistService,
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

  it('should be created', inject([PlaylistService], (service: PlaylistService) => {
    expect(service).toBeTruthy();
  }));

  describe('addTracksToPlaylist()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.addTracksToPlaylist(id, ['bla', 'foo', 'bar'], 0);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.method).toEqual('POST');
        expect(req.request.body['uris']).toBeDefined();
        expect(req.request.body['position']).toBeDefined();

        req.flush({
          'snapshotId' : 'JbtmHBDBAYu3/bt8BOXKjzKx3i0b6LCa/wVjyl6qQ2Yf6nFXkbmzuEa+ZI/U1yF+'
        }, { status: 201, statusText: 'CREATED'});
      })();
    });
    it('should return null if 0 uris given, without sending request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const uris = getIds(0);
        const req$ = service.addTracksToPlaylist(id, uris, 0);
        req$.subscribe((ret: any) => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });
      })();
    });
    it('should return null if >100 uris given, without sending request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const uris = getIds(101);
        const req$ = service.addTracksToPlaylist(id, uris, 0);
        req$.subscribe((ret: any) => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.addTracksToPlaylist(id, ['bla', 'foo', 'bar'], 0);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.method).toEqual('POST');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('removeTracksFromPlaylist()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.removeTracksFromPlaylist(id, ['bla', 'foo', 'bar']);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body['tracks']).toBeDefined();

        req.flush({
          'snapshotId' : 'JbtmHBDBAYu3/bt8BOXKjzKx3i0b6LCa/wVjyl6qQ2Yf6nFXkbmzuEa+ZI/U1yF+'
        });
      })();
    });
    it('should return null if 0 uris given, without sending request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const uris = getIds(0);
        const req$ = service.removeTracksFromPlaylist(id, uris);
        req$.subscribe((ret: any) => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });
      })();
    });
    it('should return null if >100 uris given, without sending request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const uris = getIds(101);
        const req$ = service.removeTracksFromPlaylist(id, uris);
        req$.subscribe((ret: any) => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.removeTracksFromPlaylist(id, ['bla', 'foo', 'bar']);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.method).toEqual('DELETE');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getPlaylist()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = mockPlaylists[0].id;
        const req$ = service.getPlaylist(id, 'de');
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toEqual(true);

        req.flush(mockPlaylists[0]);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = mockPlaylists[0].id;
        const req$ = service.getPlaylist(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}`);
        });

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getPlaylistTracks()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = mockPlaylists[0].id;
        const req$ = service.getPlaylistTracks(id, 'de', 100, 0);
        req$.subscribe((ret: Paging<PlaylistTrack>) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: Paging<PlaylistTrack> = {
          items: [],
          total: 0,
          limit: 100,
          offset: 0,
          previous: null,
          next: null,
          href: ''
        };
        req.flush(body);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = mockPlaylists[0].id;
        const req$ = service.getPlaylistTracks(id, 'de');
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('market')).toEqual(true);
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getPlaylistCover()', () => {
    it('should send valid request', (done: DoneFn) => {
    inject([PlaylistService], (service: PlaylistService) => {
      const id = '1234';
      const req$ = service.getPlaylistCover(id);
      req$.subscribe((ret: any) => {
        expect(ret).toBeDefined();
        done();
      }, (error: HttpErrorResponse) => {
        fail();
        done();
      });

      const req = httpTestingController.expectOne((reqToTest) => {
        return reqToTest.url.includes(`/v1/playlists/${id}/images`);
      });

      expect(req.request.method).toEqual('GET');

      const body: Image[] = [
        {
          height: 1000,
          width: 1000,
          url: ''
        }
      ];
      req.flush(body);
    })();
  });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.getPlaylistCover(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/images`);
        });

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    }); });
  describe('uploadPlaylistCover()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.uploadPlaylistCover(id, 'sdafdjhsagdhgsagdasjds');
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/images`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('image/jpeg');
        expect(req.request.method).toEqual('PUT');

        req.flush({}, { status: 202, statusText: 'ACCEPTED'});
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.uploadPlaylistCover(id, 'sdafdjhsagdhgsagdasjds');
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/images`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('image/jpeg');
        expect(req.request.method).toEqual('PUT');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getOwnPlaylists()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const req$ = service.getOwnPlaylists(50, 0);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/playlists`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: Paging<PlaylistSimplified> = {
          items: mockSimplifiedPlaylists,
          total: mockSimplifiedPlaylists.length,
          limit: 50,
          offset: 0,
          previous: null,
          next: null,
          href: ''
        };
        req.flush(body);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const req$ = service.getOwnPlaylists();
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me/playlists`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('updateDetails()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.updateDetails(id, 'TEST', true, false, '');
        req$.subscribe((ret: any) => {
          expect(ret).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('PUT');

        req.flush({});
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.updateDetails(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('PUT');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    }); });
  describe('getUsersPlaylists()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.getUsersPlaylists(id, 20, 0);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/users/${id}/playlists`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: Paging<PlaylistSimplified> = {
          items: mockSimplifiedPlaylists,
          total: mockSimplifiedPlaylists.length,
          limit: 50,
          offset: 0,
          previous: null,
          next: null,
          href: ''
        };
        req.flush(body);
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.getUsersPlaylists(id);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/users/${id}/playlists`);
        });

        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('replacePlaylistTracks()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const uris = getIds(20);
        const req$ = service.replacePlaylistTracks(id, uris);
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('PUT');

        req.flush({}, { status: 201, statusText: 'CREATED'});
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const uris = getIds(20);
        const req$ = service.replacePlaylistTracks(id, uris);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('PUT');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('createPlaylists()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.createPlaylists(id, 'TEST', true, false, '');
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/users/${id}/playlists`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('POST');

        req.flush(mockPlaylists[0], { status: 201, statusText: 'CREATED'});
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.createPlaylists(id, 'TEST', true, false);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/users/${id}/playlists`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('POST');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('reorderPlaylistTracks()', () => {
    it('should send valid request', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.reorderPlaylistTracks(id, 1, 4, 10, '1234244');
        req$.subscribe((ret: any) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('PUT');

        req.flush({
          'snapshotId' : 'JbtmHBDBAYu3/bt8BOXKjzKx3i0b6LCa/wVjyl6qQ2Yf6nFXkbmzuEa+ZI/U1yF+'
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PlaylistService], (service: PlaylistService) => {
        const id = '1234';
        const req$ = service.reorderPlaylistTracks(id, 1, 4, 10);
        req$.subscribe((ret: any) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/playlists/${id}/tracks`);
        });

        expect(req.request.headers.get('Content-Type')).toEqual('application/json');
        expect(req.request.method).toEqual('PUT');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
});
