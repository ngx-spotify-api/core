import {ExternalUrl} from './external-url';
import {Followers} from './followers';
import {Image} from './image';

export class UserPrivate {
    birthdate: string;
    country: string;
    displayName: string;
    email?: string;
    externalUrls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: 'premium' | 'free' | 'open';
    type: 'user';
    uri: string;
}
