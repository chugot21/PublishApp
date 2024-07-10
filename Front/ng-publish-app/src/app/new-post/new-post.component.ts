import {Component, OnInit} from '@angular/core';
import {PostCreate} from "../models/PostModel";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserRegister} from "../models/UserModel";
import {AuthService} from "../auth.service";
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    MatDialogActions,
    FormsModule,
    MatDialogContent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {

  form: FormGroup;
  description:string;
  post = new PostCreate();

  constructor(
      private postService: PostsService,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<NewPostComponent>,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description],
    });
  }

  onSubmit() {
    if(this.postService.createPost(this.post).subscribe())
    {
      //message a user a mettre
      this.dialogRef.close();
    } else {
      //message erreur au user si erreur back
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
