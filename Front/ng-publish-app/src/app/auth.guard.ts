// import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
// import {AuthService} from "./auth.service";
//
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) { }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     let url: string = state.url;
//     return this.checkLogin(url);
//   }
//
//   checkLogin(url: string): boolean {
//     if (this.authService.isLoggedIn) { return true; }
//     //this.authService.redirectUrl = url;
//     this.router.navigate(['/user/login']);
//
//     return false;
//   }
// }
