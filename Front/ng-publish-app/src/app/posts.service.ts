import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {PostCreate, PostGetAll} from "./models/PostModel";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(
      private http: HttpClient,
  ) { }

  createPost(post: PostCreate): Observable<PostCreate> {
    //recuperer current userId
    return this.http.post<any>(`${this.apiUrl}/Post/`, post);
  }

  getPostList(): Observable<PostGetAll[]> {
    return this.http.get<PostGetAll[]>(`${this.apiUrl}/Post`).pipe(
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
