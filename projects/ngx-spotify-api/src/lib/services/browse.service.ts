import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models';
import {Playlist} from '../models';
import {map} from 'rxjs/operators';
import {Paging} from '../models';
import {FeaturedPlaylists} from '../models';
import {Album} from '../models';
import {AlbumSimplified} from '../models';
import {ApiConfig} from '../models';
import {PlaylistSimplified} from '../models';

class PlaylistList {
  playlists: Paging<PlaylistSimplified>;
}

class CategoryList {
  categories: Paging<Category>;
}

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public getCategory(id: string, country?: string, locale?: string): Observable<Category> {
    return this.http.get<Category>(this.config.baseUrl + '/v1/browse/categories/' + id, {
      params: {
        country: country,
        locale: locale
      }
    });
  }

  public getCategoryPlaylists(id: string, country?: string, limit: number = 20, offset: number = 0): Observable<Paging<PlaylistSimplified>> {
    return this.http.get<PlaylistList>(this.config.baseUrl + '/v1/browse/categories/' + id + '/playlists', {
      params: {
        country: country,
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).pipe(map((res: PlaylistList) => {
        return res.playlists;
      }));
  }

  public getCategories(country?: string, locale?: string, limit: number = 20, offset: number = 0): Observable<Paging<Category>> {
    return this.http.get<CategoryList>(this.config.baseUrl + '/v1/browse/categories', {
      params: {
        country: country,
        locale: locale,
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).pipe(map((list: CategoryList) => {
      return list.categories;
    }));
  }

  public getFeaturedPlaylists(
    country?: string,
    locale?: string,
    timestamp: Date = new Date(),
    limit: number = 20, offset: number = 0)
    : Observable<FeaturedPlaylists> {
      return this.http.get<FeaturedPlaylists>(this.config.baseUrl + '/v1/browse/featured-playlists', {
        params: {
          country,
          locale,
          timestamp: timestamp.toISOString(),
          limit: limit.toString(),
          offset: offset.toString()
        }
      });
  }

  public getNewReleases(country?: string, limit: number = 20, offset: number = 0): Observable<Paging<AlbumSimplified>> {
    return this.http.get<{ albums: Paging<AlbumSimplified> }>(this.config.baseUrl + '/v1/browse/new-releases', {
      params: {
        country,
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).pipe(map(({albums}) => {
      return albums;
    }));
  }

  // Recommendations will follow in a future release
}
