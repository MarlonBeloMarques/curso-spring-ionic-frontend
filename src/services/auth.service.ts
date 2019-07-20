import { CartService } from './domain/cart.service';
import { Injectable } from '@angular/core';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciasDTO } from './../models/credencias.dto';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper;

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public cartService: CartService){

    }

    authenticate(creds : CredenciasDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
               observe : 'response', // vai pegar o header  da resposta
               responseType: "text", // vai pegar uma resposta de corpo vazio, para que o framework nao tente fazer um parse no json
            });
    }

    // o token é inserido automaticamente pelo interceptor
    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
               observe : 'response', // vai pegar o header  da resposta
               responseType: "text", // vai pegar uma resposta de corpo vazio, para que o framework nao tente fazer um parse no json
            });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(6);
        let user : LocalUser = {
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub // pega o email do token
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}