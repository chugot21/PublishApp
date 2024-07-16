import { Component, OnInit } from "@angular/core";
import { PostsService } from "../posts.service";
import { ListPagination, PostCreate, PostList } from "../models/PostModel";
import { Router } from "@angular/router";
import { DatePipe, JsonPipe, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NewPostComponent } from "../new-post/new-post.component";
import { SearchPostsByUserComponent } from "../search-posts-by-user/search-posts-by-user.component";
import { Button } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { PageEvent } from "@angular/material/paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { firstValueFrom, Observable } from "rxjs";

@Component({
  selector: "app-post",
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    SearchPostsByUserComponent,
    DatePipe,
    Button,
    NewPostComponent,
    DialogModule,
    NgxPaginationModule,
    JsonPipe,
  ],
  templateUrl: "./post.component.html",
})
export class PostComponent implements OnInit {
  listPosts: ListPagination;
  displayModal: boolean = false;
  postsObs$: Observable<ListPagination>;

  constructor(
    private router: Router,
    private postService: PostsService,
  ) {}

  async getPostsList(pageIndex: number) {
    this.postsObs$ = this.postService.getPostList(pageIndex);
    await firstValueFrom(this.postsObs$)
      .then((posts: ListPagination) => {
        this.listPosts = posts;
      })
      .catch((error) => console.log(error));
    // .subscribe((postList) => (this.listPosts = postList));
    // console.log(this.listPosts);
  }

  ngOnInit() {
    this.getPostsList(1);
    // this.postService
    //   .getPostList(1)
    //   .subscribe((postList) => (this.listPosts = postList));
  }

  pageChanged(event: any) {
    this.listPosts.pageIndex = event;
    // this.postService
    //   .getPostList(this.listPosts.pageIndex)
    //   .subscribe((postList) => (this.listPosts = postList));
    this.getPostsList(this.listPosts.pageIndex);
    console.log(this.listPosts);
  }

  // PageSizeChange(event: any) {
  //   this.listPosts.pageSize = event.target.value;
  //   this.listPosts.pageIndex = 1;
  //   this.getPostsList();
  // }

  addPostDialog() {
    this.displayModal = true;
  }
}

// if (document.getElementById("#card-content") === undefined)
