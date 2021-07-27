import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class SingleCompanyService {

    private url = 'http://localhost:8090/admin/ipos/';

    constructor(private http: HttpClient) { }

    getIpoByCompanyId(companyId: String): Observable<IpoDto[]>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.get<IpoDto[]>(this.url+companyId, httpOptions)
    }
    
}