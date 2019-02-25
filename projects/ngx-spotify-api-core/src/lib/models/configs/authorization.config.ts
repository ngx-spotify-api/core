export class AuthorizationConfig {
  /**
   * @description This will be used for signing your requests. An access token is required for all endpoints
   */
  accessToken: () => string;

  /**
   * @description This used to prefix the access- and refreshToken inside the local storage.
   */
  storagePrefix = 'ngx-spotify-api-';

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
