import { TestBed, inject } from '@angular/core/testing';

import { LibraryService } from './library.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {Album} from '../models';
import {Paging} from '../models';
import {mockAlbums} from './album.service.spec';
import {Track} from '../models';
import {mockTracks} from './track.service.spec';

function getIds(count: number): string[] {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push((i + 1).toString());
  }
  return ids;
}

describe('LibraryService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LibraryService,
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

  it('should be created', inject([LibraryService], (service: LibraryService) => {
    expect(service).toBeTruthy();
  }));
  describe('areSavedAlbums()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.areSavedAlbums(ids).subscribe((success: boolean[]) => {
          expect(success.length).toEqual(ids.length);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums/contains`);
        }));

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush(ids.map(() => true));
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.areSavedAlbums(ids).subscribe((success: boolean[]) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums/contains`);
        }));

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
    it('return [] if no ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(0);
        service.areSavedAlbums(ids).subscribe((success: boolean[]) => {
          expect(success).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums/contains`);
        }));
      })();
    });
    it('return null if >50 ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(51);
        service.areSavedAlbums(ids).subscribe((success: boolean[]) => {
          expect(success).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums/contains`);
        }));
      })();
    });
  });
  describe('areSavedTracks()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.areSavedTracks(ids).subscribe((success: boolean[]) => {
          expect(success.length).toEqual(ids.length);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks/contains`);
        }));

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush(ids.map(() => true));
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.areSavedTracks(ids).subscribe((success: boolean[]) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks/contains`);
        }));

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
    it('return [] if no ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(0);
        service.areSavedTracks(ids).subscribe((success: boolean[]) => {
          expect(success).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks/contains`);
        }));
      })();
    });
    it('return null if >50 ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(51);
        service.areSavedTracks(ids).subscribe((success: boolean[]) => {
          expect(success).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks/contains`);
        }));
      })();
    });
  });
  describe('getSavedAlbums()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        service.getSavedAlbums().subscribe((res: Paging<Album>) => {
          expect(res).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne( reqToTest => {
          return reqToTest.url.includes(`/v1/me/albums`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('offset')).toBeTruthy();

        req.flush({
          items: mockAlbums,
          total: mockAlbums.length,
          limit: 20,
          offset: 0,
          previous: null,
          next: null,
          href: null
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        service.getSavedAlbums(20, 0, 'de').subscribe((res: Paging<Album>) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne( reqToTest => {
          return reqToTest.url.includes(`/v1/me/albums`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('offset')).toBeTruthy();
        expect(req.request.params.has('market')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getSavedTracks()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        service.getSavedTracks().subscribe((res: Paging<Track>) => {
          expect(res).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne( reqToTest => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('offset')).toBeTruthy();

        req.flush({
          items: mockTracks,
          total: mockTracks.length,
          limit: 20,
          offset: 0,
          previous: null,
          next: null,
          href: null
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        service.getSavedTracks(20, 0, 'de').subscribe((res: Paging<Track>) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne( reqToTest => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        });

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('offset')).toBeTruthy();
        expect(req.request.params.has('market')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('saveAlbums()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.saveAlbums(ids).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));

        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.saveAlbums(ids).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));

        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
    it('return false if no ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(0);
        service.saveAlbums(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));
      })();
    });
    it('return false if >50 ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(51);
        service.saveAlbums(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));
      })();
    });
  });
  describe('removeAlbums()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.removeAlbums(ids).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.removeAlbums(ids).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
    it('return false if no ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(0);
        service.removeAlbums(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));
      })();
    });
    it('return false if >50 ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(51);
        service.removeAlbums(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/albums`);
        }));
      })();
    });
  });
  describe('saveTracks()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.saveTracks(ids).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));

        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.saveTracks(ids).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));

        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
    it('return false if no ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(0);
        service.saveTracks(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));
      })();
    });
    it('return false if >50 ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(51);
        service.saveTracks(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));
      })();
    });
  });
  describe('removeTracks()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.removeTracks(ids).subscribe((success: boolean) => {
          expect(success).toEqual(true);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(50);
        service.removeTracks(ids).subscribe((success: boolean) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
    it('return false if no ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(0);
        service.removeTracks(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));
      })();
    });
    it('return false if >50 ids given, without sending request', (done: DoneFn) => {
      inject([LibraryService], (service: LibraryService) => {
        const ids = getIds(51);
        service.removeTracks(ids).subscribe((success: boolean) => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail(error.message);
          done();
        });

        httpTestingController.expectNone(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/tracks`);
        }));
      })();
    });
  });
});
