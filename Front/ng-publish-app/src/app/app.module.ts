import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { RegisterComponent } from "./register/register.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./auth.guard";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { NgxPaginationModule } from "ngx-pagination";

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    NgxPaginationModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
