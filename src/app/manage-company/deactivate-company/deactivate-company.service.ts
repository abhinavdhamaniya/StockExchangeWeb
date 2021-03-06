import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";

@Injectable({
    providedIn: 'root'
})
export class DeactivateCompanyService {

    private url = 'https://stock-exchange-app-abhinav.herokuapp.com/admin/companies/deactivate/';

    constructor(private http: HttpClient) { }

    deactivateCompany(companyId: String): Observable<any>{
        var httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('TOKEN')! })
        };
        return this.http.patch<CompanyDto>(this.url+companyId, null, httpOptions);
    }
    
}