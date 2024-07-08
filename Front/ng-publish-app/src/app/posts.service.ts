import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import { Post } from "./models/userandpost";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
      private http: HttpClient,
  ) { }

  getPostList(): Observable<Post[]> {
    return this.http.get<Post[]>(`api/Post`).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); //transforme une donnee en flux de donnees
  }

  private log(response: any) {
    console.table(response);
  }

}
