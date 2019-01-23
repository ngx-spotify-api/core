import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {UserService} from './user.service';
import {UserPrivate} from '../models';
import {HttpErrorResponse} from '@angular/common/http';
import {SearchResult} from '../models';

describe('SearchService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SearchService,
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

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCurrentUser()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([SearchService], (service: SearchService) => {
        const req$ = service.search(
          '',
          ['track'],
          '',
          20,
          0,
          true
        );
        req$.subscribe((user: SearchResult) => {
          expect(user).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/search`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('q')).toEqual(true);
        expect(req.request.params.has('type')).toEqual(true);
        expect(req.request.params.has('market')).toEqual(true);
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);
        expect(req.request.params.has('include_external')).toEqual(true);
        req.flush({});
      })();
    });
    it('error if http request returns error', (done: DoneFn) => {
      inject([SearchService], (service: SearchService) => {
        const req$ = service.search(
          '',
          []
        );
        req$.subscribe(() => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne((reqToTest) => {
          return reqToTest.url.includes(`/v1/search`);
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
