import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StockExchangeDto } from "src/app/dto/StockExchangeDto";

@Injectable({
    providedIn: 'root'
})
export class CreateExchangeService {

    private url = 'http://localhost:8090/admin/stock-exchanges';

    constructor(private http: HttpClient) { }

    createExchange(stockExchange: StockExchangeDto): Observable<any>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.post<StockExchangeDto>(this.url, stockExchange, httpOptions);
    }
    
}