import { Injectable } from '@angular/core';
import {catchError, delay, map, Observable, of, tap, throwError} from "rxjs";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserLogin, UserRegister } from './models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //isLoggedIn: boolean = false;
  private apiUrl = 'http://localhost:5000/api';

  constructor(
      private http: HttpClient,
  ) {
  }

  public register(user: UserRegister): Observable<UserRegister> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, user);
  }

  public login(user: UserLogin): Observable<string> {
    return this.http.post(`${this.apiUrl}/user/login`, user, { responseType: 'text' });
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
