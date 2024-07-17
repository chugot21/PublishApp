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
import { ToastrService } from "ngx-toastr";
import { firstValueFrom, Observable } from "rxjs";

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
  userRegister$: Observable<UserRegister>;
  userError: boolean = false;
  messageError: string = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loginComp: LoginComponent,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description],
    });
  }

  back() {
    this.loginComp.displayModal = false;
  }

  async onSubmit() {
    this.userRegister$ = this.authService.register(this.user);
    let promise = await firstValueFrom(this.userRegister$)
      .then((userRegister: UserRegister) => {
        this.user = userRegister;
        this.userError = false;
      })
      .catch((error) => {
        this.userError = true;
        console.log(error);
        this.messageError = "";
        for (var i: number = 0; error.error[i]; i++) {
          if (i === 0) {
            this.messageError = error.error[i].description;
          } else {
            this.messageError += "<br>" + error.error[i].description;
          }
        }
      });

    this.loginComp.displayModal = false;
    if (!this.userError) {
      // this.loginComp.displayModal = false;
      this.toastr.success(
        "Vous venez de vous enregistrer avec succes !",
        "Register",
        { positionClass: "toast-bottom-left" },
      );
    } else {
      this.toastr.error(this.messageError, "Not register", {
        positionClass: "toast-bottom-left",
        enableHtml: true,
      });
    }
  }
}
