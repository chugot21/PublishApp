import { PostCreate, PostProfil } from "./PostModel";

export class UserLogin {
  username: string;
  password: string;
}

export class UserStorage {
  id: string;
  username: string;
  token: string;
}

export class UserRegister {
  username: string;
  firstname: string;
  lastname: string;
  borndatetime: Date;
  password: string;
}

export class Username {
  username: string;
}

export class UserProfil {
  username: string;
  firstName: string;
  lastName: string;
  bornDateTime: Date;
  posts: PostProfil[];
}
