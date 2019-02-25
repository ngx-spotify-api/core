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
        accessToken: '1234567890'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
