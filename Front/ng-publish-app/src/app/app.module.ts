import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import {FormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import {RegisterComponent} from "./register/register.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent,
    PostComponent,
    PageNotFoundComponent,
    RegisterComponent,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
      provideHttpClient(withFetch()),
  ],
})
export class AppModule { }
