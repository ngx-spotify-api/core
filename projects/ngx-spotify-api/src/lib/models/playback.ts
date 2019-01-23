import {Device} from './device';
import {Track} from './track';
import {Context} from './context';

export class Playback {
  timestamp: number;
  device: Device;
  progressMs: number;
  isPlaying: boolean;
  currentlyPlayingType: 'track';
  item: Track;
  shuffleState: boolean;
  repeatState: 'track' | 'context' | 'off';
  context: Context;
}
