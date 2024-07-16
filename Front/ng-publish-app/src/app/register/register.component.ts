import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { NgIf } from "@angular/common";
import { UserRegister } from "../models/UserModel";
import { DialogModule } from "primeng/dialog";
import { Button } from "primeng/button";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, DialogModule, Button],
  templateUrl: "./register.component.html",
  styleUrls: ["../login/login.component.css"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  description: string;
  user = new UserRegister();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loginComp: LoginComponent,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description],
    });
  }

  back() {
    this.loginComp.displayModal = false;
  }

  onSubmit() {
    if (this.authService.register(this.user).subscribe()) {
      this.loginComp.displayModal = false;
    }
  }
}
