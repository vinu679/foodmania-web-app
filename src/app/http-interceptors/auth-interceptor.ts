import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = "34303304-5475-4d63-9352-0d24ed631b37";
        
        let request = req.clone({
            setHeaders: {
                Authorization : token
            }
        });
        
        return next.handle(request);
    }
}
