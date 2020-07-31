import { User } from './user';

export interface Pattern {
    url: string;
    title: string;
    contributer: User;
    description?: string;
    id?: number;

}
