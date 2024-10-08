import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  tap,
  throwError,
} from "rxjs";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { UserLogin, UserRegister, UserStorage } from "./models/UserModel";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = "http://localhost:5000/api";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable(); // {2}
  // }

  public register(user: UserRegister): Observable<UserRegister> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, user);
  }

  public login(user: UserLogin): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post(`${this.apiUrl}/user/login`, user, httpOptions).pipe(
      tap((response) => this.log(response)),
      //this.loggedIn.next(true),
      catchError((error) => this.handleError(error, null)),
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); //transforme une donnee en flux de donnees
  }

  private log(response: any) {
    console.table(response);
  }

  // redirectUrl: string;

  //constructor(private http: HttpClient) {}
  //: Observable<boolean>
  // const isLoggedIn = (username == 'pikachu' && password == 'pikachu');
  // return of(true).pipe(
  //     delay(1000),
  //     tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
  //);

  // logout() {
  //   this.isLoggedIn = false;
  // }
}
