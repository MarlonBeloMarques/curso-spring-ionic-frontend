import { EstadoDTO } from './../../models/estado.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from 'rxjs/Observable';

@Injectable() // para que poça ser inetado em outras classes
export class EstadoService{

    constructor(public http: HttpClient){
    }

    findAll() : Observable<EstadoDTO[]>{ // o tipo que vai retornar
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }

}