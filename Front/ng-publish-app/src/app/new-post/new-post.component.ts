import { Component, OnInit } from "@angular/core";
import { PostCreate } from "../models/PostModel";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgIf } from "@angular/common";
import { PostsService } from "../posts.service";
import { PostComponent } from "../post/post.component";

@Component({
  selector: "app-new-post",
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: "./new-post.component.html",
})
export class NewPostComponent implements OnInit {
  form: FormGroup;
  description: string;
  post = new PostCreate();

  constructor(
    private postService: PostsService,
    private fb: FormBuilder,
    private postComp: PostComponent,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description],
    });
  }

  onSubmit() {
    this.postService.createPost(this.post).subscribe((response) => {
      this.postComp.displayModal = false;
    });
  }

  cancel() {
    this.postComp.displayModal = false;
  }
}
