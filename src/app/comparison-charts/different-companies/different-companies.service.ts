import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class DifferentCompaniesService {

    private url = 'https://stock-exchange-app-abhinav.herokuapp.com/admin/ipos/';

    constructor(private http: HttpClient) { }

    getIpoByCompanyId(companyId: String): Observable<IpoDto[]>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.get<IpoDto[]>(this.url+companyId, httpOptions)
    }
    
}