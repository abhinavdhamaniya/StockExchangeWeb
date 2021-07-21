import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class UpdateCompanyService {

    private checkExistsUrl = 'http://localhost:8090/admin/companies/checkExists/';
    private getCompanyDetailsUrl = 'http://localhost:8090/admin/companies/';
    private updateCompanyUrl = 'http://localhost:8090/admin/companies/';

    constructor(private http: HttpClient) { }

    checkExists(companyId: String): Observable<Boolean>{
        return this.http.get<Boolean>(this.checkExistsUrl+companyId)
    }

    getCompanyDetails(companyId: String): Observable<CompanyDto>{
        return this.http.get<CompanyDto>(this.getCompanyDetailsUrl+companyId)
    }

    updateCompany(companyId: String, company: CompanyDto): Observable<any>{
        return this.http.put<any>(this.updateCompanyUrl+companyId, company)
    }
}