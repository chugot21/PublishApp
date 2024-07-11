import { Component, OnInit } from "@angular/core";
import { UserPostList } from "../models/UserModel";
import { PostCreate } from "../models/PostModel";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { PostsService } from "../posts.service";
import { Router } from "@angular/router";
import { AsyncPipe, JsonPipe, NgForOf } from "@angular/common";

@Component({
  selector: "app-search-posts-by-user",
  standalone: true,
  imports: [NgForOf, JsonPipe, AsyncPipe],
  templateUrl: "./search-posts-by-user.component.html",
})
export class SearchPostsByUserComponent implements OnInit {
  searchTerms = new Subject<string>();
  //{...pokemonList(a)...pokemonList(ab)..}
  userPostList$: Observable<UserPostList[]>;

  constructor(
    private router: Router,
    private postService: PostsService,
  ) {}

  ngOnInit() {
    this.userPostList$ = this.searchTerms.pipe(
      //{..."a"."ab"..."abz"."ab"..."abc"....}
      debounceTime(300), //permet d'attendre un temps avant de faire un appel serveur
      //{......."ab"........."ab"..."abc"....}
      distinctUntilChanged(), //attendre qu'il y ai un changement dans les termes de recherche.
      //{......."ab"................"abc"....}
      switchMap((term) => this.postService.searchPostByUser(term)),
      //{.......pokemonList(ab).......pokemonList(abc)...}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }
}
