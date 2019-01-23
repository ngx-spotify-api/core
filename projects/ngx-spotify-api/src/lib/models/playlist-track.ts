import {UserPublic} from './user-public';
import {Track} from './track';

export class PlaylistTrack {
    addedAt: number | null; // timestamp
    addedBy: UserPublic | null;
    isLocal: boolean;
    track: Track;
}
