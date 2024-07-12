import { ChangeDetectorRef, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { PostCreate, PostList } from "./models/PostModel";
import { StorageService } from "./storage.service";
import { UserProfil } from "./models/UserModel";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private apiUrl = "http://localhost:5000/api";

  constructor(
    private storage: StorageService,
    private http: HttpClient,
  ) {}

  createPost(post: PostCreate): Observable<PostCreate> {
    let userId = this.storage.getData("id");
    return this.http.post<any>(`${this.apiUrl}/Post/${userId}`, post);
  }

  getPostList(): Observable<PostList[]> {
    return this.http.get<PostList[]>(`${this.apiUrl}/Post`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])),
    );
  }

  searchPostByUser(term: string): Observable<UserProfil[]> {
    if (term.length <= 1) {
      return of([]);
    } else {
      return this.http
        .get<UserProfil[]>(`${this.apiUrl}/user/?username=${term}`)
        .pipe(
          tap((response) => this.log(response)),
          catchError((error) => this.handleError(error, [])),
        );
    }
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); //transforme une donnee en flux de donnees
  }

  private log(response: any) {
    console.table(response);
  }
}
