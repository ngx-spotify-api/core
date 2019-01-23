# NgxSpotifyApi
## Introduction
This module was written to use the Spotify-Api type-save inside an angular application.
If there are issues please tell me, so I can fix them.

This module requires a proxy-server for authentication. For now [ngx-spotify-api-auth-proxy]('https://github.com/jlandsmann/ngx-spotify-api-auth-proxy) is the only supported library.

## Getting Started
### Installation
With npm:
```
    npm install --save @ngx/spotify-api
```
With yarn:
```
    yarn add @ngx/spotify-api
```
### Init
```angular2
@NgModule({
  ...
  imports: [
    ...
    NgxSpotifyApiModule
  ],
  ...
})
```

### Configuration
This is an example configuration
```angular2
@NgModule({
  ...
  imports: [
    ...
    NgxSpotifyApiModule.forRoot({
      api: {
        baseUrl: ''
      },
      authorization: {
        authServerUrl: 'localhost:3000',
        storagePrefix: 'ngx-spotify-api-',
        redirectUri: '<route-to-redirect-after-login>',
        clientId: '<app-client-id>'
      }
    })
  ],
  ...
})
export class AppModule { }
```
