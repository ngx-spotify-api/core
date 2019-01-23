import { TestBed, inject } from '@angular/core/testing';

import { BrowseService } from './browse.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiConfig} from '../models';
import {Category} from '../models';
import {HttpErrorResponse} from '@angular/common/http';
import {Track} from '../models';
import {Playlist} from '../models';
import {PlaylistSimplified} from '../models';
import {Paging} from '../models';
import {mockSimplifiedPlaylists} from './playlist.service.spec';
import {FeaturedPlaylists} from '../models';
import {AlbumSimplified} from '../models';
import {mockSimplifiedAlbums} from './album.service.spec';


export const mockCategories: Category[] = [
  {
    id: '1234',
    name: 'Category01',
    href: '',
    icons: []
  },
  {
    id: '1235',
    name: 'Category02',
    href: '',
    icons: []
  },
  {
    id: '1236',
    name: 'Category03',
    href: '',
    icons: []
  }
];

describe('BrowseService', () => {
  const baseUrl = '';
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BrowseService,
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

  it('should be created', inject([BrowseService], (service: BrowseService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCategory()', () => {
    it('send request with country and locale', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getCategory(mockCategories[0].id, 'de', 'de').subscribe(
          (cat: Category) => {
            expect(cat.id).toEqual(mockCategories[0].id);
            done();
          },
          () => {
            fail();
            done();
          }
          );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/browse/categories/${mockCategories[0].id}`));
        expect(req.request.params.has('country')).toEqual(true);
        expect(req.request.params.has('locale')).toEqual(true);
        expect(req.request.method).toEqual('GET');
        req.flush(mockCategories[0]);
      })();
    });

    it('fail if request return no success', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getCategory(mockCategories[0].id).subscribe(
          (cat: Category) => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => reqToTest.url.includes(`/v1/browse/categories/${mockCategories[0].id}`));
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getCategoryPlaylists()', () => {
    it('send request with country, limit, offset', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getCategoryPlaylists(mockCategories[0].id, 'de', 20, 0).subscribe(
          (paging: Paging<PlaylistSimplified>) => {
            expect(paging).toBeDefined();
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/categories/${mockCategories[0].id}/playlists`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('country')).toEqual(true);
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: { playlists: Paging<PlaylistSimplified> } = {
          playlists: {
            items: mockSimplifiedPlaylists,
            total: mockSimplifiedPlaylists.length,
            offset: 0,
            limit: 20,
            href: '',
            previous: null,
            next: null
          }
        };
        req.flush(body);
      })();
    });

    it('fail if request return no success', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getCategoryPlaylists(mockCategories[0].id).subscribe(
          (paging: Paging<PlaylistSimplified>) => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/categories/${mockCategories[0].id}/playlists`);
        });
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getCategories()', () => {
    it('send request with country, limit, offset', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getCategories('DE', 'de', 20, 0).subscribe(
          (paging: Paging<Category>) => {
            expect(paging).toBeDefined();
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/categories`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('country')).toEqual(true);
        expect(req.request.params.has('locale')).toEqual(true);
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: { categories: Paging<Category> } = {
          categories: {
            items: mockCategories,
            total: mockCategories.length,
            offset: 0,
            limit: 20,
            href: '',
            previous: null,
            next: null
          }
        };
        req.flush(body);
      })();
    });

    it('fail if request return no success', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getCategories().subscribe(
          (paging: Paging<Category>) => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/categories`);
        });
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getFeaturedPlaylists()', () => {
    it('send request with country, locale, timestamp, limit and offset', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getFeaturedPlaylists('DE', 'de', new Date(), 20, 0).subscribe(
          (playlists: FeaturedPlaylists) => {
            expect(playlists).toBeDefined();
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/featured-playlists`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('country')).toEqual(true);
        expect(req.request.params.has('locale')).toEqual(true);
        expect(req.request.params.has('timestamp')).toEqual(true);
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: FeaturedPlaylists = {
          message: 'This is a test',
          playlists: null
        };
        req.flush(body);
      })();
    });
    it('fail if request return no success', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getFeaturedPlaylists().subscribe(
          (featured: FeaturedPlaylists) => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/featured-playlists`);
        });
        expect(req.request.method).toEqual('GET');
        req.flush({ status: 400, message: 'BAD REQUEST' }, {
          status: 400,
          statusText: 'BAD REQUEST'
        });
      })();
    });
  });
  describe('getNewReleases()', () => {
    it('send request with country, limit and offset', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getNewReleases('DE', 20, 0).subscribe(
          (albumSimplifiedPaging: Paging<AlbumSimplified>) => {
            expect(albumSimplifiedPaging).toBeDefined();
            done();
          },
          () => {
            fail();
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/new-releases`);
        });
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.has('country')).toEqual(true);
        expect(req.request.params.has('limit')).toEqual(true);
        expect(req.request.params.has('offset')).toEqual(true);

        const body: { albums: Paging<AlbumSimplified> } = {
          albums: {
            items: mockSimplifiedAlbums,
            total: mockSimplifiedAlbums.length,
            limit: 20,
            offset: 0,
            previous: null,
            next: null,
            href: null
          }
        };
        req.flush(body);
      })();
    });
    it('fail if request return no success', (done: DoneFn) => {
      inject([BrowseService], (service: BrowseService) => {
        service.getNewReleases().subscribe(
          (paging: Paging<AlbumSimplified>) => {
            fail();
            done();
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(400);
            done();
          }
        );

        const req = httpTestingController.expectOne(reqToTest => {
          return reqToTest.url.includes(`/v1/browse/new-releases`);
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
