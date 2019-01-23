import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {PlayerService} from './player.service';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {UserPrivate} from '../models';
import {UserPublic} from '../models';

describe('UserService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService,
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

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('getUser()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([UserService], (service: UserService) => {
        const id = '1234';
        const req$ = service.getUser(id);
        req$.subscribe((user: UserPublic) => {
          expect(user).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/users/${id}`);
        });
        expect(req.request.method).toEqual('GET');

        const body: UserPublic = {
          displayName: '',
          externalUrls: null,
          followers: null,
          href: '',
          id: '1234',
          images: [],
          type: 'user',
          uri: ''
        };
        req.flush(body);
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([UserService], (service: UserService) => {
        const id = '1234';
        const req$ = service.getUser(id);
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/users/${id}`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });

  describe('getCurrentUser()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([UserService], (service: UserService) => {
        const req$ = service.getCurrentUser();
        req$.subscribe((user: UserPrivate) => {
          expect(user).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me`);
        });
        expect(req.request.method).toEqual('GET');

        const body: UserPrivate = {
          birthdate: '',
          country: '',
          displayName: '',
          email: '',
          externalUrls: null,
          followers: null,
          href: '',
          id: '1234',
          images: [],
          product: 'premium',
          type: 'user',
          uri: ''
        };
        req.flush(body);
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([UserService], (service: UserService) => {
        const req$ = service.getCurrentUser();
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/me`);
        });
        expect(req.request.method).toEqual('GET');

        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
});
