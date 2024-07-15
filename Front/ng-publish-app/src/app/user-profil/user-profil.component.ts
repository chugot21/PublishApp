import { Component, OnInit } from "@angular/core";
import { DatePipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { SearchPostsByUserComponent } from "../search-posts-by-user/search-posts-by-user.component";
import { PostCreate, PostList, PostProfil } from "../models/PostModel";
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "../posts.service";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { UserProfil } from "../models/UserModel";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-profil",
  standalone: true,
  imports: [NgForOf, SearchPostsByUserComponent, NgIf, DatePipe, JsonPipe],
  templateUrl: "./user-profil.component.html",
  styles: ``,
})
export class UserProfilComponent implements OnInit {
  userProfil: UserProfil;
  username: string | null;

  constructor(
    private router: Router,
    private postService: PostsService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    if (this.username) {
      this.userService
        .getUserProfil(this.username)
        .subscribe((userProfil: UserProfil) => (this.userProfil = userProfil));
    }
    // console.log(this.userProfil.username);
  }

  updateProfil() {}
}
