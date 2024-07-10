import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from "./app.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {PostComponent} from "./post/post.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: '', redirectTo: 'user/login', pathMatch: 'full' },
    { path: 'user/login', component: LoginComponent },
    { path: 'Post', component: PostComponent },
    { path: '**', component:PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
