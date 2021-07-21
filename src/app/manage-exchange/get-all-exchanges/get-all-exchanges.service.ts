import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StockExchangeDto } from "src/app/dto/StockExchangeDto";

@Injectable({
    providedIn: 'root'
})
export class GetAllExchangesService {

    private url = 'http://localhost:8090/admin/stock-exchanges';

    constructor(private http: HttpClient) { }

    getAllStockExchanges(): Observable<StockExchangeDto[]>{
        return this.http.get<StockExchangeDto[]>(this.url)
    }
    
}