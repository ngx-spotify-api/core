import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResult} from '../models';
import {ApiConfig} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(@Optional() private config: ApiConfig,
              private http: HttpClient) { }

  public search(searchTerms: string, types: ('album' | 'artist' | 'track' | 'playlist')[], market?: string, limit: number = 20, offset: number = 0, includeExternal?: boolean): Observable<SearchResult> {
    return this.http.get<SearchResult>(this.config.baseUrl + `/v1/search`, {
      params: {
        q: encodeURIComponent(searchTerms),
        type: types.join(','),
        market: market,
        limit: limit.toString(),
        offset: offset.toString(),
        include_external: includeExternal ? 'audio' : undefined
      }
    });
  }
}
