import { ChangeDetectorRef, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { ListPagination, PostCreate, PostList } from "./models/PostModel";
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

  getPostList(pageIndex: number): Observable<ListPagination> {
    return this.http
      .get<ListPagination>(`${this.apiUrl}/Post?pageIndex=${pageIndex}`)
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null)),
      );
  }

  searchPostByUser(term: string): Observable<UserProfil | undefined> {
    if (term.length <= 1) {
      return of();
    } else {
      return this.http.get<UserProfil>(`${this.apiUrl}/user/${term}`).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null)),
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
