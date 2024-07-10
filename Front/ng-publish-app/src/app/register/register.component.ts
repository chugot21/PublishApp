import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {UserLogin, UserRegister} from "../models/UserModel";
import {
  MAT_DIALOG_DATA,
  MatDialog, MatDialogActions,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Inject} from "@angular/core";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    MatDialogActions,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  description:string;
  user = new UserRegister();

  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<RegisterComponent>,
) {}
  //     @Inject(MAT_DIALOG_DATA) data: any) {
  //   this.description = data.description;
  // }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description],
    });
  }

  back() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.authService.register(this.user).subscribe())
    {

      this.dialogRef.close();
    }
  }
}
