import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class CreateCompanyService {

    private url = 'http://localhost:8090/admin/companies';

    constructor(private http: HttpClient) { }

    createCompany(company: CompanyDto): Observable<any>{
        return this.http.post<CompanyDto>(this.url, company);
    }
    
}