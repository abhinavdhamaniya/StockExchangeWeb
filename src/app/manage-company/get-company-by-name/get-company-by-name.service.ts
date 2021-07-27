import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class GetCompanyByNameService {

    private url = 'http://localhost:8090/admin/companies';

    constructor(private http: HttpClient) { }

    getAllCompanies(): Observable<CompanyDto[]>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.get<CompanyDto[]>(this.url, httpOptions)
    }
    
}