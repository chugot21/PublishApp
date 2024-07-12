import { Component, OnInit } from "@angular/core";
import { StorageService } from "../storage.service";
import { Router, RouterLink } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [MatButton, AsyncPipe, NgIf, RouterLink],
  template: `
    <div *ngIf="isLoggedIn$ | async">
      <ul class="left hide-on-med-and-down">
        <li>
          <button mat-button (click)="profilUser()">Profil</button>
        </li>
        <li>
          <button mat-button routerLink="/Post">Posts</button>
        </li>
      </ul>
      <ul class="right hide-on-med-and-down">
        <li><button mat-button (click)="logout()">Log out</button></li>
      </ul>
    </div>
  `,
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private storage: StorageService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.loggedIn;
  }

  profilUser() {
    let username: string | null = this.storage.getData("username");
    console.log("username", username);
    this.router.navigate([`/user/${username}`]);
  }

  logout() {
    this.router.navigate(["user/login"]);
    this.authService.loggedIn.next(false);
    this.storage.removeData();
  }
}
