import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "src/app/auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url.includes("auth")) {
            return next.handle(request);
        }

        const token = this.authService.getToken();

        if (token) {
            request.headers.set(
                "Authorization",
                `Bearer ${this.authService.getToken()}`
            );
        }

        return next.handle(request);
    }
}
