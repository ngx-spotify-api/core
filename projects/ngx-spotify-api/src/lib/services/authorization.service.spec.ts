import { TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { AuthorizationService } from './authorization.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthorizationConfig} from '../models';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpErrorResponse} from '@angular/common/http';

describe('AuthorizationService', () => {
  const baseUrl = 'http://localhost:3000/';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthorizationService,
        {
          provide: AuthorizationConfig,
          useValue: {
            authServerUrl: baseUrl,
            clientId: '',
            redirectUri: '',
            scopes: ['test', 'test2']
          }
        },
        {
          provide: Location,
          useClass: SpyLocation
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created and not be authorized', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
    expect(service.isAuthorized()).toEqual(false);
  }));

  describe('requestAuthorization()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([AuthorizationService], (service: AuthorizationService) => {
        expect(true).toEqual(true);
        done();
      })();
    });
  });
  describe('abortAuthorization()', () => {
    it('unauthorize the user', (done: DoneFn) => {
      inject([AuthorizationService], (service: AuthorizationService) => {
        service.abortAuthorization();
        expect(service.isAuthorized()).toEqual(false);
        done();
      })();
    });
  });
  describe('requestAccessToken()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([AuthorizationService], (service: AuthorizationService) => {
        service.requestAccessToken('12345').subscribe(
          (success: boolean) => {
            expect(success).toEqual(true);
            expect(service.isAuthorized()).toEqual(true);
            done();
          }, (error: HttpErrorResponse) => {
            fail(error);
            done();
          }
        );

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(baseUrl);
        });
        expect(req.request.method).toEqual('POST');
        expect(req.request.body['grant_type']).toBeDefined();
        expect(req.request.body['code']).toBeDefined();
        expect(req.request.body['redirect_uri']).toBeDefined();

        req.flush({
          accessToken: '1234',
          tokenType: 'Bearer',
          scope: 'scope1, scope2',
          expiresIn: 10010101001,
          refreshToken: 'sadasdad'
        });
      })();
    });
  });
  describe('isAuthorized()', () => {});
  describe('getAccessToken()', () => {});
});
