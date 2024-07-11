import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {StorageService} from "./storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.getData('token');
        //console.log("token", token);
        if (token){
            const authReq = req.clone({
                //headers: req.headers.set('Authorization', 'Bearer ' + token),
                setHeaders: { Authorization: `Bearer ${token}` },
            });
            console.log('Request with Auth Header:', authReq);
            return next.handle(authReq);
        }
        console.log('Request without Auth Header:', req);
        return next.handle(req);
    }
}