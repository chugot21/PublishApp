import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent,
    PostComponent,
  ],
  providers: [provideHttpClient()]
})
export class AppModule { }
