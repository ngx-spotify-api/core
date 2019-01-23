import {Context} from './context';
import {Track} from './track';

export class TrackCurrent {
  context: Context;
  timestamp: number;
  progressMs: number;
  isPlaying: boolean;
  currentlyPlayingType: 'track';
  item: Track;
}