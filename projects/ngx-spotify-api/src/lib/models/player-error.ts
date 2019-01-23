import { Error } from './error';

export class PlayerError extends Error {
    status: 404 | 403;
    message: string;
    reason: string;
}
