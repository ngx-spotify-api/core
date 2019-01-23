import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxSpotifyApiModule} from '../../projects/ngx-spotify-api-core/src/lib';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'auth',
        component: AppComponent
      }
    ]),
    NgxSpotifyApiModule.forRoot({
      authorization: {
        redirectUri: 'http://localhost:4200/auth',
        clientId: 'b5602abb639e4bcbbfa2162e136dd37e',
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
