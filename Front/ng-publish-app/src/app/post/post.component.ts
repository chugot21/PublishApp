import {Component, OnInit} from '@angular/core';
import { PostsService } from "../posts.service";
import {PostGetAll} from "../models/PostModel";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {FormsModule} from "@angular/forms";
import {NewPostComponent} from "../new-post/new-post.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  postList: PostGetAll[];

  constructor(
      private router: Router,
      private postService: PostsService,
      private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.postService.getPostList()
        .subscribe(postList => this.postList = postList);
  }

  addPostDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //si on clique a l'exterieur de la fenetre ou esc -> sort de la fenetre
    dialogConfig.autoFocus = true;
    this.dialog.open(NewPostComponent, dialogConfig);
  }
}
