import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../projects/ngx-spotify-api-core/src/lib/services";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-spotify-api';
  loginStatus: string;

  constructor(private authService: AuthorizationService,
              private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((query: ParamMap) => {
      if (query.has('error')) {
        console.error(query.get('error'));
        this.loginStatus = 'fail';
        this.authService.abortAuthorization();
        return;
      } else if (query.has('code')) {
        const code = query.get('code');
        this.authService.requestAccessToken(code).subscribe((success: boolean) => {
          if (success) {
            this.loginStatus = "success";
          } else {
            this.loginStatus = 'fail';
          }
        });
        return;
      } else {
        this.loginStatus = 'fail';
        return;
      }
    });
  }

  login(): void {
    this.authService.requestAuthorization();
    this.loginStatus = 'loading...';
  }
}
