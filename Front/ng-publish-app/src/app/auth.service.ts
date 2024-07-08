import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    const isLoggedIn = (username == 'pikachu' && password == 'pikachu');
    return of(true).pipe(
        delay(1000),
        tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
