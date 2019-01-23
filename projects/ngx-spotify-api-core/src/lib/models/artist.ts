import {ExternalUrl} from './external-url';
import {Followers} from './followers';
import {Image} from './image';

export class Artist {
    externalUrls: ExternalUrl;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    populariy: number;
    type: 'artist';
    uri: string;
}
