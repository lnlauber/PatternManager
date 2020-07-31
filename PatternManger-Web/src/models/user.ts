import { Photo } from "./photo";

export interface User {
    username: string;
    fullName: string;
    email: string;
    joined: string;
    about?: string;
    profilePhotoUrl?: Photo;
}