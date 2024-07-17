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
import {
  firstValueFrom,
  interval,
  Observable,
  retry,
  share,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from "rxjs";
import { SignalRService } from "../signal-r.service";
import { StorageService } from "../storage.service";

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
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  listPosts: ListPagination;
  displayModal: boolean = false;
  postsObs$: Observable<ListPagination>;
  stopPolling = new Subject<void>();

  constructor(
    private router: Router,
    private postService: PostsService,
    private signalRService: SignalRService,
    private storage: StorageService,
  ) {}

  async getPostsList(pageIndex: number) {
    // this.postsObs$ = this.postService.getPostList(pageIndex);

    timer(0, 15000)
      .pipe(
        tap((x) => console.log(x)),
        takeUntil(this.stopPolling),
        switchMap(() => this.postService.getPostList(pageIndex)),
      )
      .subscribe((listPosts: ListPagination) => {
        this.listPosts = listPosts;
      });

    //     timer(1, 3000).pipe(
    //   switchMap(() => this.postService.getPostList(pageIndex)),
    //   retry(),
    //   share(),
    //   takeUntil(this.stopPolling),
    // );

    // await firstValueFrom(this.postsObs$)
    //   .then((posts: ListPagination) => {
    //     this.listPosts = posts;
    //   })
    //   .catch((error) => console.log(error));

    // interval(1000).pipe(
    //   tap((x) => console.log(x)),
    //   takeUntil(this.stopPolling),
    //   switchMap(() => this.postService.getPostList(pageIndex)),
    // );

    // .subscribe((postList) => (this.listPosts = postList));
    // console.log(this.listPosts);
  }

  ngOnInit() {
    // this.getPostsList(1);
    this.signalRService.startConnection();
    this.signalRService.addListner();
    let userId = this.storage.getData("id");
    this.signalRService.subscribeToUser(userId);

    this.postService
      .getPostList(1)
      .subscribe((postList) => (this.listPosts = postList));
  }

  pageChanged(event: any) {
    this.listPosts.pageIndex = event;

    timer(0, 10000)
      .pipe(
        tap((x) => console.log(x)),
        takeUntil(this.stopPolling),
        switchMap(() => this.postService.getPostList(this.listPosts.pageIndex)),
      )
      .subscribe((listPosts: ListPagination) => {
        this.listPosts = listPosts;
      });

    // this.postService
    //   .getPostList(this.listPosts.pageIndex)
    //   .subscribe((postList) => (this.listPosts = postList));
    // this.getPostsList(this.listPosts.pageIndex);
    // console.log(this.listPosts);
  }

  // PageSizeChange(event: any) {
  //   this.listPosts.pageSize = event.target.value;
  //   this.listPosts.pageIndex = 1;
  //   this.getPostsList();
  // }

  addPostDialog() {
    this.displayModal = true;
  }

  ngOnDestroy() {
    this.stopPolling.next();
    this.stopPolling.complete();
  }
}

// if (document.getElementById("#card-content") === undefined)
