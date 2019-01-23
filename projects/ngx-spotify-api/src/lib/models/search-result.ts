import {Paging} from './paging';
import {Artist} from './artist';
import {AlbumSimplified} from './album-simplified';
import {Track} from './track';
import {PlaylistSimplified} from './playlist-simplified';

export class SearchResult {
  artists?: Paging<Artist>;
  albums?: Paging<AlbumSimplified>;
  tracks?: Paging<Track>;
  playlists?: Paging<PlaylistSimplified>;
}
