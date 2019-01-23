export class AuthorizationConfig {
  /**
   * @description The redirectUri is used to redirect the user after he grants or denies access for your application
   */
  redirectUri?: string = 'http://localhost:4200/';

  /**
   * @description Due you need a server to request the access token, when you obtain app authorization by authorization code.
   * The authServerUrl will used to request the AccessToken. In default case the url points to a server,
   * which adds the needed authorization to the request,
   * forwards it to the spotify api, and returns the response of the spotify api.
   */
  authServerUrl?: string = 'http://localhost:3000/api/token';

  /**
   * @description This is the clientId of your application.
   */
  clientId: string;

  /**
   * @description This used to prefix the access- and refreshToken inside the local storage.
   */
  storagePrefix?: string = 'ngx-spotify-api-';

  /**
   * @description This is an array of all scopes you need your application to access to. Default all scopes will be requested
   */
  scopes?: string[] = [
    'user-top-read', 'user-read-recently-played',
    'user-read-email', 'user-read-birthdate', 'user-read-private',
    'playlist-read-collaborative', 'playlist-modify-public', 'playlist-read-private', 'playlist-modify-private',
    'user-library-modify', 'user-library-read',
    'user-follow-modify', 'user-follow-read',
    'streaming', 'app-remote-control',
    'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'
  ];
}
