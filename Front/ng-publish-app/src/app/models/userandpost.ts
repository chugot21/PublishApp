export class User {
    username: string;
    firstname: string;
    lastname: string;
    borndatetime: Date;
    posts: Post[];

}

export class Post {
    title: string;
    content: string;
    createdOn: Date;
    //username: string;
}