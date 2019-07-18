import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(public storage: StorageService){
    }

    // obs, toda requisicao passa pelo intercept
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;

        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl; // recebe se os dados do req é igual do api config base

        // se for entao pode enviar o authorization
        if(localUser && requestToAPI){
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer' + localUser.token)});
            return next.handle(authReq);
        }
        else{
            return next.handle(req);
        }
    }
} 

// exigencias para criar o interceptor
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}