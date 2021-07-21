import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class DeactivateCompanyService {

    private url = 'http://localhost:8090/admin/companies/deactivate/';

    constructor(private http: HttpClient) { }

    deactivateCompany(companyId: String): Observable<any>{
        return this.http.patch<CompanyDto>(this.url+companyId, null);
    }
    
}