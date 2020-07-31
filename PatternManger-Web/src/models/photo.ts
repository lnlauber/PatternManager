export interface Photo{
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isProfile: boolean;
    isPattern: boolean;
    isMain: boolean;
    username: string;
    pattern?: number;
}
