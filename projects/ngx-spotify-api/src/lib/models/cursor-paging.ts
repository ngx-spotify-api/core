import {Cursor} from './cursor';

export class CursorPaging<C> {
    href: string;
    items: C[];
    limit: number;
    next: string;
    cursors: Cursor;
    total: number;
}
