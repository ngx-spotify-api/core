import {Artist} from './artist';
import {Copyright} from './copyright';
import {ExternalId} from './external-id';
import {ExternalUrl} from './external-url';
import {Image} from './image';
import {Restriction} from './restriction';
import {Track} from './track';
import {Paging} from './paging';
import {AlbumType} from './album-type';

export class Album {
    albumType: AlbumType;
    artists: Artist[];
    availableMarkets: string[];
    copyrights: Copyright[];
    externalIds: ExternalId;
    externalUrls: ExternalUrl;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    label: string;
    name: string;
    popularity: number;
    releaseDate: string;
    releaseDatePrecision: 'year' | 'month' | 'day';
    restrictions: Restriction;
    tracks: Paging<Track>;
    type: 'album';
    uri: string;
}
