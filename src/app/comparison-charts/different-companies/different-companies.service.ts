import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyDto } from "src/app/dto/CompanyDto";
import { IpoDto } from "src/app/dto/IpoDto";

@Injectable({
    providedIn: 'root'
})
export class DifferentCompaniesService {

    private url = 'http://localhost:8090/admin/ipos/';

    constructor(private http: HttpClient) { }

    getIpoByCompanyId(companyId: String): Observable<IpoDto[]>{
        return this.http.get<IpoDto[]>(this.url+companyId)
    }
    
}