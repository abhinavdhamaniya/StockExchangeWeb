import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";
import { StockExchangeDto } from "src/app/dto/StockExchangeDto";

@Injectable({
    providedIn: 'root'
})
export class CreateIpoService {

    private url = 'http://localhost:8090/admin/ipos';

    constructor(private http: HttpClient) { }

    createIpo(ipo: IpoDto): Observable<any>{
        return this.http.post<IpoDto>(this.url, ipo);
    }
    
}