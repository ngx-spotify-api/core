import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxSpotifyApiModule} from '../../projects/ngx-spotify-api/src/lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
