import { Injectable } from '@angular/core';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciasDTO } from './../models/credencias.dto';

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){

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
}