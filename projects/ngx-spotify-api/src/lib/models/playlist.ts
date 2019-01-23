import {ExternalUrl} from './external-url';
import {Followers} from './followers';
import {Image} from './image';
import {UserPublic} from './user-public';
import {Paging} from './paging';
import {PlaylistTrack} from './playlist-track';

export class Playlist {
    collaborative: boolean;
    description: string;
    externalUrls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: UserPublic;
    public: boolean | null;
    snapshotId: string;
    tracks: Paging<PlaylistTrack>;
    type: 'playlist';
    uri: string;
}
