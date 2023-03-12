export interface IUserComment {
    name: string;
    text: string;
}

export interface IComment extends IUserComment {
    id: number;
    date: Date;
    likes: number;
    liked: boolean;
    comments: number[];
}

export interface IUserExistingComment extends IUserComment {
    id: number;
}