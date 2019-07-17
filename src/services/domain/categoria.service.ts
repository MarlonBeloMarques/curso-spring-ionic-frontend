import { CategoriaDTO } from './../../models/categoria.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from 'rxjs/Observable';

@Injectable() // para que poça ser inetado em outras classes
export class CategoriaService{

    constructor(public http: HttpClient){
    }

    findAll() : Observable<CategoriaDTO[]>{ // o tipo que vai retornar
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

}