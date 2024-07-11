import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import {FormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import {RegisterComponent} from "./register/register.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    LoginComponent,
    PostComponent,
    PageNotFoundComponent,
    RegisterComponent,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule { }
