import {PostCreate} from "./PostModel";

export class UserLogin {
    username: string;
    password: string;
}

export class UserStorage {
    id: string;
    token: string;
}

export class UserRegister {
    username: string;
    firstname: string;
    lastname:string;
    borndatetime: Date;
    password: string;
}

export class UserPostList {
    username: string;
    postList: PostCreate[];
}