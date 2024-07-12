import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { inject, Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
class PermissionsService {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.loggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(["/login"]);
          return false;
        }
        return true;
      }),
    );
  }

  //   let url: string = state.url;
  //   return this.checkLogin(url);
  // }
  //
  // checkLogin(url: string): boolean {
  //   if (this.authService.isLoggedIn) {
  //     return true;
  //   }
  //   //this.authService.redirectUrl = url;
  //   this.router.navigate(["/user/login"]);
  //
  //   return false;
  // }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> => {
  return inject(PermissionsService).canActivate(next, state);
};
