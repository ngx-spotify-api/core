import { TestBed, inject } from '@angular/core/testing';

import { FollowService } from './follow.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {mockArtists} from './artist.service.spec';
import {Artist} from '../models';
import {HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mockPlaylists} from './playlist.service.spec';
import {CursorPaging} from '../models';

function getIds(count: number): string[] {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push((i + 1).toString());
  }
  return ids;
}

describe('FollowService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FollowService,
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

  it('should be created', inject([FollowService], (service: FollowService) => {
    expect(service).toBeTruthy();
  }));

  describe('isFollowingArtists()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        service
          .isFollowingArtists(mockArtists.map((artist: Artist) => artist.id))
          .subscribe(
            (res: boolean[]) => {
              expect(res).toBeDefined();
              done();
            }, (error: HttpErrorResponse) => {
              fail();
              done();
            }
          );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following/contains`);
        });
        expect(req.request.params.has('ids')).toBeTruthy();
        expect(req.request.params.get('type')).toEqual('artist');

        req.flush(mockArtists.map(() => true));
      })();
    });
    it('returns null when more than 50 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(51);

        const ret$ = service.isFollowingArtists(ids);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((ret: boolean[]): void => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following/contains`));
      })();
    });
    it('returns [] when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = [];
        const ret$ = service.isFollowingArtists(ids);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((ret: boolean[]): void => {
          expect(ret).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following/contains`));
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(10);
        service
          .isFollowingArtists(ids)
          .subscribe(
            (res: boolean[]) => {
              fail();
              done();
            }, (error: HttpErrorResponse) => {
              expect(error).toBeDefined();
              done();
            }
          );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following/contains`);
        });
        expect(req.request.params.has('ids')).toBeTruthy();
        expect(req.request.params.get('type')).toEqual('artist');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('isFollowingUsers()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        service
          .isFollowingUsers(mockArtists.map((artist: Artist) => artist.id))
          .subscribe(
            (res: boolean[]) => {
              expect(res).toBeDefined();
              done();
            }, (error: HttpErrorResponse) => {
              fail();
              done();
            }
          );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following/contains`);
        });
        expect(req.request.params.has('ids')).toBeTruthy();
        expect(req.request.params.get('type')).toEqual('user');

        req.flush(mockArtists.map(() => true));
      })();
    });
    it('returns null when more than 50 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(51);

        const ret$ = service.isFollowingUsers(ids);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((ret: boolean[]): void => {
          expect(ret).toBeNull();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following/contains`));
      })();
    });
    it('returns [] when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = [];
        const ret$ = service.isFollowingUsers(ids);
        expect(ret$ instanceof Observable).toEqual(true);
        ret$.subscribe((ret: boolean[]): void => {
          expect(ret).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following/contains`));
      })();
    });
  });
  describe('areFollowingPlaylist()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(5);
        service
          .areFollowingPlaylist(mockPlaylists[0].id, ids)
          .subscribe(
            (res: boolean[]) => {
              expect(res).toBeDefined();
              done();
            }, (error: HttpErrorResponse) => {
              fail();
              done();
            }
          );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/playlists/${mockPlaylists[0].id}/followers/contains`);
        });
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush(ids.map(() => true));
      })();
    });
    it('returns null when more than 5 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(6);
        service
          .areFollowingPlaylist(mockPlaylists[0].id, ids)
          .subscribe((ret: boolean[]): void => {
            expect(ret).toBeNull();
            done();
          }, (error: HttpErrorResponse) => {
            fail();
            done();
          }
          );

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/playlists/${mockPlaylists[0].id}/followers/contains`));
      })();
    });
    it('returns [] when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(0);
        service.areFollowingPlaylist(mockPlaylists[0].id, ids).subscribe((ret: boolean[]): void => {
          expect(ret).toEqual([]);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/playlists/${mockPlaylists[0].id}/followers/contains`));
      })();
    });
  });
  describe('followArtists()', () => {
    it('send valid request and return true', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(50);
        service.followArtists(ids).subscribe((success: boolean): void => {
            expect(success).toEqual(true);
            done();
          },
          () => {
            fail();
            done();
          }
          );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/me/following`));
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('ids')).toBeTruthy();
        expect(req.request.params.get('type')).toEqual('artist');

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('returns false when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(0);
        service.followArtists(ids).subscribe((success: boolean): void => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following`));
      })();
    });
    it('returns false when >50 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(51);
        service.followArtists(ids).subscribe((success: boolean): void => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following`));
      })();
    });
  });
  describe('followUsers()', () => {
    it('send valid request and return true', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(50);
        service.followUsers(ids).subscribe((success: boolean): void => {
            expect(success).toEqual(true);
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/me/following`));
        expect(req.request.method).toEqual('PUT');
        expect(req.request.params.has('ids')).toBeTruthy();
        expect(req.request.params.get('type')).toEqual('user');

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('returns false when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(0);
        service.followUsers(ids).subscribe((success: boolean): void => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following`));
      })();
    });
    it('returns false when >50 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(51);
        service.followUsers(ids).subscribe((success: boolean): void => {
          expect(success).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => reqToTest.url.includes(`/v1/me/following`));
      })();
    });
  });
  describe('followPlaylist()', () => {
    it('send valid request and return true', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const id = '1234';
        service.followPlaylist(id, true).subscribe((success: boolean): void => {
            expect(success).toEqual(true);
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/playlists/${id}/followers`));
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body['public']).toBeDefined();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const id = '1234';
        const ret$ = service.followPlaylist(id);
        ret$.subscribe(() => {
            fail();
            done();
          }, (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/playlists/${id}/followers`));
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body['public']).toBeDefined();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getFollowedArtists()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        service.getFollowedArtists().subscribe((res: CursorPaging<Artist>): void => {
          expect(res).toBeDefined();
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/following`);
        }));

        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('type')).toEqual('artist');
        expect(req.request.params.has('limit')).toBeTruthy();

        req.flush({
          artists: {
            items: mockArtists,
            total: mockArtists.length,
            limit: 20,
            next: null,
            previous: null,
            cursors: null,
            href: ''
          }
        });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ret$ = service.getFollowedArtists(13, '1234');
        ret$.subscribe(() => {
            fail();
            done();
          }, (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/following`);
        }));
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('type')).toEqual('artist');
        expect(req.request.params.has('limit')).toBeTruthy();
        expect(req.request.params.has('after')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('unfollowArtists()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(50);
        service.unfollowArtists(ids).subscribe((success: boolean): void => {
          expect(success).toBeTruthy();
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/following`);
        }));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.get('type')).toEqual('artist');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('returns false when more than 50 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(51);
        service
          .unfollowArtists(ids)
          .subscribe((ret: boolean): void => {
              expect(ret).toEqual(false);
              done();
            }, (error: HttpErrorResponse) => {
              fail();
              done();
            }
          );

        httpTestingController.expectNone(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following`);
        });
      })();
    });
    it('returns false when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(0);
        service.unfollowArtists(ids).subscribe((ret: boolean): void => {
          expect(ret).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following`);
        });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(50);
        service.unfollowArtists(ids).subscribe((success: boolean): void => {
            fail();
            done();
          }, (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/following`);
        }));
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.get('type')).toEqual('artist');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('unfollowUsers()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(50);
        service.unfollowUsers(ids).subscribe((success: boolean): void => {
          expect(success).toBeTruthy();
          done();
        }, () => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/following`);
        }));

        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.get('type')).toEqual('user');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('returns false when more than 50 ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(51);
        service
          .unfollowUsers(ids)
          .subscribe((ret: boolean): void => {
              expect(ret).toEqual(false);
              done();
            }, (error: HttpErrorResponse) => {
              fail();
              done();
            }
          );

        httpTestingController.expectNone(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following`);
        });
      })();
    });
    it('returns false when no ids given, without sending a request', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids: string[] = getIds(0);
        service.unfollowUsers(ids).subscribe((ret: boolean): void => {
          expect(ret).toEqual(false);
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        httpTestingController.expectNone(reqToTest => {
          return reqToTest.url.includes(`/v1/me/following`);
        });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const ids = getIds(50);
        service.unfollowUsers(ids).subscribe((success: boolean): void => {
            fail();
            done();
          }, (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(((reqToTest: HttpRequest<any>) => {
          return reqToTest.url.includes(`/v1/me/following`);
        }));
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.params.get('type')).toEqual('user');
        expect(req.request.params.has('ids')).toBeTruthy();

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('unfollowPlaylist()', () => {
    it('send valid request and return true', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const id = '1234';
        service.unfollowPlaylist(id).subscribe((success: boolean): void => {
            expect(success).toEqual(true);
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/playlists/${id}/followers`));
        expect(req.request.method).toEqual('DELETE');
        req.flush({}, { status: 204, statusText: 'NO CONTENT' });
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([FollowService], (service: FollowService) => {
        const id = '1234';
        service.unfollowPlaylist(id).subscribe(() => {
            fail();
            done();
          }, (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/playlists/${id}/followers`));
        expect(req.request.method).toEqual('DELETE');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
});
