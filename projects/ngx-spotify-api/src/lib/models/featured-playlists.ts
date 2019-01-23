import {Paging} from './paging';
import {Playlist} from './playlist';
import {PlaylistSimplified} from './playlist-simplified';

export class FeaturedPlaylists {
  message: string;
  playlists: Paging<PlaylistSimplified>;
}
