import {AuthorizationConfig} from './authorization.config';
import {ApiConfig} from './api.config';

export class SpotifyApiConfig {
  authorization?: AuthorizationConfig;
  api: ApiConfig;
}
