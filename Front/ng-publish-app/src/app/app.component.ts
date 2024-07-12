import { Component, OnInit } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavBarComponent, NgIf, AsyncPipe],
  template: `
    <nav>
      <div class="nav-wrapper teal">
        <a href="#" class="brand-logo center"> Publish App </a>
        <app-nav-bar></app-nav-bar>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
