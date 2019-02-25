import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AlbumService,
  ArtistService,
  BrowseService,
  FollowService,
  LibraryService,
  PersonalizationService,
  PlayerService, PlaylistService, SearchService, TrackService, UserService
} from './services';
import {httpInterceptorProviders} from './http-interceptors';
import {ApiConfig, AuthorizationConfig, SpotifyApiConfig} from './models/configs';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ArtistService,
    AlbumService,
    BrowseService,
    FollowService,
    LibraryService,
    PersonalizationService,
    PlayerService,
    PlaylistService,
    SearchService,
    TrackService,
    UserService,
    httpInterceptorProviders
  ]
})
export class NgxSpotifyApiModule {
  static forRoot(config: SpotifyApiConfig): ModuleWithProviders {
    config = {
      api: {
        ...new ApiConfig(),
        ...config.api
      },
      authorization: {
        ...new AuthorizationConfig(),
        ...config.authorization
      }
    };
    return {
      ngModule: NgxSpotifyApiModule,
      providers: [
        { provide: AuthorizationConfig, useValue: config.authorization },
        { provide: ApiConfig,           useValue: config.api },
      ]
    };
  }
}
