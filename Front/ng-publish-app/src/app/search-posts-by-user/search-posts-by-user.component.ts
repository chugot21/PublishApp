import { Component, OnInit } from "@angular/core";
import { UserProfil } from "../models/UserModel";
import { PostCreate } from "../models/PostModel";
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { PostsService } from "../posts.service";
import { Router } from "@angular/router";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { UserService } from "../user.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-search-posts-by-user",
  standalone: true,
  imports: [NgForOf, JsonPipe, AsyncPipe, FormsModule, NgIf],
  templateUrl: "./search-posts-by-user.component.html",
})
export class SearchPostsByUserComponent implements OnInit {
  searchTerms = new Subject<string>();
  //{...pokemonList(a)...pokemonList(ab)..}
  userSearch$: Observable<UserProfil>;
  userProfil: UserProfil;
  userExist: boolean = true;

  constructor(
    private router: Router,
    private postService: PostsService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    // this.userSearch$ = this.searchTerms.pipe(
    //   //{..."a"."ab"..."abz"."ab"..."abc"....}
    //   debounceTime(300), //permet d'attendre un temps avant de faire un appel serveur
    //   //{......."ab"........."ab"..."abc"....}
    //   distinctUntilChanged(), //attendre qu'il y ai un changement dans les termes de recherche.
    //   //{......."ab"................"abc"....}
    //   switchMap((term) => this.postService.searchPostByUser(term)),
    //   //{.......pokemonList(ab).......pokemonList(abc)...}
    // );
  }

  async search(term: string) {
    this.userSearch$ = this.userService.getUserProfil(term);
    await firstValueFrom(this.userSearch$)
      .then((userProfil: UserProfil) => {
        this.userProfil = userProfil;
      })
      .catch((error) => console.log(error));

    // console.log(this.userProfil);
    if (this.userProfil) {
      this.userExist = true;
      this.router.navigate([`/user/${term}`]);
    } else {
      this.userExist = false;
      console.log(this.userExist);
    }
    // this.searchTerms.next(term);
  }

  goToUserProfil(user: UserProfil) {
    this.router.navigate(["/user", user.username]);
  }
}
