import {ExternalUrl} from './external-url';
import {Image} from './image';
import {Restriction} from './restriction';
import {ArtistSimplified} from './artist-simplified';
import {AlbumType} from './album-type';
import {AlbumGroup} from './album-group';

export class AlbumSimplified {
    albumGroup: AlbumGroup;
    albumType: AlbumType;
    artists: ArtistSimplified[];
    availableMarkets: string[];
    externalUrls: ExternalUrl;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: 'year' | 'month' | 'day';
    restrictions: Restriction;
    type: 'album';
    uri: string;
}
