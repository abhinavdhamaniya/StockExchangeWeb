import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";
import { StockExchangeDto } from "src/app/dto/StockExchangeDto";

@Injectable({
    providedIn: 'root'
})
export class GetAllIposService {

    private url = 'http://localhost:8090/admin/ipos';

    constructor(private http: HttpClient) { }

    getAllIpos(): Observable<IpoDto[]>{
        return this.http.get<IpoDto[]>(this.url)
    }
    
}