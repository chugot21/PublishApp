import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { UserProfil } from "./models/UserModel";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:5000/api";

  constructor(
    private storage: StorageService,
    private http: HttpClient,
  ) {}

  getUserProfil(username: string | null): Observable<UserProfil> {
    return this.http.get<UserProfil>(`${this.apiUrl}/user/${username}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, [])),
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
