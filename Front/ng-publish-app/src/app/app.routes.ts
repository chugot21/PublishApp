import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from "./app.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {PostComponent} from "./post/post.component";

export const routes: Routes = [
    { path: '', redirectTo: 'user/login', pathMatch: 'full' },
    { path: 'user/login', component: LoginComponent },
    { path: 'Post', component: PostComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
