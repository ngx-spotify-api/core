import {ArtistSimplified} from './artist-simplified';
import {ExternalUrl} from './external-url';
import {TrackLink} from './track-link';
import {Restriction} from './restriction';

export class TrackSimplified {
    artists: ArtistSimplified[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalUrls: ExternalUrl;
    href: string;
    id: string;
    isPlayable: boolean;
    linkedFrom: TrackLink;
    restrictions: Restriction;
    name: string;
    previewUrl: string;
    trackNumber: number;
    type: 'track';
    uri: string;
    isLocal: boolean;
}
