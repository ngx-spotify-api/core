import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxSpotifyApiModule} from '../../projects/ngx-spotify-api-core/src/lib';
import {RouterModule} from '@angular/router';
import {of} from 'rxjs';

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
        accessToken: () => of('1234567890'),
        storagePrefix: 'spotify-api-'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
