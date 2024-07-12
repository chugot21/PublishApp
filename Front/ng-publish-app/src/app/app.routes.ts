import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserProfilComponent } from "./user-profil/user-profil.component";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "user/login", pathMatch: "full" },
  { path: "user/login", component: LoginComponent },
  {
    path: "user/:username",
    component: UserProfilComponent,
    canActivate: [AuthGuard],
  },
  { path: "Post", component: PostComponent, canActivate: [AuthGuard] },
  { path: "**", component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
