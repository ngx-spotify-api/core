export class Paging<C> {
    href: string;
    items: C[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}
