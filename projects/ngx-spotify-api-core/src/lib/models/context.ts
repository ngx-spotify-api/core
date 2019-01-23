import {ExternalUrl} from './external-url';

export class Context {
    type: 'artist' | 'playlist' | 'album';
    href: string;
    externalUrls: ExternalUrl;
    uri: string;
}
