import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { UserLogin, UserStorage } from "../models/UserModel";
import { MatDialog } from "@angular/material/dialog";
import { RegisterComponent } from "../register/register.component";
import { StorageService } from "../storage.service";
import { Button } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, NgIf, RegisterComponent, Button, DialogModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorMessage: string = "";
  user = new UserLogin();
  userData: UserStorage;
  displayModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private storage: StorageService,
  ) {}

  ngOnInit() {}

  setMessage(): void {
    if (this.userData) {
      this.errorMessage = "";
      this.router.navigate(["/Post"]);
    } else {
      this.errorMessage = "Identifiant ou mot de passe incorrect.";
      this.router.navigate(["/user/login"]);
    }
  }

  login(user: UserLogin) {
    this.authService.login(user).subscribe((userData: UserStorage) => {
      this.userData = userData;
      this.setMessage();
      if (userData.token) {
        this.storage.saveData(userData.token, userData.id, userData.username);
        this.router.navigate(["/Post"]);
        this.authService.loggedIn.next(true);
      }
    });
  }

  registerDialog() {
    this.displayModal = true;
  }
}
