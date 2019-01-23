import {Album} from './album';
import {ArtistSimplified} from './artist-simplified';
import {ExternalId} from './external-id';
import {ExternalUrl} from './external-url';
import {TrackLink} from './track-link';
import {Restriction} from './restriction';

export class Track {
    album: Album;
    artists: ArtistSimplified[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalIds: ExternalId;
    externalUrls: ExternalUrl;
    href: string;
    id: string;
    isPlayable: boolean;
    linkedFrom: TrackLink;
    restrictions: Restriction;
    name: string;
    popularity: number;
    previewUrl: string;
    trackNumber: number;
    type: 'track';
    uri: string;
    isLocal: boolean;
}
