export class PostList {
  title: string;
  content: string;
  createdOn: Date;
  username: string;
}

export class PostCreate {
  title: string;
  content: string;
}

export class PostProfil {
  title: string;
  content: string;
  createdOn: Date;
}

export class ListPagination {
  postsNumber: number;
  pageIndex: number = 1;
  pageSize: number = 5;
  postsDisplay: PostList[];
}
