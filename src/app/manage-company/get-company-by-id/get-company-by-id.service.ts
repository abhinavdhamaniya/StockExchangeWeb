import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class GetCompanyByIdService {

    private url = 'http://localhost:8090/admin/companies/';

    constructor(private http: HttpClient) { }

    getCompanyById(companyId: String): Observable<CompanyDto>{
        return this.http.get<CompanyDto>(this.url+companyId);
    }
    
}