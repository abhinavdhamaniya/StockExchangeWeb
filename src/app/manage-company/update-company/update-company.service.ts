import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class UpdateCompanyService implements OnInit{

    private checkExistsUrl = 'https://stock-exchange-app-abhinav.herokuapp.com/admin/companies/checkExists/';
    private getCompanyDetailsUrl = 'https://stock-exchange-app-abhinav.herokuapp.com/admin/companies/';
    private updateCompanyUrl = 'https://stock-exchange-app-abhinav.herokuapp.com/admin/companies/';
    httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
    };

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        if(localStorage.getItem('TOKEN')==null) this.router.navigate(['unauthanticated']);
    }

    checkExists(companyId: String): Observable<Boolean>{
        
        return this.http.get<Boolean>(this.checkExistsUrl+companyId, this.httpOptions)
    }

    getCompanyDetails(companyId: String): Observable<CompanyDto>{
        return this.http.get<CompanyDto>(this.getCompanyDetailsUrl+companyId, this.httpOptions)
    }

    updateCompany(companyId: String, company: CompanyDto): Observable<any>{
        return this.http.put<any>(this.updateCompanyUrl+companyId, company, this.httpOptions)
    }
}