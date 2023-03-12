export interface IUserComment {
    name: string;
    text: string;
    parentId: null | number;
}

export interface IComment extends IUserComment {
    id: number;
    date: string;
    likes: number;
    liked: boolean;
}

export interface IUserExistingComment extends IUserComment {
    id: number;
}
