import {TrackSimplified} from './track-simplified';
import {Timestamp} from 'rxjs';
import {Context} from './context';

export class PlayHistory {
    track: TrackSimplified;
    playedAt: number; // timestamp
    context: Context;
}
