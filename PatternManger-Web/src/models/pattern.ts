import { User } from './user';
import { Photo } from './photo';

export interface Pattern {
    url: string;
    title: string;
    contributer: string;
    description?: string;
    id?: number;
    category: string;
    yarnWeight: number;
    hookSize: number;
    language?: string;
    terminology?: string;
    skillLevel?: string;
    photos?: Photo[];
    mainPhotoUrl?: string;

}
