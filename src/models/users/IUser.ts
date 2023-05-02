export interface IUser {
    username: string;
    password: string;
    userId: (number | null);
}

export interface IUserFormFields {
    username: string;
    password: string;
}

export interface IUsers {
    users: IUser[];
}