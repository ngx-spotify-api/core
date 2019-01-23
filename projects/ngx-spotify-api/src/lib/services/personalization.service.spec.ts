import { TestBed, inject } from '@angular/core/testing';

import { PersonalizationService } from './personalization.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {Paging} from '../models';
import {Artist} from '../models';
import {HttpErrorResponse} from '@angular/common/http';
import {mockTracks} from './track.service.spec';
import {mockArtists} from './artist.service.spec';
import {Track} from '../models';

describe('PersonalizationService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PersonalizationService,
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

  it('should be created', inject([PersonalizationService], (service: PersonalizationService) => {
    expect(service).toBeTruthy();
  }));

  describe('getTopArtists()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PersonalizationService], (service: PersonalizationService) => {
        service.getTopArtists(20, 0, 'medium_term').subscribe((ret: Paging<Artist>) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/top/artists`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);
        expect(req.request.params.has('time_range')).toEqual(true);

        req.flush({
          items: mockArtists,
          total: mockArtists.length
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PersonalizationService], (service: PersonalizationService) => {
        service.getTopArtists().subscribe((ret: Paging<Artist>) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/top/artists`);
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

  describe('getTopTracks()', () => {
    it('send valid request', (done: DoneFn) => {
      inject([PersonalizationService], (service: PersonalizationService) => {
        service.getTopTracks(20, 0, 'medium_term').subscribe((ret: Paging<Track>) => {
          expect(ret).toBeDefined();
          done();
        }, (error: HttpErrorResponse) => {
          fail();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/top/tracks`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);
        expect(req.request.params.has('time_range')).toEqual(true);

        req.flush({
          items: mockTracks,
          total: mockTracks.length
        });
      })();
    });
    it('error when request returns error', (done: DoneFn) => {
      inject([PersonalizationService], (service: PersonalizationService) => {
        service.getTopTracks().subscribe((ret: Paging<Track>) => {
          fail();
          done();
        }, (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          done();
        });

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/me/top/tracks`);
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
});
