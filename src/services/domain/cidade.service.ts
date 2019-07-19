import { CidadeDTO } from './../../models/cidade.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from 'rxjs/Observable';

@Injectable() // para que poça ser inetado em outras classes
export class CidadeService{

    constructor(public http: HttpClient){
    }

    findAll(estado_id: string) : Observable<CidadeDTO[]>{ // o tipo que vai retornar
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }

}