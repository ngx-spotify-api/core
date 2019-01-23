import {ExternalUrl} from './external-url';
import {Followers} from './followers';
import {Image} from './image';

export class UserPublic {
    displayName: string;
    externalUrls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    type: 'user';
    uri: string;
}
